export class FuzzyTuple {

  constructor (
    public a: number,
    public b: number,
    public c: number,
    public code: string,
    public label: string
  ) {}

  public toString = () => {
    const vals = `[${this.a}, ${this.b}, ${this.c}]`
    return `${this.label} ${vals}`
  }

  public crisp () {
    return (this.a + this.b + this.c) / 3.0
  }
}