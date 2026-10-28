import type { PhonePayload } from './api';

/**
 * Supported dial codes. `len` = allowed national-number lengths (after removing the trunk "0").
 * The backend re-validates with libphonenumber, so this is a first line of defence only.
 */
export const DIAL_CODES = [
  { iso: 'KE', label: 'KE', cc: '+254', len: [9] },
  { iso: 'UG', label: 'UG', cc: '+256', len: [9] },
  { iso: 'TZ', label: 'TZ', cc: '+255', len: [9] },
  { iso: 'IN', label: 'IN', cc: '+91', len: [10] },
  { iso: 'AE', label: 'AE', cc: '+971', len: [8, 9] },
  { iso: 'GB', label: 'UK', cc: '+44', len: [9, 10] },
] as const;

export type NormalizedPhone = { ok: true; value: PhonePayload; e164: string } | { ok: false; error: string };

/** "0712 345-678" + KE -> { country_code: '+254', national_number: '712345678', e164: '+254712345678' } */
export function normalizePhone(iso: string, raw: string): NormalizedPhone {
  const dc = DIAL_CODES.find((d) => d.iso === iso);
  if (!dc) return { ok: false, error: 'Choose a country code.' };
  const ccDigits = dc.cc.slice(1);
  const hadPlus = raw.trim().startsWith('+');
  let digits = raw.replace(/\D/g, '');

  if (/[^\d\s().+-]/.test(raw)) return { ok: false, error: 'Use digits only, for example 712 345 678.' };
  if (hadPlus || digits.startsWith('00' + ccDigits)) {
    if (digits.startsWith('00')) digits = digits.slice(2);
    if (digits.startsWith(ccDigits)) digits = digits.slice(ccDigits.length);
    else return { ok: false, error: `This number does not start with ${dc.cc}. Pick the right country code.` };
  }
  digits = digits.replace(/^0+/, ''); // trunk prefix

  if (!(dc.len as readonly number[]).includes(digits.length)) {
    return { ok: false, error: `Enter the ${dc.len.join(' or ')}-digit number without the country code or leading 0.` };
  }
  return {
    ok: true,
    value: { country_iso: dc.iso, country_code: dc.cc, national_number: digits },
    e164: `${dc.cc}${digits}`,
  };
}
