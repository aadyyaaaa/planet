import { RefreshCw, Sparkles } from 'lucide-react'
import { terrains, vegetations, wildlife, populations, technologies } from '../data/planetData'

function Range({ label, value, onChange, suffix = '%', min = 0, max = 100, hint }) {
  return <label className="range-control"><span className="range-heading"><span>{label}</span><strong>{value}{suffix}</strong></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} /><span className="range-hint">{hint}</span></label>
}
function Choices({ label, value, options, onChange }) {
  return <fieldset className="choice-group"><legend>{label}</legend><div className="choice-grid">{options.map((option) => <button type="button" className={value === option ? 'choice active' : 'choice'} key={option} onClick={() => onChange(option)}>{option}</button>)}</div></fieldset>
}

export default function PlanetControls({ config, update, randomize }) {
  return <section className="panel controls-panel" aria-labelledby="customise-title">
    <div className="panel-kicker">01 / SHAPE YOUR WORLD</div><h2 id="customise-title">Customise planet</h2>
    <label className="name-control"><span>Planet name</span><input value={config.name} maxLength={24} onChange={(event) => update('name', event.target.value)} /></label>
    <div className="range-stack">
      <Range label="Planet size" value={config.size} onChange={(value) => update('size', value)} hint="Small moon  ·  Super-Earth" />
      <Range label="Gravity" value={config.gravity} onChange={(value) => update('gravity', value)} hint="Featherlight  ·  Crushing" />
      <Range label="Temperature" value={config.temperature} onChange={(value) => update('temperature', value)} hint="Frozen  ·  Scorching" />
      <Range label="Water coverage" value={config.water} onChange={(value) => update('water', value)} hint="Arid  ·  Ocean planet" />
      <Range label="Oxygen level" value={config.oxygen} onChange={(value) => update('oxygen', value)} hint="Thin air  ·  Rich air" />
      <Range label="Atmosphere density" value={config.atmosphere} onChange={(value) => update('atmosphere', value)} hint="Barely there  ·  Heavy skies" />
      <Range label="Day length" value={config.dayLength} onChange={(value) => update('dayLength', value)} suffix="h" min={4} max={100} hint="Quick spin  ·  Long twilight" />
    </div>
    <div className="moon-control"><span>Moons</span><div className="stepper"><button type="button" aria-label="Remove moon" onClick={() => update('moons', Math.max(0, config.moons - 1))}>−</button><strong>{config.moons}</strong><button type="button" aria-label="Add moon" onClick={() => update('moons', Math.min(4, config.moons + 1))}>+</button></div></div>
    <Choices label="Terrain" value={config.terrain} options={terrains} onChange={(value) => update('terrain', value)} />
    <Choices label="Vegetation" value={config.vegetation} options={vegetations} onChange={(value) => update('vegetation', value)} />
    <Choices label="Wildlife" value={config.wildlife} options={wildlife} onChange={(value) => update('wildlife', value)} />
    <Choices label="Population" value={config.population} options={populations} onChange={(value) => update('population', value)} />
    <Choices label="Technology" value={config.technology} options={technologies} onChange={(value) => update('technology', value)} />
    <button type="button" className="button button-quiet random-button" onClick={randomize}><RefreshCw size={16} /> Randomize</button>
  </section>
}
