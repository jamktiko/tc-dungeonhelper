//Interface tulevalle datalle, "Encounter" toimintoon.
export interface Enc {
  id: number;
  name: string;
  description: string;
}

export interface REL {
  id: number;
  biome?: string;
  enc?: Enc[];
}

export interface InMemory {
  REL: REL[];
}
