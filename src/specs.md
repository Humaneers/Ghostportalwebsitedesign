# Technical & Design Specifications: The Sovereign Third Gateway

## 1. Project Overview
"The Sovereign Third Gateway" is a mysterious, high-fidelity web portal designed with an "Aesop Clinical" aesthetic. It serves as an exclusive entry point for a geographically restricted community (Arizona residents). The application prioritizes atmosphere, precision, and hidden mechanics over standard user experience conventions.

## 2. Design Philosophy
*   **Aesthetic:** "Aesop Clinical" / Digital Brutalism.
*   **Tone:** Mysterious, authoritative, absolute, mechanical.
*   **Visual Language:**
    *   **Colors:**
        *   *Void:* `#1A1A1B` (Primary Background/Text)
        *   *Copper:* `#B87333` (Accents, Interactive Elements)
        *   *Paper:* `#F5F2ED` (Secondary Background)
    *   **Typography:**
        *   *Headings:* Serif (Elegant, old-world authority).
        *   *Data/UI:* Monospace (Technical, terminal-like, precise).
    *   **Cursor:** Standard system cursor (Intentional design choice for raw digital feel).
    *   **Spacing:** Extreme attention to negative space; rigid grid alignment.

## 3. Core Mechanics

### 3.1. The Counter (Capacity)
*   **Concept:** A digital scoreboard tracking the "saturation" of the network.
*   **Logic:**
    *   **Start:** 108 (Dec 28, 2025)
    *   **End:** 881 (April 1, 2026)
    *   **Behavior:** Linear interpolation based on current system time. Updates hourly.
*   **Display:** `{current} / 881` in top-right corner.

### 3.2. Hidden Access ("Easter Eggs")
*   **God Mode:**
    *   **Trigger:** Key combination `Space` + `1` + `8` + `6` + `8` (Sequence or chord depending on implementation).
    *   **Effect:** Unlocks administrative or debug overlays.
*   **Invitation Flow:**
    *   **Trigger:** Click "Invitation" -> Enter Code.
    *   **Key:** `iknowleo` (Case-insensitive, ignores spaces).
    *   **Action:** Redirects to external documentation (Google Doc).

### 3.3. Entry Sequence
1.  **Stage 1 (Owl):** ASCII Owl animation pulses.
2.  **Stage 2 (Text):** Text scrambles in ("The signal is faint...").
3.  **Stage 3 (Action):** "Answer the Call" button appears.

### 3.4. Geography
*   **Restriction:** Arizona Residents Only.
*   **Implementation:** (To be enforced via IP geolocation or self-attestation during onboarding).

## 4. Technical Architecture

### 4.1. Stack
*   **Frontend:** React (Vite)
*   **Styling:** Tailwind CSS (v4.0)
*   **Animation:** Motion (framer-motion)
*   **Backend:** Supabase (Auth, Database, Edge Functions)

### 4.2. Key Components
*   `/components/views/Entry.tsx`: Main landing logic, scramble effects, counter.
*   `/components/views/Contact.tsx`: Information regarding "Connection Identity".
*   `/components/views/Referral.tsx`: Referral context logic.

### 4.3. Data Requirements
*   **Auth:** Supabase Auth (Email/Password, Social).
*   **State:** LocalStorage for `sovereign_origin` tracking.

## 5. Development Guidelines
*   **Alignment:** Pixel-perfect alignment is critical. If it looks "off", it is broken.
*   **Motion:** Animations should feel mechanical or biological, not "bouncy" or "springy" unless specified. Use linear or ease-out curves.
*   **Copy:** Text should be cryptic but grammatically perfect. Avoid slang.

## 6. Constraints
*   **Max Capacity:** Hard limit of 881 members.
*   **Timeline:** System reaches maturity on April 1, 2026.
