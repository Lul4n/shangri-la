import { expect, test } from '@jest/globals';
import { System } from './System';
import { ORIGIN } from '../Coordinates';
import { testEarth, testJupiter, testMars, testMercury, testSaturn, testUranus, testVenus } from './Planet.test';

export function testSolarsystem(): System {
    const system = new System(ORIGIN, 'Solarsystem');
    system.addPlanet(testMercury());
    system.addPlanet(testVenus());
    system.addPlanet(testEarth());
    system.addPlanet(testMars());
    system.addPlanet(testJupiter());
    system.addPlanet(testSaturn());
    system.addPlanet(testUranus());
    return system;
}

describe('System', () => {
    describe('Labels', () => {
        test('basic', () => {
            const underTest = testSolarsystem();
            expect(underTest.coordinates[0]).toBe(0);
        });
    });
});
