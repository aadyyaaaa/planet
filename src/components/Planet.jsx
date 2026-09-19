import { Moon, Orbit } from 'lucide-react'

export default function Planet({ config, colorSeed, destroyed = false }) {
  const planetStyle = {
    '--planet-hue': colorSeed,
    '--planet-accent': (colorSeed + 55) % 360,
    '--planet-deep': (colorSeed + 205) % 360,
    '--water': `${Math.max(18, config.water)}%`,
    '--heat': `${config.temperature}%`,
    '--green': `${config.vegetation === 'None' ? 3 : config.vegetation === 'Sparse' ? 20 : config.vegetation === 'Lush' ? 44 : 68}%`,
    '--planet-size': `${170 + config.size * 1.35}px`,
    '--spin-speed': `${Math.max(8, 34 - config.dayLength / 4)}s`,
  }
  return <div className={`planet-stage ${destroyed ? 'is-destroyed' : ''}`} style={planetStyle} aria-label={`${config.name} planet preview`}>
    <div className="planet-orbit orbit-one" />
    <div className="planet-orbit orbit-two" />
    {Array.from({ length: config.moons }).map((_, index) => <div className={`moon moon-${index}`} key={index}><Moon size={index === 0 ? 18 : 13} /></div>)}
    <div className="planet-halo" />
    <div className="planet">
      <div className="planet-clouds" />
      <div className="planet-land" />
      <div className="planet-highlight" />
      <div className="planet-shadow" />
      {config.terrain === 'Mountainous' && <div className="terrain-ridges" />}
      {config.terrain === 'Desert' && <div className="terrain-dunes" />}
      {config.terrain === 'Icebound' && <div className="terrain-ice" />}
      {config.terrain === 'Volcanic' && <div className="terrain-volcano" />}
    </div>
    <div className="planet-caption"><Orbit size={14} /> LIVE ORBITAL PREVIEW</div>
  </div>
}
