import { useMemo } from 'react'

// Floating particles — random positions and delays for organic feel
function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[var(--accent)] animate-particle opacity-40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated grid that slowly moves
function Grid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.4] dark:opacity-[0.15]">
      <div
        className="absolute inset-0 animate-grid-flow"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 animate-grid-flow-slow"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          opacity: 0.3,
        }}
      />
    </div>
  )
}

// Large gradient orbs that morph and move
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--accent)] mix-blend-multiply dark:mix-blend-soft-light opacity-30 dark:opacity-20 blur-[100px] animate-blob" />
      <div
        className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-pink-500 mix-blend-multiply dark:mix-blend-soft-light opacity-25 dark:opacity-15 blur-[80px] animate-blob"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-violet-500 mix-blend-multiply dark:mix-blend-soft-light opacity-25 dark:opacity-15 blur-[90px] animate-blob"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full bg-cyan-400/40 dark:bg-cyan-400/20 blur-[70px] animate-blob"
        style={{ animationDelay: '-1s' }}
      />
    </div>
  )
}

// Radial gradient vignette for depth
function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--surface) 100%)',
        opacity: 0.6,
      }}
    />
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Grid />
      <GradientOrbs />
      <Particles />
      <Vignette />
    </div>
  )
}

// Section-specific background (lighter, for about/projects/contact)
export function SectionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div
        className="absolute inset-0 opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236,72,153,0.3) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 animate-grid-flow opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
