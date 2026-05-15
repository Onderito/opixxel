export function ClipboardIllustration() {
  return (
    <svg
      data-clipboard
      viewBox="0 0 460 400"
      fill="none"
      className="w-full max-w-[420px] shrink-0"
      aria-hidden
    >
      <defs>
        <filter id="clip-hand" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ── Décorations ───────────────────────────────────────── */}
      <text data-clip-deco x="94" y="150" fontSize="16" fill="#111110" opacity="0.45">+</text>
      <text data-clip-deco x="362" y="110" fontSize="16" fill="var(--accent)" opacity="0.7">+</text>
      <circle data-clip-deco cx="94" cy="262" r="5" fill="var(--accent)" opacity="0.6" />
      <rect data-clip-deco x="356" y="240" width="10" height="10" stroke="#111110" strokeWidth="1.2" />
      <line data-clip-deco x1="108" y1="116" x2="118" y2="98" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line data-clip-deco x1="126" y1="140" x2="136" y2="122" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line data-clip-deco x1="352" y1="290" x2="362" y2="272" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />

      {/* ── Clipboard body ────────────────────────────────────── */}
      <rect
        data-clip-body
        x="140" y="78" width="180" height="242" rx="6"
        stroke="#111110" strokeWidth="1.6" fill="var(--bg-canvas)"
        filter="url(#clip-hand)"
      />

      {/* ── Clip (pill en haut) ───────────────────────────────── */}
      <rect
        data-clip-body
        x="192" y="62" width="76" height="30" rx="15"
        stroke="var(--accent)" strokeWidth="1.6" fill="var(--bg-canvas)"
        filter="url(#clip-hand)"
      />

      {/* ── Titre / barre ─────────────────────────────────────── */}
      <rect data-clip-inner x="158" y="108" width="144" height="11" rx="2" fill="#e3e1dc" />
      <line data-clip-inner x1="140" y1="130" x2="320" y2="130" stroke="#e3e1dc" strokeWidth="1" />

      {/* ── Item 1 ────────────────────────────────────────────── */}
      <rect
        data-clip-inner
        x="158" y="145" width="14" height="14" rx="2"
        stroke="#111110" strokeWidth="1.2"
        filter="url(#clip-hand)"
      />
      <rect
        data-clip-inner
        x="180" y="149" width="80" height="7" rx="1.5"
        stroke="#111110" strokeWidth="0.8"
        filter="url(#clip-hand)"
      />

      {/* ── Item 2 ────────────────────────────────────────────── */}
      <rect
        data-clip-inner
        x="158" y="172" width="14" height="14" rx="2"
        stroke="#111110" strokeWidth="1.2"
        filter="url(#clip-hand)"
      />
      <rect
        data-clip-inner
        x="180" y="176" width="102" height="7" rx="1.5"
        stroke="#111110" strokeWidth="0.8"
        filter="url(#clip-hand)"
      />

      {/* ── Item 3 — coché (accent) ───────────────────────────── */}
      <rect
        data-clip-check
        x="158" y="199" width="14" height="14" rx="2"
        fill="var(--accent)" fillOpacity="0.2"
        stroke="var(--accent)" strokeWidth="1.2"
        filter="url(#clip-hand)"
      />
      <path
        data-clip-check
        d="M 161 206 L 164 210 L 170 203"
        stroke="var(--accent)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <rect
        data-clip-check
        x="180" y="203" width="92" height="7" rx="1.5"
        stroke="#111110" strokeWidth="0.8"
        filter="url(#clip-hand)"
      />

      {/* ── Séparateur ────────────────────────────────────────── */}
      <line x1="140" y1="228" x2="320" y2="228" stroke="#e3e1dc" strokeWidth="1" />

      {/* ── Pill CTA "Réserver · 30 min" ─────────────────────── */}
      <rect
        data-clip-cta
        x="158" y="266" width="144" height="34" rx="17"
        stroke="var(--accent)" strokeWidth="1.4"
        fill="var(--accent)" fillOpacity="0.12"
        filter="url(#clip-hand)"
      />
      <text
        data-clip-cta
        x="230" y="288"
        textAnchor="middle" fontSize="13" fontWeight="600"
        style={{ fontFamily: "var(--font-manrope-family)" }}
        fill="#111110"
      >
        Réserver · 30 min
      </text>

      {/* ── Annotations Caveat ────────────────────────────────── */}
      <g data-clip-annotation>
        <text x="334" y="164" fontSize="16" style={{ fontFamily: "var(--font-caveat-family)" }} fill="#999994">vision</text>
        <path
          d="M 332 158 C 322 152 312 148 308 146"
          stroke="#999994" strokeWidth="0.9"
          strokeLinecap="round" strokeDasharray="3 3"
        />
      </g>

      <g data-clip-annotation>
        <text x="72" y="196" fontSize="16" style={{ fontFamily: "var(--font-caveat-family)" }} fill="#999994">budget ?</text>
        <path
          d="M 138 193 C 128 190 118 190 112 192"
          stroke="#999994" strokeWidth="0.9"
          strokeLinecap="round" strokeDasharray="3 3"
        />
      </g>

      <g data-clip-annotation>
        <text x="336" y="230" fontSize="16" style={{ fontFamily: "var(--font-caveat-family)" }} fill="#555552">délais</text>
        <path
          d="M 334 224 C 324 220 316 220 312 222"
          stroke="#555552" strokeWidth="0.9"
          strokeLinecap="round" strokeDasharray="3 3"
        />
      </g>

      {/* ── Label bas ─────────────────────────────────────────── */}
      <text
        data-clip-caption
        x="230" y="352"
        textAnchor="middle" fontSize="17"
        style={{ fontFamily: "var(--font-caveat-family)" }}
        fill="#555552"
      >
        = le cadrage ✦
      </text>
    </svg>
  );
}
