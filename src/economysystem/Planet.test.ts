import { Planet } from './Planet';
import { NOTHING } from './ResourceAmount';
import { testArcFurnace, testCoalMine, testRefinery, testSteelWorks } from './Structure.test';

export function testMercury() {
    const planet = new Planet('Mercury');
    return planet;
}
export function testVenus() {
    const planet = new Planet('Venus');
    return planet;
}
export function testEarth() {
    const planet = new Planet('Earth');
    planet.build(testCoalMine());
    planet.build(testSteelWorks());
    planet.build(testArcFurnace());
    planet.build(testRefinery());
    planet.update(1);
    return planet;
}
export function testMars() {
    const planet = new Planet('Mars');
    return planet;
}
export function testJupiter() {
    const planet = new Planet('Jupiter');
    return planet;
}
export function testSaturn() {
    const planet = new Planet('Saturn');
    return planet;
}
export function testUranus() {
    const planet = new Planet('Uranus');
    return planet;
}
export function unnamed() {
    return new Planet();
}

describe('Planet', () => {
    describe('Resources', () => {
        test('Uranus starts with nothing at all', () => {
            const underTest = testUranus();
            expect(underTest.resources).toMatchObject(NOTHING);
        });
        test('Earth starts with a bit of everything', () => {
            const underTest = testEarth();
            expect(underTest.resources.carbon).toBe(100);
            expect(underTest.resources.metal).toBe(100);
            expect(underTest.resources.silicon).toBe(100);
            expect(underTest.resources.synthetics).toBe(80);
            expect(underTest.resources.propellant).toBe(20);
        });
    });
    describe('Labels', () => {
        test('label can be set via constructor', () => {
            const underTest = new Planet('XYZ');
            expect(underTest.hasLabel()).toBe(true);
            expect(underTest.label).toBe('XYZ');
        });
        test('label must not be set via constructor', () => {
            const underTest = unnamed();
            expect(underTest.hasLabel()).toBe(false);
            expect(underTest.label).toBeNull();
        });
        test('label can be changed', () => {
            const underTest = testEarth();
            expect(underTest.hasLabel()).toBe(true);
            expect(underTest.label).not.toBeNull();
            expect(underTest.label).not.toBe('Proxyma Earth');
            underTest.label = 'Proxyma Earth';
            expect(underTest.label).toBe('Proxyma Earth');
        });
        test('label can be unset', () => {
            const underTest = testEarth();
            expect(underTest.hasLabel()).toBe(true);
            expect(underTest.label).not.toBeNull();
            underTest.label = null;
            expect(underTest.label).toBeNull();
        });
    });
});
