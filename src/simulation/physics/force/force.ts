
export class Force {
  readonly newtons: number;

  constructor(force: number) {
    this.newtons = force;
  }

  getAsMultipliedBy(value: number) {
    return new Force(this.newtons * value)
  }
}