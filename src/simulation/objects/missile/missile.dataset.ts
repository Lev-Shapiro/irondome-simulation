import { Angle } from "@/simulation/physics/angle/angle";
import { Coords } from "@/simulation/physics/coords/coords";
import { Distance } from "@/simulation/physics/distance/distance";
import { Force } from "@/simulation/physics/force/force";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";
import { Size } from "@/simulation/size";
import { Missile } from "./missile";
import { MissilePayload } from "./payload/payload";
import { MissileStage } from "./stage/stage";

const clearCoords: Coords = new Coords(
  Distance.createMeters(0),
  Distance.createMeters(0)
);

/* -------------------------------------------------------------------------- */
/*                               Israel Missiles                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               Hamas Missiles                               */
/* -------------------------------------------------------------------------- */

const UNDEFINED_PROPULSION_DRY_MASS = Mass.createKilograms(10);

export const qassam3 = Missile.createWithSingleStage({
  id: "qassam-3",
  coords: clearCoords,
  dryMass: Mass.createKilograms(12.5),
  payload: new MissilePayload(Mass.createKilograms(20)),
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(2.2), Distance.createMeters(0.17)),
  propulsionStage: MissileStage.createFrom(UNDEFINED_PROPULSION_DRY_MASS, false, {
    maxThrustForce: new Force(11500), // Estimated
    specificImpulse: Time.createSeconds(100),
    fuelCapacity: Mass.createKilograms(17.5), // Estimated
    fuelLoaded: Mass.createKilograms(17.5),
  }),
});

export const gradRocket = Missile.createWithSingleStage({
  id: "grad-rocket",
  coords: clearCoords,
  dryMass: Mass.createKilograms(27.75),
  payload: new MissilePayload(Mass.createKilograms(18.4)),
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(2.87), Distance.createMeters(0.122)),
  propulsionStage: MissileStage.createFrom(UNDEFINED_PROPULSION_DRY_MASS, false, {
    maxThrustForce: new Force(20000),
    specificImpulse: Time.createSeconds(210),
    fuelCapacity: Mass.createKilograms(20.45),
    fuelLoaded: Mass.createKilograms(20.45),
  }),
});

export const MISSILE_EXAMPLE = new Missile({
  id: "multi-stage-missile",
  coords: clearCoords,
  dryMass: Mass.createKilograms(35), // Base dry mass without fuel
  payload: new MissilePayload(Mass.createKilograms(25)), // Payload for the final stage
  direction: Angle.createDegreeAngle(90), // Launch angle
  size: Size.init(Distance.createMeters(10), Distance.createMeters(0.5)),

  // Define stages in order from first to last
  stages: [
    MissileStage.createFrom(Mass.createKilograms(5), true, {
      maxThrustForce: new Force(50000),
      specificImpulse: Time.createSeconds(120),
      fuelCapacity: Mass.createKilograms(30),
      fuelLoaded: Mass.createKilograms(30),
    }),
    MissileStage.createFrom(Mass.createKilograms(3), true, {
      maxThrustForce: new Force(30000),
      specificImpulse: Time.createSeconds(150),
      fuelCapacity: Mass.createKilograms(20),
      fuelLoaded: Mass.createKilograms(20),
    }),
    MissileStage.createFrom(Mass.createKilograms(2), false, {
      maxThrustForce: new Force(15000),
      specificImpulse: Time.createSeconds(180),
      fuelCapacity: Mass.createKilograms(10),
      fuelLoaded: Mass.createKilograms(10),
    }),
  ],
});

export const missileDatasetHamas: Missile[] = [qassam3, gradRocket];

export const missiles: Missile[] = [
  ...missileDatasetHamas,
];