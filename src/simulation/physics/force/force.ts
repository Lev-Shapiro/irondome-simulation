
export class Force {
  readonly newtons: number; // Measured in Newtons

  constructor(force: number) {
    this.newtons = force;
  }

  getAsMultipliedBy(value: number) {
    return new Force(this.newtons * value)
  }
}