

from fastapi import APIRouter, Depends, HTTPException, Path, Response

from .. import db
from ..auth import require_admin
from ..models import PageIn, SiteIn

router = APIRouter(tags=["content"])

SITE_KEYS = {"hero", "proof", "challenge", "solutions", "services", "industries", "cases", "testimonial", "why", "insights", "faqs", "contact"}
SLUG = Path(pattern=r"^[a-z0-9][a-z0-9-]{0,119}$")


@router.get("/content")
def get_content():
    """Public: all admin overrides. The frontend layers them on top of its bundled defaults."""
    return db.get_content()


@router.get("/admin/check", status_code=204, dependencies=[Depends(require_admin)])
def check():
    return Response(status_code=204)


@router.put("/pages/{slug}", status_code=204, dependencies=[Depends(require_admin)])
def put_page(body: PageIn, slug: str = SLUG):
    db.put_content("page", slug, body.model_dump())


@router.delete("/pages/{slug}", status_code=204, dependencies=[Depends(require_admin)])
def delete_page(slug: str = SLUG):
    db.delete_content("page", slug)


@router.put("/site/{key}", status_code=204, dependencies=[Depends(require_admin)])
def put_site(key: str, body: SiteIn):
    if key not in SITE_KEYS:
        raise HTTPException(404, "Unknown content section")
    db.put_content("site", key, body.value)


@router.delete("/site/{key}", status_code=204, dependencies=[Depends(require_admin)])
def delete_site(key: str):
    if key not in SITE_KEYS:
        raise HTTPException(404, "Unknown content section")
    db.delete_content("site", key)
