export function RocketIllustration() {
  return (
    <svg
      data-rocket
      viewBox="0 0 460 420"
      fill="none"
      className="w-full max-w-[420px] shrink-0"
      aria-hidden
    >
      <defs>
        <filter id="rocket-hand" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="4"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* ── Décorations (burst autour) ────────────────────────── */}
      <text
        data-rocket-deco
        x="196"
        y="72"
        fontSize="16"
        fill="#111110"
        opacity="0.7"
      >
        +
      </text>
      <text
        data-rocket-deco
        x="284"
        y="62"
        fontSize="16"
        fill="#111110"
        opacity="0.7"
      >
        +
      </text>
      <rect
        data-rocket-deco
        x="86"
        y="194"
        width="10"
        height="10"
        stroke="#111110"
        strokeWidth="1.2"
      />
      <rect
        data-rocket-deco
        x="362"
        y="198"
        width="10"
        height="10"
        stroke="#111110"
        strokeWidth="1.2"
      />
      <circle
        data-rocket-deco
        cx="102"
        cy="254"
        r="5"
        fill="var(--accent)"
        opacity="0.7"
      />
      <circle
        data-rocket-deco
        cx="354"
        cy="260"
        r="5"
        fill="var(--accent)"
        opacity="0.7"
      />
      <line
        data-rocket-deco
        x1="110"
        y1="152"
        x2="120"
        y2="132"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        data-rocket-deco
        x1="130"
        y1="178"
        x2="140"
        y2="158"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        data-rocket-deco
        x1="342"
        y1="152"
        x2="332"
        y2="132"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        data-rocket-deco
        x1="322"
        y1="178"
        x2="312"
        y2="158"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        data-rocket-deco
        x1="96"
        y1="220"
        x2="76"
        y2="228"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        data-rocket-deco
        x1="364"
        y1="220"
        x2="384"
        y2="228"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Aile gauche ───────────────────────────────────────── */}
      <path
        data-rocket-wing
        d="M 194 238 C 172 242 152 268 158 288 L 194 278"
        stroke="#111110"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#edecea"
        filter="url(#rocket-hand)"
      />

      {/* ── Aile droite ───────────────────────────────────────── */}
      <path
        data-rocket-wing
        d="M 266 238 C 288 242 308 268 302 288 L 266 278"
        stroke="#111110"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#edecea"
        filter="url(#rocket-hand)"
      />

      {/* ── Corps ─────────────────────────────────────────────── */}
      <path
        data-rocket-body
        d="M 194 160 L 194 282 L 266 282 L 266 160 Z"
        stroke="#111110"
        strokeWidth="1.6"
        fill="#edecea"
        filter="url(#rocket-hand)"
      />

      {/* ── Nez ───────────────────────────────────────────────── */}
      <path
        data-rocket-body
        d="M 194 162 C 194 120 215 82 230 64 C 245 82 266 120 266 162 Z"
        stroke="#111110"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#edecea"
        filter="url(#rocket-hand)"
      />

      {/* ── Bande séparatrice ─────────────────────────────────── */}
      <line
        data-rocket-body
        x1="192"
        y1="218"
        x2="268"
        y2="218"
        stroke="#111110"
        strokeWidth="1.6"
        filter="url(#rocket-hand)"
      />

      {/* ── Hublot ────────────────────────────────────────────── */}
      <circle
        data-rocket-porthole
        cx="230"
        cy="192"
        r="20"
        stroke="#111110"
        strokeWidth="1.4"
        fill="var(--accent)"
        fillOpacity="0.2"
        filter="url(#rocket-hand)"
      />

      {/* ── Flamme ────────────────────────────────────────────── */}
      <path
        data-rocket-flame
        d="M 210 284 C 212 296 206 306 214 318 C 218 326 224 314 228 322 C 232 330 230 318 234 326 C 238 334 242 320 246 316 C 252 308 248 298 250 284"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="var(--accent)"
        fillOpacity="0.15"
        filter="url(#rocket-hand)"
      />

      {/* ── Annotation "en ligne" ─────────────────────────────── */}
      <g data-rocket-annotation>
        <text
          x="148"
          y="318"
          fontSize="16"
          style={{ fontFamily: "var(--font-caveat-family)" }}
          fill="#555552"
        >
          en ligne
        </text>
        <path
          d="M 196 316 C 210 322 220 328 226 334"
          stroke="#555552"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#rocket-hand)"
        />
        <path
          d="M 218 336 L 226 334 L 222 326"
          stroke="#555552"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* ── Bouton PUBLISH ────────────────────────────────────── */}
      <rect
        data-rocket-publish
        x="126"
        y="354"
        width="208"
        height="48"
        rx="24"
        fill="var(--accent)"
        fillOpacity="0.22"
        stroke="var(--accent)"
        strokeWidth="1.8"
        filter="url(#rocket-hand)"
      />
      <text
        data-rocket-publish
        x="230"
        y="384"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        letterSpacing="2"
        style={{ fontFamily: "var(--font-manrope-family)" }}
        fill="#111110"
      >
        PUBLIER
      </text>

      {/* ── "clic" ────────────────────────────────────────────── */}
      <g data-rocket-annotation>
        <text
          x="346"
          y="388"
          fontSize="14"
          style={{ fontFamily: "var(--font-caveat-family)" }}
          fill="#999994"
        >
          clic
        </text>
        <path
          d="M 338 378 C 342 374 346 372 350 374"
          stroke="#999994"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
