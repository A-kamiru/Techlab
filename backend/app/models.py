"""Request models. Enum codes must match frontend/src/content/contact.ts."""
from enum import Enum
from typing import Literal

import phonenumbers
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


class Interest(str, Enum):
    new = "new"              # New SAP implementation
    migrate = "migrate"      # Move to S/4HANA
    support = "support"      # Support and managed services
    integr = "integr"        # Integration, analytics and BTP
    unsure = "unsure"        # Not sure yet


class Landscape(str, Enum):
    none = "none"
    ecc = "ecc"
    s4 = "s4"
    other = "other"


class Timeline(str, Enum):
    lt3 = "lt3"
    t3to6 = "3to6"
    t6to12 = "6to12"
    exploring = "exploring"


class Phone(BaseModel):
    """
    Strict phone structure for WhatsApp Business Cloud API routing.
    Client sends the pieces; we validate with libphonenumber and derive:
      e164         "+254712345678"
      whatsapp_id  "254712345678"   (the `to` value the Cloud API expects: digits only, no '+')
    """
    country_iso: str = Field(pattern=r"^[A-Z]{2}$")
    country_code: str = Field(pattern=r"^\+\d{1,3}$")
    national_number: str = Field(pattern=r"^\d{6,12}$")
    e164: str | None = None
    whatsapp_id: str | None = None

    @model_validator(mode="after")
    def _validate(self):
        try:
            num = phonenumbers.parse(f"{self.country_code}{self.national_number}", None)
        except phonenumbers.NumberParseException as e:
            raise ValueError(f"Invalid phone number: {e}") from e
        if not phonenumbers.is_valid_number(num):
            raise ValueError("Phone number is not valid for the selected country code")
        if phonenumbers.region_code_for_number(num) != self.country_iso:
            raise ValueError("Country does not match the phone number's country code")
        self.e164 = phonenumbers.format_number(num, phonenumbers.PhoneNumberFormat.E164)
        self.whatsapp_id = self.e164.lstrip("+")
        return self


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: str = Field(min_length=1, max_length=160)
    interest: Interest
    phone: Phone | None = None
    consent: bool
    source: str | None = Field(default=None, max_length=40)
    region_hint: Literal["KE", "UG", "TZ", "IN"] | None = None
    page_url: str | None = Field(default=None, max_length=500)
    website: str = ""  # honeypot: real users never fill this

    @field_validator("name", "company")
    @classmethod
    def _strip(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("must not be blank")
        return v

    @field_validator("consent")
    @classmethod
    def _consent(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("Consent is required")
        return v


class LeadUpdate(BaseModel):
    role: str | None = Field(default=None, max_length=80)
    current_setup: Landscape | None = None
    timeline: Timeline | None = None
    country: Literal["KE", "UG", "TZ", "IN", "OT"] | None = None
    note: str | None = Field(default=None, max_length=2000)


class PageIn(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    summary: str | None = Field(default=None, max_length=600)
    body: str = Field(default="", max_length=60000)


class SiteIn(BaseModel):
    value: dict | list
