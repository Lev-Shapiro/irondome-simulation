import { gradRocket } from "./simulation/objects/missile/missile.dataset";
import { Angle } from "./simulation/physics/angle/angle";
import { Time } from "./simulation/physics/time/time";

// Missile{
//   gravity: -1346.2643333333333
//   thrust: 4000N
//   velocity: 0
//   coords: (0km, 0km)
//   angle: 30
//   }
// { axisX: 0, axisY: 0, total: Scalar { _value: 0 } }
// Missile{
//   gravity: -1319.5976666666668
//   thrust: 4000N
//   velocity: 25.679109277624136
//   coords: (3.4641016151377557km, 0.6537356666666665km)
//   angle: 10.687014021130313
//   }

const missile = gradRocket.clone();
missile.setAngle(Angle.createDegreeAngle(45));

const INTERVAL_TIME = Time.createSeconds(0.5);
      
let i = 0;
const interval = setInterval(() => {
  const deltaVector = missile.burnIncludingOtherForcesPerTimeframe(INTERVAL_TIME);

  // incorrectly changes the angle of the missile
  missile.move(deltaVector);
  i++;

  if(missile.coords.y.millimeters <= 0) {
    console.log(`Took ${i} seconds to turn at 0 degrees`)
    clearInterval(interval)
    return;
  }
}, 1);
// }, INTERVAL_TIME.milliseconds);