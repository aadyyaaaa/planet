const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))
const levelIndex = (levels, value) => levels.indexOf(value)
const popLevels = ['Uninhabited', 'Settlers', 'Developing', 'Advanced', 'Transcendent']
const techLevels = ['Stone age', 'Industrial', 'Digital', 'Interstellar', 'Post-scarcity']

export function calculateStats(config, eventBoosts = {}) {
  const temperatureBalance = 100 - Math.abs(config.temperature - 52) * 1.75
  const oxygenBalance = 100 - Math.abs(config.oxygen - 66) * 1.5
  const waterBalance = 100 - Math.abs(config.water - 62) * 1.2
  const habitability = clamp((temperatureBalance * .34) + (oxygenBalance * .24) + (waterBalance * .22) + (config.atmosphere * .12) + (config.vegetation === 'None' ? 0 : 8))
  const biodiversity = clamp(config.water * .26 + config.oxygen * .18 + config.temperature * .12 + (levelIndex(['None', 'Sparse', 'Lush', 'Bioluminescent'], config.vegetation) * 14) + (config.wildlife === 'Silent' ? 0 : 16))
  const climateStability = clamp(100 - Math.abs(config.temperature - 50) * 1.3 - Math.abs(config.atmosphere - 52) * .48 - Math.abs(config.dayLength - 50) * .2)
  const resourceAvailability = clamp(config.water * .3 + config.size * .18 + (config.terrain === 'Volcanic' ? 22 : config.terrain === 'Mountainous' ? 20 : 12) + config.atmosphere * .1)
  const civilizationPotential = clamp(habitability * .38 + resourceAvailability * .22 + levelIndex(popLevels, config.population) * 8 + levelIndex(techLevels, config.technology) * 7)
  const survivalDifficulty = clamp(100 - habitability * .44 + Math.abs(config.gravity - 50) * .2 + (config.terrain === 'Icebound' || config.terrain === 'Desert' ? 18 : 0) - levelIndex(popLevels, config.population) * 5)
  return Object.fromEntries(Object.entries({ habitability, biodiversity, climateStability, resourceAvailability, civilizationPotential, survivalDifficulty }).map(([key, value]) => [key, clamp(value + (eventBoosts[key] || 0))]))
}

export function getClimate(config) {
  if (config.temperature < 25) return 'Cryogenic'
  if (config.temperature < 43) return 'Cool and misty'
  if (config.temperature < 68) return 'Temperate'
  if (config.temperature < 86) return 'Tropical'
  return 'Scorching'
}

export function getPlanetType(config) {
  if (config.water > 78) return 'Ocean world'
  if (config.temperature < 25) return 'Ice world'
  if (config.atmosphere < 25) return 'Thin-air world'
  if (config.terrain === 'Volcanic') return 'Ash world'
  if (config.vegetation === 'Bioluminescent') return 'Glow world'
  return config.terrain === 'Desert' ? 'Dust world' : 'Terrestrial world'
}
