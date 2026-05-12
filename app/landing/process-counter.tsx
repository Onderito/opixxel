export function ProcessCounter({ activeStep }: { activeStep: 1 | 2 | 3 }) {
  const CX = 50;        // centre exact du viewBox
  const TICK_HALF = 10;
  const STEP_Y = [32, 96, 160] as const;
  const TOTAL_H = 192;

  const ticks: number[] = [];
  for (let y = 0; y <= TOTAL_H; y += 16) ticks.push(y);

  return (
    <div className="flex justify-center w-full py-8">
      <svg
        width="100"
        height={TOTAL_H}
        viewBox={`0 0 100 ${TOTAL_H}`}
        fill="none"
        aria-hidden
      >
        {/* Ligne verticale centrée */}
        <line x1={CX} y1={0} x2={CX} y2={TOTAL_H} stroke="#e3e1dc" strokeWidth="1" />

        {/* Ticks */}
        {ticks.map((y) => (
          <line
            key={y}
            x1={CX - TICK_HALF} y1={y}
            x2={CX + TICK_HALF} y2={y}
            stroke="#e3e1dc"
            strokeWidth="1"
          />
        ))}

        {/* Labels */}
        {([1, 2, 3] as const).map((step, i) => {
          const y = STEP_Y[i];
          const isActive = step === activeStep;
          const fill = isActive ? "var(--accent)" : "#999994";
          const label = String(step).padStart(2, "0");

          return (
            <text
              key={step}
              x={CX + 16}
              y={y + 4}
              fontSize="11"
              fontWeight={isActive ? "500" : "400"}
              fill={fill}
              style={{ fontFamily: "var(--font-manrope-family)" }}
            >
              {isActive ? `↓ ${label}` : label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
