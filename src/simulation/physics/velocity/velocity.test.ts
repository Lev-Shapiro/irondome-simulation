import { Distance } from '../distance/distance';
import { Time } from '../time/time';
import { Velocity } from './velocity';

describe('Velocity', () => {
  it('should create a new velocity object', () => {
    const time = Time.createSeconds(1);
    const distance = Distance.createMeters(10);
    const velocity = Velocity.create(time, distance);
    expect(velocity).toBeInstanceOf(Velocity);
  });

  it('should get the velocity in meters per second', () => {
    const time = Time.createSeconds(1);
    const distance = Distance.createMeters(10);
    const velocity = Velocity.create(time, distance);
    expect(velocity.mps).toBe(10);
  });

  it('should get the velocity in kilometers per hour', () => {
    const time = Time.createHours(1);
    const distance = Distance.createKilometers(100);
    const velocity = Velocity.create(time, distance);
    expect(velocity.kmph).toBe(100);
  });

  it('should increase the velocity', () => {
    const time = Time.createSeconds(1);
    const distance = Distance.createMeters(10);
    const velocity = Velocity.create(time, distance);
    const newVelocity = Velocity.create(Time.createSeconds(2), Distance.createMeters(20));
    velocity.increase(newVelocity);
    expect(velocity.mps).toBe(30);
  });
});