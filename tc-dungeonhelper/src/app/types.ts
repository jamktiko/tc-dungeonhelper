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

export interface Merchants {
  _id: string;
  name: string;
  type: string | [];
  inventory: [];
}

export interface Items {
  _id: string;
  ware: string;
  type: string;
  cost: number;
  weight: number;
  quantity: number;
}
