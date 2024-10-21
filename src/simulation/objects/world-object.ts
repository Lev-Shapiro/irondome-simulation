import { Coords } from "../coords";
import { Angle } from "../physics/angle/angle";
import { Force } from "../physics/force/force";
import { Gravity } from "../physics/gravity/gravity";
import { Mass } from "../physics/mass/mass";
import { Time } from "../physics/time/time";
import { Vector } from "../physics/vector/vector";
import { Velocity } from "../physics/velocity/velocity";
import { Size } from "../size";

export interface WorldObjectProps {
  id: string;
  coords: Coords;
  dryMass: Mass;
  size: Size;
  direction: Angle;
}

export abstract class WorldObject {
  public readonly id: string;
  private readonly _dryMass: Mass;
  private readonly _coords: Coords;
  private readonly _size: Size;
  private _direction: Angle;
  private readonly _velocity: Velocity = Velocity.initMetersPerSecond(0);

  constructor(props: WorldObjectProps) {
    this.id = props.id;
    this._coords = props.coords;
    this._dryMass = props.dryMass;
    this._size = props.size;
    this._direction = props.direction;
  }

  setAngle(angle: Angle) {
    this._direction = angle;
  }

  get coords(): Coords {
    return this._coords;
  }

  get size(): Size {
    return this._size;
  }

  get direction(): Angle {
    return this._direction;
  }

  get dryMass(): Mass {
    return this._dryMass;
  }

  // Objects with additional elements should reinitialize this property
  get mass(): Mass {
    return this._dryMass;
  }

  get velocityMetersPerSecond() {
    return this._velocity.metersPerSecond;
  }

  private get velocityAsVector(): Vector {
    return Vector.create(
      this._velocity.metersPerSecond.clone().multiply(this.mass.kilograms),
      this.direction
    );
  }

  increaseVelocityFromForce(force: Force) {
    this._velocity.increase(
      Velocity.initMetersPerSecond(force.newtons / this.mass.kilograms)
    );
  }

  getWeightForcePerTimeframe(timeframe: Time) {
    return Gravity.getWeightForce(this.mass).clone().getMultipliedBy(timeframe.seconds);
  }

  getVelocityVectorPerTimeframe(timeframe: Time) {
    return this.velocityAsVector.clone().getMultipliedBy(timeframe.seconds);
  }
}
