////Interface tulevalle datalle, "Encounter" toimintoon.
//export interface Enc {
//  id: number;
//  name: string;
//  description: string;
//}
//
//export interface RandomEncounters {
//  biome: string;
//  enc: {
//    id: number;
//    name: string;
//    description: string;
//  };
//}
//
export interface InMemory {
  randomEncounters: RandomEncounters[];
}

export interface RandomEncounters {
  biome: string;
  enc: Enc[];
}

export interface Enc {
  id: number;
  name: string;
  description: string;
}
