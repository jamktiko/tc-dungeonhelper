export interface RandomEncounters {
  _id: string;
  biome: string;
  img: string;
  enc: Enc[];
}

export interface Enc {
  id: number;
  name: string;
  description: string;
  weight: number;
  img: string;
}
