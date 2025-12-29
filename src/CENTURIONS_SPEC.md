# Centurions Society: Design & Interaction Specification

## 1. Design System Specification

### 1.1. Color Tokens
The interface operates in two distinct modes: **Hearth** (Public/Day) and **Shadow** (Private/Night).

| Token Name | Hearth (Vellum) | Shadow (Obsidian) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#F5F2ED` | `#0F0F10` | Main background |
| `--fg-primary` | `#1A1A1B` | `#E5E5E5` | Body text, Primary headings |
| `--fg-muted` | `#1A1A1B` (40%) | `#E5E5E5` (40%) | Meta text, placeholders |
| `--accent-gold` | `#B87333` | `#9E6229` | Active states, Ticker, Highlights |
| `--border-line` | `#1A1A1B` (10%) | `#E5E5E5` (10%) | Dividers, Input borders |
| `--error` | `#9F3A3A` | `#CF6679` | Validation errors |

### 1.2. Typography
**Primary Font (Headings/Identity):** `Libre Baskerville`
*   Weights: Regular (400), Italic (400i), Bold (700)
*   Usage: Page Titles, "The Eyrie", Pull Quotes.

**Secondary Font (UI/Data):** `IBM Plex Mono`
*   Weights: Light (300), Regular (400), Medium (500)
*   Usage: Inputs, Body Copy, Ticker, Navigation, Buttons.

**Type Scale (Mobile / Desktop):**
*   **Hero:** 32px / 64px (Leading: 1.1)
*   **H1:** 24px / 48px (Leading: 1.2)
*   **H2:** 20px / 32px (Leading: 1.3)
*   **Body:** 14px / 16px (Leading: 1.6)
*   **Small/Meta:** 12px / 12px (Uppercase, Tracking: 0.1em)
*   **Tiny/Ticker:** 10px / 10px (Uppercase, Tracking: 0.2em)

### 1.3. Spacing & Layout
*   **Grid:** 8px base unit.
*   **Containers:**
    *   `max-w-md` (28rem): Forms, Reading focus.
    *   `max-w-4xl` (56rem): Dashboard/Portal.
*   **Margins:** Generous whitespace. Minimum 64px padding-y on desktop sections.

### 1.4. Component Styling Rules
*   **Buttons:**
    *   Style: Transparent background, 1px border (`--border-line`).
    *   Text: Monospace, Uppercase, Tracking `0.2em`.
    *   Hover: Fill with `--fg-primary`, invert text color.
    *   Radius: `rounded-none` or sharp edges.
*   **Inputs:**
    *   Style: No background, only bottom border (`1px`).
    *   Focus: Bottom border color changes to `--accent-gold`.
    *   Text: Monospace.
*   **Cards:**
    *   Background: Transparent.
    *   Border: Thin (`1px`), subtle color.
    *   Radius: `rounded-2xl` (per request).

---

## 2. High-Fidelity Page Designs

### A) Static Threshold Home (/)
*   **Layout:** Centered content, absolute minimalism. No navigation chrome.
*   **Top Right:** `001 / 881` (Ticker, fading in/out).
*   **Center:**
    *   Hero Text: "Centurions Society" (Scrambles on load -> Resolves).
    *   Subtext: "The signal is waiting." (Fade in delay).
*   **Bottom:**
    *   Primary CTA: "Request Consideration" (Simple text link or minimal button).
*   **Interaction:** Mouse movement causes subtle parallax of background grain.

### B) Estate Teaser (/app/estate)
*   **Atmosphere:** Split screen or Toggle.
*   **Hearth Mode:** Image of a library/study, warm lighting. Overlay text: "Sanctuary."
*   **Shadow Mode:** Image of a vault/obsidian hallway. Overlay text: "Silence."
*   **Content:** "A gathering of 881. No more."

