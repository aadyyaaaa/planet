import { useEffect, useState } from 'react'
import { ArrowDown, Check, Globe2, Sparkles, X } from 'lucide-react'
import StarField from './components/StarField'
import Planet from './components/Planet'
import PlanetControls from './components/PlanetControls'
import PlanetStats from './components/PlanetStats'
import PlanetProfile from './components/PlanetProfile'
import EventPanel from './components/EventPanel'
import { defaults, randomConfig } from './data/planetData'
import { events } from './data/events'
import { calculateStats } from './utils/calculations'
import { generateProfile } from './utils/planetGenerator'
import './App.css'

function App() {
  const [config, setConfig] = useState(defaults)
  const [colorSeed, setColorSeed] = useState(() => Math.floor(Math.random() * 360))
  const [stats, setStats] = useState(() => calculateStats(defaults))
  const [profile, setProfile] = useState(null)
  const [event, setEvent] = useState(null)
  const [eventBoosts, setEventBoosts] = useState({})
  const [destroyed, setDestroyed] = useState(false)
  const [confirmDestroy, setConfirmDestroy] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => { setStats(calculateStats(config, eventBoosts)) }, [config, eventBoosts])
  useEffect(() => { if (!toast) return undefined; const timer = setTimeout(() => setToast(null), 3600); return () => clearTimeout(timer) }, [toast])

  const update = (key, value) => { setConfig((current) => ({ ...current, [key]: value })); setDestroyed(false) }
  const reset = () => { setConfig(defaults); setColorSeed(Math.floor(Math.random() * 360)); setStats(calculateStats(defaults)); setProfile(null); setEvent(null); setEventBoosts({}); setDestroyed(false); setConfirmDestroy(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const randomize = () => { const next = randomConfig(); setConfig(next); setColorSeed(Math.floor(Math.random() * 360)); setProfile(null); setEvent(null); setEventBoosts({}); setDestroyed(false); setToast({ type: 'success', message: 'A new world has entered orbit.' }) }
  const createPlanet = () => { setProfile(generateProfile(config, stats)); setToast({ type: 'success', message: `${config.name} has been catalogued.` }); document.getElementById('field-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const triggerEvent = () => { const next = events[Math.floor(Math.random() * events.length)]; setEvent(next); setEventBoosts((current) => Object.fromEntries(Object.entries(next.boosts).map(([key, value]) => [key, (current[key] || 0) + value]))); setToast({ type: 'event', message: `${next.icon} ${next.title}` }) }
  const destroy = () => { setConfirmDestroy(false); setDestroyed(true); setProfile(null); setEvent(null); setTimeout(() => setToast({ type: 'destroyed', message: 'Planet destroyed.' }), 700) }

  return <div className="app-shell"><StarField /><header className="site-header"><a className="brand" href="/" aria-label="Create Your Own Planet home"><span className="brand-mark"><Globe2 size={20} /></span><span>CREATE YOUR<br /><b>OWN PLANET</b></span></a><div className="header-status"><span className="status-dot" /> SIMULATION ONLINE <span className="header-divider" /> BUILD 04.7</div></header>
    <main>
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> A tiny universe, entirely yours</p><h1>Make a world.<br /><em>See what happens.</em></h1><p className="hero-lede">Tune the atmosphere, seed the oceans, and decide what evolves. Every choice changes the planet in front of you.</p><a className="scroll-cue" href="#builder">Begin building <ArrowDown size={16} /></a></div><div className="hero-orbit-label">CREATION<br /><b>LAB 01</b></div></section>
      <section className="builder" id="builder"><aside><PlanetControls config={config} update={update} randomize={randomize} /></aside><div className="preview-column"><div className="preview-topline"><span>LIVE PLANET</span><span className="coordinates">◒ {String(config.size).padStart(2, '0')}° / {String(config.temperature).padStart(2, '0')}°</span></div><Planet config={config} colorSeed={colorSeed} destroyed={destroyed} /><div className="create-wrap"><button className="button create-button" type="button" onClick={createPlanet} disabled={destroyed}><Sparkles size={18} /> Create planet <span>→</span></button><p>Calculations happen locally in your browser</p></div><PlanetStats stats={stats} /></div></section>
      <section className="discovery" id="field-report"><PlanetProfile config={config} profile={profile} onDestroy={() => setConfirmDestroy(true)} onReset={reset} /><EventPanel event={event} onTrigger={triggerEvent} disabled={!profile || destroyed} /></section>
    </main>
    <footer><span><span className="footer-mark">✦</span> Made for curious minds</span><span>NO SERVERS · NO LIMITS · JUST IMAGINATION</span></footer>
    {toast && <div className={`toast toast-${toast.type}`} role="status"><Check size={16} /> {toast.message}</div>}
    {confirmDestroy && <div className="modal-backdrop" role="presentation"><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="destroy-title"><button className="modal-close" aria-label="Close" onClick={() => setConfirmDestroy(false)}><X size={18} /></button><div className="warning-icon">!</div><p className="panel-kicker">FINAL TRANSMISSION</p><h2 id="destroy-title">Are you sure?</h2><p>Everything you spent 4 minutes creating will cease to exist.</p><div className="modal-actions"><button className="button button-quiet" onClick={() => setConfirmDestroy(false)}>Keep planet</button><button className="button danger-button" onClick={destroy}>Destroy planet</button></div></div></div>}
  </div>
}
export default App
