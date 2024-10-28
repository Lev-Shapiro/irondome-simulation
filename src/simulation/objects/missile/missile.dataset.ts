import { Angle } from "@/simulation/physics/angle/angle";
import { Coords } from "@/simulation/physics/coords/coords";
import { Distance } from "@/simulation/physics/distance/distance";
import { ForceThrust } from "@/simulation/physics/force/force-thrust";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";
import { Size } from "@/simulation/size";
import { Missile } from "./missile";
import { MissilePropellant } from "./propellant/propellant";

const clearCoords: Coords = Coords.init(Distance.createMeters(0), Distance.createMeters(0));

/* -------------------------------------------------------------------------- */
/*                               Israel Missiles                              */
/* -------------------------------------------------------------------------- */

export const tamirInterceptor = new Missile({
  id: "iron-dome-tamir",
  coords: clearCoords,
  direction: Angle.createDegreeAngle(0),
  dryMass: Mass.createKilograms(90), // Approximate total mass including fuel
  size: Size.init(Distance.createMeters(3), Distance.createMeters(0.16)), // Length: 3 m, Diameter: 160 mm
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(5000), // Estimated thrust in Newtons
    specificImpulse: Time.createSeconds(250), // Estimated specific impulse in seconds
    fuelCapacity: Mass.createKilograms(40), // Estimated fuel capacity
    fuelLoaded: Mass.createKilograms(40),
  }),
});

export const arrow3 = new Missile({
  id: "arrow-3",
  coords: clearCoords,
  direction: Angle.createDegreeAngle(0),
  dryMass: Mass.createKilograms(2000), // Estimated dry mass without fuel
  size: Size.init(Distance.createMeters(7.5), Distance.createMeters(0.8)), // Length: 7.5 m, Diameter: 0.8 m
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(150000), // Estimated
    specificImpulse: Time.createSeconds(290), // Estimated
    fuelCapacity: Mass.createKilograms(1000), // Estimated fuel capacity
    fuelLoaded: Mass.createKilograms(1000),
  }),
});

export const davidSling = new Missile({
  id: "davids-sling-stunner",
  coords: clearCoords,
  direction: Angle.createDegreeAngle(0),
  dryMass: Mass.createKilograms(400), // Estimated
  size: Size.init(Distance.createMeters(4.6), Distance.createMeters(0.21)), // Length: 4.6 m, Diameter: 210 mm
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(10000), // Estimated
    specificImpulse: Time.createSeconds(260), // Estimated
    fuelCapacity: Mass.createKilograms(150), // Estimated
    fuelLoaded: Mass.createKilograms(150),
  }),
});

export const jerichoIII = new Missile({
  id: "jericho-iii",
  coords: clearCoords,
  dryMass: Mass.createKilograms(30000), // Estimated
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(15.5), Distance.createMeters(1.56)), // Length: 15.5 m, Diameter: 1.56 m
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(1100000), // Estimated
    specificImpulse: Time.createSeconds(270), // Estimated
    fuelCapacity: Mass.createKilograms(15000), // Estimated
    fuelLoaded: Mass.createKilograms(15000),
  }),
});

/* -------------------------------------------------------------------------- */
/*                               Hamas Missiles                               */
/* -------------------------------------------------------------------------- */

export const gradRocket = new Missile({
  id: "grad-rocket",
  coords: clearCoords,
  dryMass: Mass.createKilograms(66), // Total mass
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(2.87), Distance.createMeters(0.122)),
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(7200), // Estimated
    specificImpulse: Time.createSeconds(210), // Estimated
    fuelCapacity: Mass.createKilograms(20.45), // Approximate propellant mass
    fuelLoaded: Mass.createKilograms(20.45),
  }),
});

export const qassam3 = new Missile({
  id: "qassam-3",
  coords: clearCoords,
  dryMass: Mass.createKilograms(90), // Approximate total mass
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(2.2), Distance.createMeters(0.17)),
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(4000), // Estimated
    specificImpulse: Time.createSeconds(150), // Estimated
    fuelCapacity: Mass.createKilograms(50), // Estimated
    fuelLoaded: Mass.createKilograms(50),
  }),
});

export const M75 = new Missile({
  id: "m75-rocket",
  coords: clearCoords,
  dryMass: Mass.createKilograms(140), // Estimated
  direction: Angle.createDegreeAngle(0),
  size: Size.init(Distance.createMeters(6), Distance.createMeters(0.2)), // Length: 6 m, Diameter: 200 mm
  propellant: new MissilePropellant({
    maxThrustForce: ForceThrust.create(8000), // Estimated
    specificImpulse: Time.createSeconds(180), // Estimated
    fuelCapacity: Mass.createKilograms(80), // Estimated
    fuelLoaded: Mass.createKilograms(80),
  }),
});

export const missileDatasetIsrael: Missile[] = [
  tamirInterceptor,
  arrow3,
  davidSling,
  jerichoIII,
];

export const missileDatasetHamas: Missile[] = [qassam3, gradRocket, M75];

export const missiles: Missile[] = [
  // Israel's Missiles
  ...missileDatasetIsrael,

  // Hamas's Rockets
  ...missileDatasetHamas,
];