### C) Protocol I — Recognition (/app/protocol)
*   **Layout:** Single interactive element in center.
*   **Center:** A circular "Seal" (SVG).
*   **Action:** User must press and hold for 1800ms.
*   **Feedback:**
    *   0ms: "Press and hold to attest."
    *   100-1700ms: A thin gold ring draws around the seal. Opacity increases.
    *   <1800ms Release: Ring snaps back. Text: "Not yet."
    *   1800ms: Success. Screen dissolves to white (Hearth) or black (Shadow).
*   **Copy:** "Those who arrive here do not stumble. They respond."

### D) Intent (/app/intent)
*   **Header:** "What signal are you responding to?"
*   **Form:** Vertical list of large toggle cards.
    *   [ ] Intellectual sanctuary
    *   [ ] Strategic peers
    *   [ ] Restoration through craft
    *   [ ] Quiet capital alignment
    *   [ ] Observation only
*   **CTA:** "Proceed" (Appears only after selection).

### E) Transmission (/app/transmission)
*   **Header:** "Identify."
*   **Fields:**
    *   Email Address (Type: email)
    *   City / Region (Type: text)
    *   Invited By (Type: text, Optional)
*   **Trust Indicators:** Small text, opacity 50%. "Your transmission is encrypted. We do not sell data."

### F) Transmission Received (/app/transmission-received)
*   **State:** Success/Pending.
*   **Icon:** A small, static dot or checkmark.
*   **Copy:** "The signal has been logged. Evaluation occurs in cycles, not queues."
*   **Secondary Action:** Toggle switch: "Receive Disclosures & Estate Updates".

### G) Member Access (/app/access)
*   **Theme:** Shadow Mode (Mandatory).
*   **Header:** "Restricted Access".
*   **Inputs:** Member ID, Private Key.
*   **Link:** "No key? Request consideration."

### H) Invite-only Bond (/app/bond)
*   **Visibility:** Protected by URL token.
*   **Header:** "Application Bond".
*   **Price:** "$1,500.00" (Large, Serif).
*   **Disclosures:** "This bond preserves signal integrity. Non-refundable."
*   **CTA:** "Submit Bond" (Solid Gold Button).

### J) Portal (/app/portal)
*   **Header:** "The Eyrie".
*   **Nav:** Library | Vault | Signal.
*   **Content:** Grid of "Dossiers" or "Papers".

---

## 3. Interaction Specs

### 3.1. Ticker Rotation
*   **Behavior:** Counts slowly. Occasionally glitches or skips a number.
*   **Format:** `XXX / 881`.
*   **Position:** Fixed, Top Right, `z-50`.

### 3.2. Scramble Effect (Headline)
*   **Trigger:** On Mount.
*   **Characters:** `A-Z, 0-9, Symbols`.
*   **Duration:** 2.5s total.
*   **Resolve:** Left to right, locking in correct letters.

### 3.3. Long-Press Seal
*   **Duration:** 1800ms.
*   **Easing:** Linear fill.
*   **Cancel:** Immediate reset if released early.

---

## 4. Accessibility Notes
*   **Keyboard Support:** The "Long Press" must have a keyboard alternative.
    *   *Solution:* Allow `Spacebar` or `Enter` keydown (start) and keyup (end).
    *   *Visual:* Show distinct focus ring on the seal.
*   **Contrast:** Ensure "Muted" text meets WCAG AA (4.5:1) against the background. Adjust `--fg-muted` if necessary.
*   **Motion:** Respect `prefers-reduced-motion`. If true, the "Scramble" effect is disabled, and the "Long Press" becomes a simple click with a delay/loading spinner.

## 5. Engineering Notes
*   **Stack:** React + Tailwind CSS + Framer Motion.
*   **Fonts:** Add `<link>` tags for Google Fonts (Libre Baskerville, IBM Plex Mono) to `index.html`.
*   **Tailwind Config:** Extend `theme` with colors defined in 1.1.
*   **State:** Use `Context` or `Zustand` to manage "Hearth/Shadow" theme toggling globally.
