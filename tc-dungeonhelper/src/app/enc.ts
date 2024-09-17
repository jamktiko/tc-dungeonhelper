//Interface tulevalle datalle, "Encounter" toimintoon.
export interface Enc {
  id: number;
  name: string;
  description: string;
}

export interface REL {
  biome?: string;
  enc?: Enc[];
}

export interface InMemory {
  REL: REL[];
}
