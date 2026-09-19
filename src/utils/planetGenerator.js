import { getClimate, getPlanetType } from './calculations'

const ecosystem = (config) => config.vegetation === 'Bioluminescent' ? 'Luminous fungal reefs' : config.terrain === 'Forest' ? 'Canopy forests' : config.terrain === 'Oceanic' ? 'Pelagic gardens' : config.terrain === 'Icebound' ? 'Subglacial seas' : config.terrain + ' frontier'
const species = (config) => config.wildlife === 'Predators' ? 'The velvet-jaw stalker' : config.wildlife === 'Sky swarms' ? 'The million-wing cloud' : config.vegetation === 'Bioluminescent' ? 'The lanternback choir' : 'The patient ' + config.wildlife.toLowerCase()

export function generateProfile(config, stats) {
  const type = getPlanetType(config)
  const climate = getClimate(config)
  const difficulty = stats.survivalDifficulty > 70 ? 'Brutal' : stats.survivalDifficulty > 45 ? 'Demanding' : 'Welcoming'
  return {
    type, climate, ecosystem: ecosystem(config), species: species(config),
    resources: config.terrain === 'Volcanic' ? 'Geothermal crystal, iron, obsidian' : config.water > 65 ? 'Tidal energy, saltglass, deepwater pearls' : 'Rare earths, wind energy, sunstone',
    civilization: config.population === 'Uninhabited' ? 'No known civilization' : config.technology + ' society',
    challenge: difficulty === 'Brutal' ? 'Survive the extremes long enough to adapt.' : difficulty === 'Demanding' ? 'Balance expansion with a restless climate.' : 'Keep wonder from becoming complacency.',
    feature: config.moons > 2 ? 'A choir of moons that controls the tides' : config.temperature > 80 ? 'Rivers that glow at noon' : 'A second horizon beneath the first',
    difficulty,
  }
}
