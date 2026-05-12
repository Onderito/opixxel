// Cercles dessinés à la main — pas parfaits, intentionnellement imparfaits.
// Centre gauche ≈ (150, 155), centre droit ≈ (290, 155), r ≈ 110
// Le filtre feTurbulence ajoute un tremblement organique supplémentaire.

export const LEFT_CIRCLE =
  "M 158 42 C 224 34 275 88 276 156 C 277 224 228 272 162 276 C 96 280 28 228 26 160 C 24 92 80 50 158 42";

export const RIGHT_CIRCLE =
  "M 296 40 C 360 36 408 92 406 160 C 404 220 354 272 288 274 C 222 276 172 220 174 154 C 176 88 232 44 296 40";

// Lens : intersection approximative des deux cercles
const LENS =
  "M 220 68 C 244 90 248 128 246 156 C 244 184 238 218 218 242 C 196 218 190 184 192 156 C 190 128 196 90 220 68 Z";

export function VennIllustration() {
  return (
    <svg
      data-venn
      viewBox="0 0 440 314"
      fill="none"
      className="w-full max-w-[420px] shrink-0"
      aria-hidden
    >
      <defs>
        {/* Filtre pour l'effet dessin à la main */}
        <filter id="venn-hand" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="4"
            seed="12"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* ── Décorations coins ─────────────────────────────────── */}
      <path
        data-venn-deco
        d="M 52 70 Q 66 58 80 68"
        stroke="#111110"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />
      <path
        data-venn-deco
        d="M 54 244 Q 68 256 82 244"
        stroke="#111110"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />
      <path
        data-venn-deco
        d="M 374 56 L 386 42"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />
      <path
        data-venn-deco
        d="M 388 64 L 400 50"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />
      <path
        data-venn-deco
        d="M 358 250 Q 372 262 386 250"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />

      {/* ── Lens fill ─────────────────────────────────────────── */}
      <path
        data-venn-lens
        d={LENS}
        fill="var(--accent)"
        fillOpacity="0.13"
        filter="url(#venn-hand)"
      />

      {/* ── Cercle gauche — toi ───────────────────────────────── */}
      <path
        data-venn-circle-left
        d={LEFT_CIRCLE}
        stroke="#111110"
        strokeWidth="1.8"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />

      {/* ── Cercle droit — moi ────────────────────────────────── */}
      <path
        data-venn-circle-right
        d={RIGHT_CIRCLE}
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        filter="url(#venn-hand)"
      />

      {/* ── Labels ────────────────────────────────────────────── */}
      <text
        data-venn-text
        x="96"
        y="164"
        fontStyle="italic"
        fontSize="26"
        style={{ fontFamily: "var(--font-bricolage-family)" }}
        fill="#111110"
        opacity="0"
      >
        toi
      </text>
      <text
        data-venn-text
        x="314"
        y="164"
        fontStyle="italic"
        fontSize="26"
        style={{ fontFamily: "var(--font-bricolage-family)" }}
        fill="var(--accent)"
        opacity="0"
      >
        moi
      </text>

      {/* ── + dans l'intersection ─────────────────────────────── */}
      <text
        data-venn-plus
        x="213"
        y="163"
        fontSize="18"
        fontWeight="300"
        fill="var(--accent)"
        opacity="0"
      >
        +
      </text>

      {/* ── Annotation = le brief ─────────────────────────────── */}
      <g data-venn-annotation opacity="0">
        <text
          x="252"
          y="88"
          fontSize="17"
          style={{ fontFamily: "var(--font-caveat-family)" }}
          fill="#999994"
        >
          = le brief
        </text>
        <path
          d="M 248 94 C 238 106 228 122 222 144"
          stroke="#999994"
          strokeWidth="0.9"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
