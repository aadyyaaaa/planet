import { Zap } from 'lucide-react'
export default function EventPanel({ event, onTrigger, disabled }) {
  return <section className="event-panel"><div><div className="panel-kicker">04 / UNEXPECTED SIGNAL</div><h2>Planet events</h2><p>{event ? <><strong>{event.icon} {event.title}</strong> {event.text}</> : 'Every world has a story. Trigger something strange.'}</p></div><button type="button" className="button event-button" disabled={disabled} onClick={onTrigger}><Zap size={16} /> Trigger event</button></section>
}
