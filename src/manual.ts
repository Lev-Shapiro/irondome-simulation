import { Time } from "./simulation/physics/time/time";

// const velocity1 = Velocity.initMpS(100);
// const velocity2 = Velocity.initKMpH(72);

// velocity1.increase(velocity2);

// console.log(velocity1.metersPerSecond);

const t1 = Time.createSeconds(5);
const t2 = Time.createMinutes(10);

t1.increase(t2);

console.log(t1);