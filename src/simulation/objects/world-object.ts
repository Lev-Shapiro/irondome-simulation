import { Angle } from "../physics/angle/angle";
import { Coords } from "../physics/coords/coords";
import { Force } from "../physics/force/force";
import { Gravity } from "../physics/gravity/gravity";
import { Mass } from "../physics/mass/mass";
import { Time } from "../physics/time/time";
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
  private _velocity: Velocity = Velocity.initMetersPerSecond(0, 0);

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

  /**
   * Calculates the weight of the object as a force per second.
   * This is based on the object's mass and the gravitational force.
   * 
   * @returns {Force} The gravitational force acting on the object per second.
   */
  get weight(): Force {
    return Gravity.getWeightForcePerSecond(this.mass);
  }

  get velocityMetersPerSecond() {
    return this._velocity.metersPerSecond;
  }

  increaseVelocityFromForce(force: Force) {
    this._velocity.addVelocity(
      Velocity.initMetersPerSecond(force.axisX / this.mass.kilograms, force.axisY / this.mass.kilograms)
    );

    return 
  }

  getWeightForcePerTimeframe(timeframe: Time): Force {
    return Force.create(this.weight.newtons * timeframe.seconds, this.direction);
  }

  getVelocityPerTimeframe(timeframe: Time) {
    const vector = this._velocity.getAsVector().getMultipliedBy(timeframe.seconds);

    return Velocity.initMetersPerSecond(vector.axisX, vector.axisY)
  }
}
