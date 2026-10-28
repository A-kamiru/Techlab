"""Tiny SQLite store: leads (JSON payload) and editable content overrides."""
import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(os.getenv("DATABASE_PATH", "./data/techlab.db"))


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def conn():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    try:
        yield c
        c.commit()
    finally:
        c.close()


def init() -> None:
    with conn() as c:
        c.executescript(
            """
            CREATE TABLE IF NOT EXISTS leads (
              id TEXT PRIMARY KEY,
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL,
              payload TEXT NOT NULL,
              whatsapp_status TEXT NOT NULL DEFAULT 'not_applicable'
            );
            CREATE TABLE IF NOT EXISTS content (
              kind TEXT NOT NULL,          -- 'page' | 'site'
              key TEXT NOT NULL,
              value TEXT NOT NULL,         -- JSON
              updated_at TEXT NOT NULL,
              PRIMARY KEY (kind, key)
            );
            """
        )


# ---- leads
def insert_lead(lead_id: str, payload: dict, whatsapp_status: str) -> None:
    with conn() as c:
        c.execute(
            "INSERT INTO leads (id, created_at, updated_at, payload, whatsapp_status) VALUES (?,?,?,?,?)",
            (lead_id, now(), now(), json.dumps(payload), whatsapp_status),
        )


def get_lead(lead_id: str) -> dict | None:
    with conn() as c:
        r = c.execute("SELECT * FROM leads WHERE id=?", (lead_id,)).fetchone()
    if not r:
        return None
    return {"id": r["id"], "created_at": r["created_at"], "updated_at": r["updated_at"],
            "whatsapp_status": r["whatsapp_status"], **json.loads(r["payload"])}


def update_lead(lead_id: str, patch: dict) -> bool:
    with conn() as c:
        r = c.execute("SELECT payload FROM leads WHERE id=?", (lead_id,)).fetchone()
        if not r:
            return False
        data = json.loads(r["payload"])
        data.update(patch)
        c.execute("UPDATE leads SET payload=?, updated_at=? WHERE id=?", (json.dumps(data), now(), lead_id))
    return True


def set_whatsapp_status(lead_id: str, status: str) -> None:
    with conn() as c:
        c.execute("UPDATE leads SET whatsapp_status=? WHERE id=?", (status, lead_id))


def list_leads(limit: int = 100) -> list[dict]:
    with conn() as c:
        rows = c.execute("SELECT * FROM leads ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
    return [{"id": r["id"], "created_at": r["created_at"], "whatsapp_status": r["whatsapp_status"],
             **json.loads(r["payload"])} for r in rows]


# ---- content
def get_content() -> dict:
    out = {"site": {}, "pages": {}}
    with conn() as c:
        for r in c.execute("SELECT kind, key, value, updated_at FROM content"):
            v = json.loads(r["value"])
            if r["kind"] == "site":
                out["site"][r["key"]] = v
            else:
                out["pages"][r["key"]] = {**v, "updated_at": r["updated_at"]}
    return out


def put_content(kind: str, key: str, value) -> None:
    with conn() as c:
        c.execute(
            "INSERT INTO content (kind, key, value, updated_at) VALUES (?,?,?,?) "
            "ON CONFLICT(kind, key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at",
            (kind, key, json.dumps(value), now()),
        )


def delete_content(kind: str, key: str) -> None:
    with conn() as c:
        c.execute("DELETE FROM content WHERE kind=? AND key=?", (kind, key))
