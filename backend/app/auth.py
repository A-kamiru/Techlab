import os
import secrets

from fastapi import Header, HTTPException


def require_admin(x_admin_token: str | None = Header(default=None)) -> None:
    expected = os.getenv("ADMIN_TOKEN", "")
    if not expected:
        raise HTTPException(503, "Admin is disabled: ADMIN_TOKEN is not set on the server")
    if not x_admin_token or not secrets.compare_digest(x_admin_token, expected):
        raise HTTPException(401, "Invalid admin token")
