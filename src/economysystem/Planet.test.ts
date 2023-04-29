import { Planet } from './Planet';
import { NOTHING } from './ResourceAmount';
import { testArcFurnaceProduction, testCoalMineProduction, testRefineryProduction, testSteelWorksProduction } from './ResourceAmount.test';
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
        test('Earth starts with nothing at all', () => {
            const underTest = testEarth();
            expect(underTest.resources).toMatchObject(NOTHING);
        });
        test('Earth produces according to expectations after n ticks', () => {
            const n = 3;
            const underTest = testEarth();
            underTest.update(n);
            expect(underTest.resources.carbon).toBe(testCoalMineProduction().carbon * n);
            expect(underTest.resources.metal).toBe(testSteelWorksProduction().metal * n);
            expect(underTest.resources.silicon).toBe(testArcFurnaceProduction().silicon * n);
            expect(underTest.resources.synthetics).toBe(testRefineryProduction().synthetics * n);
            expect(underTest.resources.propellant).toBe(testRefineryProduction().propellant * n);
            console.log(underTest.toString());
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
