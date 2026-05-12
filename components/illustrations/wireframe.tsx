export function WireframeIllustration() {
  return (
    <svg
      data-wireframe
      viewBox="0 0 520 400"
      fill="none"
      className="w-full max-w-[420px] shrink-0"
      aria-hidden
    >
      <defs>
        <filter id="wire-hand" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ── Bracket gauche { ──────────────────────────────────── */}
      <path
        data-wire-bracket
        d="M 98 42 C 76 42 62 56 62 76 L 62 172 C 62 190 46 198 34 202 C 46 206 62 214 62 232 L 62 328 C 62 348 76 362 98 362"
        stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
        filter="url(#wire-hand)"
      />

      {/* ── Bracket droit } ───────────────────────────────────── */}
      <path
        data-wire-bracket
        d="M 422 42 C 444 42 458 56 458 76 L 458 172 C 458 190 474 198 486 202 C 474 206 458 214 458 232 L 458 328 C 458 348 444 362 422 362"
        stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
        filter="url(#wire-hand)"
      />

      {/* ── Labels code ───────────────────────────────────────── */}
      <text data-wire-label x="82" y="78" fontSize="17" style={{ fontFamily: "var(--font-caveat-family)" }} fill="var(--accent)">⟨/⟩</text>
      <text data-wire-label x="408" y="356" fontSize="16" style={{ fontFamily: "var(--font-caveat-family)" }} fill="var(--accent)">.css</text>

      {/* ── Boîte wireframe principale ────────────────────────── */}
      <rect
        data-wire-box
        x="112" y="88" width="296" height="226" rx="4"
        stroke="#111110" strokeWidth="1.6" fill="var(--bg-canvas)"
        filter="url(#wire-hand)"
      />

      {/* ── Barre titre ───────────────────────────────────────── */}
      <rect data-wire-inner x="126" y="102" width="96" height="22" rx="2" stroke="#111110" strokeWidth="1" filter="url(#wire-hand)" />
      <text data-wire-inner x="132" y="117" fontSize="11" style={{ fontFamily: "var(--font-caveat-family)" }} fill="#555552">title:</text>
      <rect data-wire-inner x="160" y="106" width="52" height="13" rx="2" fill="#e3e1dc" stroke="#999994" strokeWidth="0.5" />

      {/* ── Grille dashed ─────────────────────────────────────── */}
      <line data-wire-grid x1="112" y1="136" x2="408" y2="136" stroke="#999994" strokeWidth="0.6" strokeDasharray="5 4" />
      <line data-wire-grid x1="112" y1="200" x2="408" y2="200" stroke="#999994" strokeWidth="0.6" strokeDasharray="5 4" />
      <line data-wire-grid x1="112" y1="258" x2="408" y2="258" stroke="#999994" strokeWidth="0.6" strokeDasharray="5 4" />
      <line data-wire-grid x1="214" y1="136" x2="214" y2="314" stroke="#999994" strokeWidth="0.6" strokeDasharray="5 4" />
      <line data-wire-grid x1="316" y1="136" x2="316" y2="314" stroke="#999994" strokeWidth="0.6" strokeDasharray="5 4" />

      {/* ── Bloc image accent ─────────────────────────────────── */}
      <rect
        data-wire-image
        x="120" y="143" width="86" height="50" rx="3"
        fill="var(--accent)" fillOpacity="0.18"
        stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5"
        filter="url(#wire-hand)"
      />

      {/* ── Lignes de texte ───────────────────────────────────── */}
      <rect data-wire-text-line x="222" y="148" width="175" height="9" rx="1.5" stroke="#111110" strokeWidth="0.9" filter="url(#wire-hand)" />
      <rect data-wire-text-line x="222" y="164" width="148" height="9" rx="1.5" stroke="#111110" strokeWidth="0.9" filter="url(#wire-hand)" />
      <rect data-wire-text-line x="222" y="180" width="162" height="9" rx="1.5" stroke="#111110" strokeWidth="0.9" filter="url(#wire-hand)" />

      {/* ── Pill bouton ───────────────────────────────────────── */}
      <rect data-wire-pill x="222" y="202" width="84" height="22" rx="11" stroke="#111110" strokeWidth="1" filter="url(#wire-hand)" />

      {/* ── Blocs bas ─────────────────────────────────────────── */}
      <rect data-wire-bottom x="120" y="264" width="86" height="42" rx="2" stroke="#111110" strokeWidth="1" filter="url(#wire-hand)" />
      <rect data-wire-bottom x="222" y="264" width="86" height="42" rx="2" stroke="#111110" strokeWidth="1" filter="url(#wire-hand)" />
      <rect data-wire-bottom x="318" y="264" width="82" height="42" rx="2" stroke="#111110" strokeWidth="1" filter="url(#wire-hand)" />

      {/* ── Flèche dans cellule bas-droite ────────────────────── */}
      <path data-wire-arrow d="M 342 278 L 374 306" stroke="#111110" strokeWidth="1.2" strokeLinecap="round" filter="url(#wire-hand)" />
      <path data-wire-arrow d="M 358 302 L 374 306 L 370 290" stroke="#111110" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#wire-hand)" />

      {/* ── Label bas ─────────────────────────────────────────── */}
      <text data-wire-caption x="260" y="346" fontSize="17" textAnchor="middle" style={{ fontFamily: "var(--font-caveat-family)" }} fill="#555552">
        le design structure ✦
      </text>
    </svg>
  );
}
