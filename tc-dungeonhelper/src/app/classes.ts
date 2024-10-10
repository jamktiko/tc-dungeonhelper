export class RandomEncounters {
  constructor(
    public _id: string,
    public biome: string,
    public img: string,
    public enc: Enc[]
  ) {}
}

export class Enc {
  constructor(
    public _id: number,
    public name: string,
    public description: string,
    public weight: number,
    public img: string
  ) {}
}
