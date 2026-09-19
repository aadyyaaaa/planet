export const terrains = ['Oceanic', 'Volcanic', 'Desert', 'Forest', 'Icebound', 'Mountainous']
export const vegetations = ['None', 'Sparse', 'Lush', 'Bioluminescent']
export const wildlife = ['Silent', 'Gentle giants', 'Predators', 'Sky swarms', 'Alien symbiosis']
export const populations = ['Uninhabited', 'Settlers', 'Developing', 'Advanced', 'Transcendent']
export const technologies = ['Stone age', 'Industrial', 'Digital', 'Interstellar', 'Post-scarcity']

export const defaults = {
  name: 'Aurelia', size: 58, gravity: 48, temperature: 52, water: 64,
  oxygen: 68, atmosphere: 54, dayLength: 38, moons: 2,
  terrain: 'Forest', vegetation: 'Lush', wildlife: 'Gentle giants',
  population: 'Developing', technology: 'Digital',
}

const names = ['Aurelia', 'Vesper', 'Nacre', 'Kairo', 'Morrow', 'Zephyr', 'Eidolon', 'Tarn']
export function randomConfig() {
  return {
    ...defaults,
    name: names[Math.floor(Math.random() * names.length)] + '-' + Math.floor(10 + Math.random() * 89),
    size: 25 + Math.floor(Math.random() * 70), gravity: 15 + Math.floor(Math.random() * 70),
    temperature: Math.floor(Math.random() * 101), water: Math.floor(Math.random() * 101),
    oxygen: 12 + Math.floor(Math.random() * 75), atmosphere: 10 + Math.floor(Math.random() * 80),
    dayLength: 8 + Math.floor(Math.random() * 85), moons: Math.floor(Math.random() * 5),
    terrain: terrains[Math.floor(Math.random() * terrains.length)],
    vegetation: vegetations[Math.floor(Math.random() * vegetations.length)],
    wildlife: wildlife[Math.floor(Math.random() * wildlife.length)],
    population: populations[Math.floor(Math.random() * populations.length)],
    technology: technologies[Math.floor(Math.random() * technologies.length)],
  }
}
