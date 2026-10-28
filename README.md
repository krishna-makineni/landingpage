# AI Build Lab — "Build Your First AI Project in 60 Minutes"
### High-Converting Mobile-First Student Workshop Landing Page | NxtWave Growth Challenge

This repository contains the complete, production-ready, mobile-first registration landing page for the student workshop:

> **“Build Your First AI Project in 60 Minutes”**  
> *Target Cohort:* Final-Year Engineering Students  
> *Campaign Objective:* 500 Unique Student Registrations in 7 Days (₹2,000 Budget)  
> *Companion System:* Evaluator Growth Dashboard ([Campus Growth Radar](http://localhost:5173))

---

## 1. Visual & Brand Identity (Matching the Campaign Poster)

The landing page design matches the official campaign poster:

| Element | Specification | Hex / Value |
| :--- | :--- | :--- |
| **Primary Background** | Midnight Navy | `#07111F` |
| **Card Surface** | Deep Navy / Navy Surface | `#10172A` / `#17243D` |
| **Primary CTA & Glow** | Electric Lime | `#C5F56A` |
| **Technical Accents** | Holographic Cyan | `#50DFFF` |
| **Typography** | Modern Tech Grotesk | *Plus Jakarta Sans* & *JetBrains Mono* |
| **Verified Details** | Free Session • 60-Minute • Built for Students | Zero fabricated dates or promises |

---

## 2. Tech Stack

- **Core:** React 19, JavaScript (clean, maintainable ES modules)
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS v4 with custom theme tokens and geometric grid overlays
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Storage Layer:** LocalStorage with email normalization and duplicate detection
- **Deployment Target:** Vercel / Netlify / Cloudflare Pages

---

## 3. Page Structure & Components

The application is structured inside `src/`:

```
src/
├── components/
│   ├── Navbar.jsx                # Responsive sticky header with brand mark & mobile menu
│   ├── Hero.jsx                  # Campaign headline, electric-lime highlight & trust badges
│   ├── AiProjectMockup.jsx       # Interactive Plan / Build / Test code workbench
│   ├── Benefits.jsx              # 3 core workshop benefit cards (01, 02, 03)
│   ├── Steps.jsx                 # 3-step student journey timeline
│   ├── Audience.jsx              # Cohort relevance breakdown (Final-year engineering focus)
│   ├── RegistrationCard.jsx      # High-converting registration form with instant validation
│   ├── RegistrationConfirmation.jsx # Digital workshop pass, reference ID & pass copy tool
│   ├── FAQ.jsx                   # Keyboard-accessible accordion with 5 verified answers
│   ├── FinalCTA.jsx              # "Stop Scrolling. Start Building." conversion section
│   ├── Footer.jsx                # Brand mark, verified links & organizer disclaimer
│   └── DemoInspector.jsx         # Evaluator drawer: inspects LocalStorage, UTMs & QR hub
├── lib/
│   ├── attribution.js            # UTM parameter parser, storage cache & headline variants
│   ├── storage.js                # LocalStorage abstraction, duplicate detector & demo seed/reset
│   └── validation.js             # Form validation & email normalization logic
├── App.jsx                       # Master page coordinator
├── index.css                     # Tailwind v4 theme tokens & styles
└── main.jsx                      # React 19 root mounting
```

---

## 4. Local Development Setup

To run this application locally:

```bash
# 1. Clone or navigate to the directory
cd landingpage

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The server will start at:
```
http://localhost:5174/
```
*(If port 5174 is in use, Vite will automatically select the next available port, e.g. 5175)*

To build for production:
```bash
npm run build
npm run preview
```

---

## 5. Campaign Attribution & A/B Testing

The landing page captures UTM parameters and referral codes from the URL and persists them throughout the user's session (even if the user refreshes or scrolls).

### Supported Attribution Parameters

| Parameter | Example Value | Description |
| :--- | :--- | :--- |
| `utm_source` | `whatsapp`, `campus_ambassador`, `qr_poster`, `college_club` | Inbound distribution channel |
| `utm_medium` | `student_community`, `canva_print`, `discord` | Distribution mechanism |
| `utm_campaign` | `ai_workshop` | Marketing campaign tag |
| `ref` | `AMBASSADOR01`, `CLUB_IITD` | Campus Ambassador or partner referral code |
| `variant` | `default`, `outcome`, `career` | A/B Headline Experiment Variant |

### Test Attribution URLs

- **WhatsApp Student Community:**
  `http://localhost:5174/?utm_source=whatsapp&utm_medium=student_community&utm_campaign=ai_workshop`
- **Campus Ambassador with Referral Code:**
  `http://localhost:5174/?utm_source=campus_ambassador&utm_medium=student_network&ref=AMBASSADOR01`
- **Canva Poster QR Code:**
  `http://localhost:5174/?utm_source=qr_poster&utm_medium=canva_print&utm_campaign=ai_workshop`
- **Outcome-focused Headline Variant:**
  `http://localhost:5174/?variant=outcome`
- **Career-focused Headline Variant:**
  `http://localhost:5174/?variant=career`

---

## 6. Demo Registration Architecture & Evaluator Inspector

To enable an immediate, frictionless evaluation without requiring a paid database, the prototype uses an abstracted LocalStorage data layer (`src/lib/storage.js`).

### Registration Data Model

Each registration record stores:
- `id`: Unique alphanumeric reference code (e.g. `AIBL-2026-7N3D`)
- `fullName`: Student's entered name
- `email`: Raw email input
- `normalizedEmail`: Trimmed, lowercased email (e.g. `vikram.sen@college.edu`)
- `college`: College or university name
- `yearOfStudy`: Selected cohort (`Final year`, `Third year`, etc.)
- `referralCode`: Captured from URL parameter or manually entered
- `attribution`: Channel source, medium, campaign, and variant
- `registeredAt`: ISO 8601 timestamp
- `isDemo`: `true` (Explicit DEMO marker)
- `dataTier`: `DEMO_LOCALSTORAGE`

### Evaluator Demo Inspector

Click the floating **Demo Inspector** badge in the bottom-right corner to open the evaluator drawer:
- View all stored registrations with masked student emails for privacy
- Inspect channel attribution distribution
- Switch headline variants live
- Seed realistic demo records or reset demo storage with one click
- Inspect the dynamic QR Code pointing to the current or deployed URL

---

## 7. Connecting Your Canva Poster QR Code

To connect your printed or digital Canva poster to the deployed landing page:

1. Deploy the site to Vercel (see instructions below).
2. Construct your campaign URL with QR attribution:
   ```
   https://your-deployed-site.vercel.app/?utm_source=qr_poster&utm_medium=canva_print&utm_campaign=ai_workshop
   ```
3. Open the **Demo Inspector** on your deployed site, navigate to the **QR Code Hub** tab, and copy your link.
4. Paste the URL into Canva's built-in QR Code generator (Apps > QR Code).
5. Position the generated QR Code in the designated `SCAN TO REGISTER` frame on your poster.

---

## 8. Deployment Instructions (Vercel)

The repository includes a ready `vercel.json` configuration for client-side routing.

### Deploying via Vercel CLI:
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Deploying via GitHub & Vercel Dashboard:
1. Push this directory to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: AI workshop high-converting landing page"
   git remote add origin https://github.com/your-username/ai-workshop-landingpage.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Keep the default settings (Framework Preset: **Vite**, Root Directory: `./`).
5. Click **Deploy**. Vercel will build and assign a live HTTPS URL within 60 seconds.

---

## 9. Production Readiness Roadmap

For a live 500-student campaign:
- **Server API:** Replace `src/lib/storage.js` with a backend route (Next.js API route, Express, or Supabase edge function).
- **Database Uniqueness:** Enforce unique index on `normalized_email` in PostgreSQL/Supabase.
- **Email Service:** Connect Resend, Postmark, or SendGrid to dispatch transactional calendar invites (.ics file) and meeting links.
- **Environment Variables:** Store database credentials and API secrets in Vercel environment variables (`VITE_` frontend variables strictly for public keys).

---

## 10. Verification & Quality Checklist

- [x] Visuals strictly match the campaign poster (Navy `#07111F`, Lime `#C5F56A`, Cyan `#50DFFF`)
- [x] Mobile-first layout tested on 390px viewport with zero horizontal overflow
- [x] Smooth scrolling navigation across all sections
- [x] Interactive PLAN / BUILD / TEST developer workbench mockup
- [x] Form rejects empty required fields with clear inline error messages
- [x] Form rejects malformed email addresses
- [x] Form normalizes emails (trims whitespace, converts to lowercase)
- [x] Duplicate registrations detected by normalized email with friendly pass retrieval
- [x] URL attribution (`utm_source`, `utm_medium`, `ref`, `variant`) preserved
- [x] Digital student pass generated with copyable reference ID
- [x] Canvas confetti celebration on valid submission
- [x] Keyboard accessible FAQ accordion with conservative, verified facts
- [x] Evaluator Demo Inspector provides full auditability of local data
