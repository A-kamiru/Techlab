import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException

from .. import db, whatsapp
from ..auth import require_admin
from ..models import LeadCreate, LeadUpdate

router = APIRouter(tags=["leads"])


@router.post("/leads", status_code=201)
def create_lead(body: LeadCreate, bg: BackgroundTasks):
    """Step 1 of the form. Saved immediately; returns an id used by step 2."""
    lead_id = uuid.uuid4().hex
    if body.website:  # honeypot tripped: pretend success, store nothing
        return {"id": lead_id, "status": "received"}
    data = body.model_dump(mode="json", exclude={"website"})
    data["email"] = data["email"].lower()
    db.insert_lead(lead_id, data, "pending" if body.phone else "not_applicable")
    if body.phone:
        bg.add_task(whatsapp.notify, lead_id, data)
    return {"id": lead_id, "status": "received"}


@router.patch("/leads/{lead_id}")
def update_lead(lead_id: str, body: LeadUpdate):
    """Step 2 of the form (optional details). The unguessable id acts as the capability."""
    patch = body.model_dump(mode="json", exclude_none=True)
    if not db.update_lead(lead_id, patch):
        raise HTTPException(404, "Lead not found")
    return {"id": lead_id, "status": "updated"}


@router.get("/admin/leads", dependencies=[Depends(require_admin)])
def list_leads(limit: int = 100):
    return db.list_leads(min(limit, 500))
