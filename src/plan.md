# Implementation Plan & Roadmap: The Sovereign Third Gateway

## 1. Current Phase: Production Candidate (v1.0)
The application is currently stable. The core entry loop, time-based capacity logic, and hidden invitation mechanisms are implemented and tested.

### Recent Achievements
*   [x] Implemented time-based counter (108 -> 881).
*   [x] Integrated `iknowleo` secret invitation flow.
*   [x] Refined copy for "Connection Identity" and Referral views.
*   [x] Stabilized "God Mode" triggers.

## 2. Immediate Priorities (v1.1 - Polish & Security)
*   **Geographic Enforcement:**
    *   Implement strictly client-side or edge-function based IP checking to warn or block non-Arizona traffic (if strict enforcement is desired).
*   **Mobile Optimization:**
    *   Ensure the ASCII art and Scramble text scale correctly on iPhone SE/mini devices.
    *   Verify touch targets for "Invitation" and "Protocol" links.
*   **Performance:**
    *   Optimize the re-render cycle of the `useScramble` hook to prevent main-thread blocking on lower-end devices.

## 3. Short-Term Roadmap (v1.2 - The Network)
*   **Member Dashboard:**
    *   Post-login view for accepted members.
    *   Display "Sovereign Third" status and unique ID.
*   **Referral Tree:**
    *   Visualizer for who referred whom (The "Connection Identity").
    *   Limit referrals per user to maintain the 881 cap.
*   **Audio Atmosphere:**
    *   Add subtle ambient hum (low frequency) on user interaction.
    *   Mechanical click sounds for UI interactions (optional, toggleable).

## 4. Long-Term Vision (v2.0 - The Gateway)
*   **Physical Integration:**
    *   QR code generation for physical meetups in Arizona.
*   **Token Gating:**
    *   Potential integration for NFT-based membership verification if "Sovereign" implies Web3 mechanics.
*   **Sunset Protocol:**
    *   Define behavior for when the counter hits 881 on April 1, 2026. (Does the site lock? Does it reveal a new layer?)

## 5. Maintenance Guidelines
*   **Code Style:** Keep components small. Isolate "mystery" logic (like the scrambler) from layout code.
*   **Updates:** When updating copy, ensure the character count remains similar to preserve the "grid" feel of the text blocks.
*   **Testing:** Always test the "God Mode" and "Invite" flows after any deployment to `Entry.tsx`.
