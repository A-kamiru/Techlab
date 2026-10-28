# Techlab web (React + FastAPI)

```
frontend/   Vite + React 18 + TypeScript + Tailwind 3 + Zustand + React Router
backend/    FastAPI + SQLite (leads, editable content)
```

## Run

```bash
# 1) API
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # set ADMIN_TOKEN
set -a && source .env && set +a
uvicorn app.main:app --reload --port 8000

# 2) Web (second terminal)
cd frontend
npm install
npm run dev                    # http://localhost:5173  (proxies /api to :8000)
```

## Editing content
- Open `/admin`, sign in with `ADMIN_TOKEN`.
- **Pages**: every KPI, case study, solution, service and industry card on the home page links to `/p/<slug>`.
  Add a title, summary and body (simple markdown) per page. Blank = default.
- **Site copy**: edit any home-page text as JSON (hero, proof, challenge, solutions, services, industries, cases, faqs, contact).
  Edits that break the structure are rejected. "Reset to default" removes an override.
- If the API is down, the site still renders from the bundled defaults.

## Contact form -> API
1. `POST /api/leads` (step 1: saved immediately, returns `id`)
2. `PATCH /api/leads/{id}` (step 2: optional details)

Phone numbers are sent as `{country_iso, country_code, national_number}`; the API validates with libphonenumber and stores
`e164` (+254712345678) and `whatsapp_id` (254712345678, the Cloud API `to` value). Sending is off until `WHATSAPP_ENABLED=true`
(needs an approved template). See `backend/app/whatsapp.py`.

## TODO (marked in code)
- `frontend/src/content/contact.ts` -> `LINKS.bookingUrl`, `LINKS.privacyUrl` (empty = link hidden)
- Self-host the hero image (`frontend/src/content/home.ts`)

## Page map
Home sections (in order): Hero, KPI strip, Challenge, Solutions, Services, Industries, Case studies, Testimonial,
Why Techlab, Contact form, Insights, FAQs. Detail pages: `/p/<slug>`. Editor: `/admin`.

## Production build
```bash
cd frontend && npm run build   # outputs frontend/dist (serve behind the same origin as /api, or set VITE_API_BASE)
npm run typecheck              # optional strict type check
```
