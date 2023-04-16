import { expect, test } from '@jest/globals';
import { LabeledSystem } from './System';
import { ORIGIN } from '../Coordinates';
import { TEST_EARTH, TEST_JUPITER, TEST_MARS, TEST_MERKUR, TEST_SATURN, TEST_URANUS, TEST_VENUS } from './Planet.test';

export const TEST_SOLARSYSTEM = new LabeledSystem(ORIGIN);
TEST_SOLARSYSTEM.setLabel('SOLARSYSTEM');
TEST_SOLARSYSTEM.addPlanet(TEST_MERKUR);
TEST_SOLARSYSTEM.addPlanet(TEST_VENUS);
TEST_SOLARSYSTEM.addPlanet(TEST_EARTH);
TEST_SOLARSYSTEM.addPlanet(TEST_MARS);
TEST_SOLARSYSTEM.addPlanet(TEST_JUPITER);
TEST_SOLARSYSTEM.addPlanet(TEST_SATURN);
TEST_SOLARSYSTEM.addPlanet(TEST_URANUS);

test('basic', () => {
    const underTest = TEST_SOLARSYSTEM;
    expect(underTest.coordinates[0]).toBe(0n);
});
