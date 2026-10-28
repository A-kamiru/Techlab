"""
WhatsApp Business Cloud API hand-off.

Leads store a validated E.164 number plus `whatsapp_id` (digits only), which is the exact
`to` value the Cloud API expects. Sending is OFF unless WHATSAPP_ENABLED=true.

Notes for go-live:
  * Business-initiated messages must use a pre-approved TEMPLATE (WHATSAPP_TEMPLATE).
  * The form's consent checkbox covers opt-in; keep the stored `consent` flag as the audit record.
"""
import logging
import os

import httpx

from . import db

log = logging.getLogger("techlab.whatsapp")


def build_template_payload(lead: dict) -> dict | None:
    phone = lead.get("phone")
    if not phone or not phone.get("whatsapp_id"):
        return None
    first = lead["name"].split()[0]
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": phone["whatsapp_id"],
        "type": "template",
        "template": {
            "name": os.getenv("WHATSAPP_TEMPLATE", "lead_welcome"),
            "language": {"code": "en"},
            "components": [{"type": "body", "parameters": [{"type": "text", "text": first}]}],
        },
    }


def notify(lead_id: str, lead: dict) -> None:
    """Background task. Never raises: a failed WhatsApp send must not affect the lead."""
    payload = build_template_payload(lead)
    if payload is None:
        return
    if os.getenv("WHATSAPP_ENABLED", "false").lower() != "true":
        db.set_whatsapp_status(lead_id, "ready_disabled")
        return
    url = (f"https://graph.facebook.com/{os.getenv('WHATSAPP_API_VERSION', 'v21.0')}/"
           f"{os.getenv('WHATSAPP_PHONE_NUMBER_ID')}/messages")
    try:
        r = httpx.post(url, json=payload, headers={"Authorization": f"Bearer {os.getenv('WHATSAPP_TOKEN')}"}, timeout=10)
        r.raise_for_status()
        db.set_whatsapp_status(lead_id, "sent")
    except Exception as e:  # noqa: BLE001
        log.warning("WhatsApp send failed for lead %s: %s", lead_id, e)
        db.set_whatsapp_status(lead_id, "failed")
