/** Static option lists for the contact form. Codes MUST match backend/app/models.py. */

export const INTERESTS = [
  { value: 'new', label: 'New SAP implementation' },
  { value: 'migrate', label: 'Move to S/4HANA' },
  { value: 'support', label: 'Support and managed services' },
  { value: 'integr', label: 'Integration, analytics and BTP' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;

export const LANDSCAPES = [
  { value: 'none', label: 'No SAP yet' },
  { value: 'ecc', label: 'SAP ECC' },
  { value: 's4', label: 'S/4HANA' },
  { value: 'other', label: 'Other ERP' },
] as const;

export const TIMELINES = [
  { value: 'lt3', label: 'Within 3 months' },
  { value: '3to6', label: '3 to 6 months' },
  { value: '6to12', label: '6 to 12 months' },
  { value: 'exploring', label: 'Just exploring' },
] as const;

export const ROLES = ['MD / CEO', 'CFO / Finance head', 'CIO / IT head', 'Procurement / Operations', 'SAP / IT manager', 'Other'];

export const COUNTRY_OPTIONS = [
  { value: 'KE', label: 'Kenya' },
  { value: 'UG', label: 'Uganda' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'IN', label: 'India' },
  { value: 'OT', label: 'Other' },
] as const;

export type TeamKey = 'KE' | 'UG' | 'TZ' | 'IN';
export const TEAM: Record<TeamKey, { team: string; city: string; phone: string }> = {
  KE: { team: 'East Africa team', city: 'Nairobi', phone: '+254 781 052028' },
  UG: { team: 'East Africa team', city: 'Kampala', phone: '+256 758 180949' },
  TZ: { team: 'East Africa team', city: 'Dar es Salaam', phone: '+255 714 354299' },
  IN: { team: 'India team', city: 'Hyderabad', phone: '+91 70586 28295' },
};

/** TODO: fill in. Empty values hide the matching link rather than showing a dead one. */
export const LINKS = {
  bookingUrl: '',
  privacyUrl: '',
};

export const FREE_EMAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|proton)\./i;
