//Interface tulevalle datalle, "Encounter" toimintoon.
export interface Enc {
  id: number;
  name: string;
  description: string;
}

export interface RandomEncounters {
  biome: string;
  enc: Enc[];
}

export interface InMemory {
  randomEncounters: RandomEncounters[];
}

export interface Highway {
  id: number;
  name: string;
  description: string;
}