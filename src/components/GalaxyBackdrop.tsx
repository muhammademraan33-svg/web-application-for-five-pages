/**
 * Fixed cosmic backdrop: nebula washes + starfield + vignette.
 * Uses only existing brand purples and black (no new hues).
 *
 * Stack: z-0 under page chrome (z-10). Do not use negative z-index — it paints behind #root and disappears.
 */
export default function GalaxyBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-black" />

      {/* Nebula layers — slow drift via CSS */}
      <div
        className="galaxy-nebula-a absolute -left-[20%] top-[-25%] h-[90%] w-[95%] rounded-full opacity-[0.65] blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse at 42% 38%, rgba(168, 85, 247, 0.38) 0%, rgba(147, 51, 234, 0.14) 42%, transparent 72%)',
        }}
      />
      <div
        className="galaxy-nebula-b absolute -right-[18%] top-[5%] h-[75%] w-[80%] rounded-full opacity-[0.6] blur-[85px]"
        style={{
          background:
            'radial-gradient(ellipse at 55% 48%, rgba(192, 132, 252, 0.22) 0%, rgba(168, 85, 247, 0.1) 48%, transparent 74%)',
        }}
      />
      <div
        className="galaxy-nebula-c absolute bottom-[-25%] left-[10%] h-[60%] w-[85%] rounded-full opacity-[0.55] blur-[100px]"
        style={{
          background:
            'radial-gradient(ellipse at 48% 55%, rgba(147, 51, 234, 0.28) 0%, rgba(168, 85, 247, 0.09) 52%, transparent 78%)',
        }}
      />

      {/* Starfield — viewBox required so coordinates render consistently */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.75]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="galaxy-star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {STARFIELD.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.bright ? 0.42 : 0.28}
            fill={s.bright ? 'url(#galaxy-star-glow)' : '#c084fc'}
            fillOpacity={s.o}
          />
        ))}
      </svg>

      {/* Cosmic dust */}
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.45'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette — lighter edges so nebula stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 42%, transparent 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent"
        style={{ boxShadow: '0 0 48px rgba(168, 85, 247, 0.18)' }}
      />
    </div>
  )
}

/** Positions in 0–100 space (matches viewBox) */
const STARFIELD: { x: number; y: number; o: number; bright?: boolean }[] = [
  { x: 8, y: 12, o: 0.5, bright: true },
  { x: 14, y: 28, o: 0.38 },
  { x: 22, y: 8, o: 0.55, bright: true },
  { x: 31, y: 18, o: 0.32 },
  { x: 38, y: 42, o: 0.42 },
  { x: 45, y: 6, o: 0.35 },
  { x: 52, y: 22, o: 0.5, bright: true },
  { x: 61, y: 11, o: 0.28 },
  { x: 68, y: 35, o: 0.4 },
  { x: 76, y: 15, o: 0.36 },
  { x: 84, y: 28, o: 0.48, bright: true },
  { x: 91, y: 9, o: 0.32 },
  { x: 96, y: 38, o: 0.34 },
  { x: 11, y: 55, o: 0.42 },
  { x: 19, y: 68, o: 0.3 },
  { x: 27, y: 48, o: 0.52, bright: true },
  { x: 35, y: 72, o: 0.26 },
  { x: 44, y: 58, o: 0.44 },
  { x: 53, y: 78, o: 0.34 },
  { x: 59, y: 52, o: 0.38 },
  { x: 67, y: 66, o: 0.46 },
  { x: 74, y: 88, o: 0.3 },
  { x: 82, y: 58, o: 0.5, bright: true },
  { x: 88, y: 76, o: 0.34 },
  { x: 95, y: 62, o: 0.36 },
  { x: 6, y: 82, o: 0.4 },
  { x: 16, y: 92, o: 0.28 },
  { x: 29, y: 88, o: 0.42 },
  { x: 41, y: 95, o: 0.34 },
  { x: 50, y: 85, o: 0.52, bright: true },
  { x: 63, y: 94, o: 0.3 },
  { x: 72, y: 82, o: 0.38 },
  { x: 86, y: 91, o: 0.34 },
  { x: 93, y: 78, o: 0.42 },
  { x: 3, y: 38, o: 0.3 },
  { x: 18, y: 44, o: 0.4 },
  { x: 56, y: 40, o: 0.36 },
  { x: 78, y: 44, o: 0.42 },
  { x: 48, y: 30, o: 0.32 },
  { x: 33, y: 62, o: 0.48, bright: true },
  { x: 12, y: 72, o: 0.28 },
  { x: 58, y: 18, o: 0.36 },
  { x: 71, y: 48, o: 0.4 },
  { x: 89, y: 52, o: 0.32 },
  { x: 25, y: 26, o: 0.38 },
  { x: 47, y: 14, o: 0.55, bright: true },
  { x: 64, y: 28, o: 0.3 },
  { x: 42, y: 36, o: 0.34 },
  { x: 55, y: 64, o: 0.44 },
  { x: 7, y: 64, o: 0.32 },
  { x: 98, y: 18, o: 0.38 },
  { x: 15, y: 22, o: 0.36 },
  { x: 73, y: 72, o: 0.4 },
  { x: 88, y: 48, o: 0.34 },
  { x: 36, y: 88, o: 0.42 },
  { x: 2, y: 58, o: 0.3 },
  { x: 92, y: 72, o: 0.38 },
]
