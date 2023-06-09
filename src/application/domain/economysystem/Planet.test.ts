import { Planet, PlanetSize } from './Planet';
import { ResourceAmount } from './ResourceAmount';
import { testArcFurnaceProduction, testCoalMineProduction, testRefineryProduction, testSteelWorksProduction } from './ResourceAmount.test';
import { Structure } from './Structure';
import { testArcFurnace, testCoalMine, testRefinery, testSteelWorks } from './Structure.test';
import { BLUEPRINT_COAL_MINE } from './StructureBlueprints';

export const TEST_MERCURY_SIZE: PlanetSize = 100;
export const TEST_VENUS_SIZE: PlanetSize = 200;
export const TEST_EARTH_SIZE: PlanetSize = 300;
export const TEST_MARS_SIZE: PlanetSize = 250;
export const TEST_JUPITER_SIZE: PlanetSize = 500;
export const TEST_SATURN_SIZE: PlanetSize = 50;
export const TEST_URANUS_SIZE: PlanetSize = 400;

export const TEST_UNNAMED_SIZE: PlanetSize = 1000;

export function testMercury() {
    const planet = new Planet(TEST_MERCURY_SIZE, 'Mercury');
    return planet;
}
export function testVenus() {
    const planet = new Planet(TEST_VENUS_SIZE, 'Venus');
    return planet;
}
export function testEarth() {
    const planet = new Planet(TEST_EARTH_SIZE, 'Earth');
    planet.build(testCoalMine());
    planet.build(testSteelWorks());
    planet.build(testArcFurnace());
    planet.build(testRefinery());
    return planet;
}
export function testMars() {
    const planet = new Planet(TEST_MARS_SIZE, 'Mars');
    return planet;
}
export function testJupiter() {
    const planet = new Planet(TEST_JUPITER_SIZE, 'Jupiter');
    return planet;
}
export function testSaturn() {
    const planet = new Planet(TEST_SATURN_SIZE, 'Saturn');
    return planet;
}
export function testUranus() {
    const planet = new Planet(TEST_URANUS_SIZE, 'Uranus');
    return planet;
}
export function unnamed() {
    return new Planet(TEST_UNNAMED_SIZE);
}

describe('Planet', () => {
    describe('Resources', () => {
        test('Earth starts with nothing at all', () => {
            const underTest = testEarth();
            expect(underTest.resources).toMatchObject(ResourceAmount.NOTHING);
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
        });
        test('Earth cannot exceed its resource capacity', () => {
            const underTest = testEarth();
            underTest.update(1000);
            expect(underTest.resources.carbon).toBe(underTest.resourceCapacity.carbon);
            expect(underTest.resources.metal).toBe(underTest.resourceCapacity.metal);
            expect(underTest.resources.silicon).toBe(underTest.resourceCapacity.silicon);
            expect(underTest.resources.synthetics).toBe(underTest.resourceCapacity.synthetics);
            expect(underTest.resources.propellant).toBe(underTest.resourceCapacity.propellant);
        });
    });
    describe('Labels', () => {
        test('label can be set via constructor', () => {
            const underTest = new Planet(TEST_UNNAMED_SIZE, 'XYZ');
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
    describe('Construction', () => {
        test('Construction is not enqueued when insuficiant resources', () => {
            const underTest = testEarth();
            underTest.resources.clear();
            const begunConstruction = underTest.tryConstruction(BLUEPRINT_COAL_MINE);
            expect(begunConstruction).toBe(false);
        });
        test('Construction is enqueued when suficiant resources', () => {
            const underTest = testEarth();
            underTest.resources.add(underTest.resourceCapacity);

            const begunConstruction = underTest.tryConstruction(BLUEPRINT_COAL_MINE);
            expect(begunConstruction).toBe(true);
            expect(underTest.resources.carbon).toBeLessThan(underTest.resourceCapacity.carbon);
            expect(underTest.resources.metal).toBeLessThan(underTest.resourceCapacity.metal);
            expect(underTest.resources.silicon).toBeLessThan(underTest.resourceCapacity.silicon);
            expect(underTest.resources.synthetics).toBeLessThan(underTest.resourceCapacity.synthetics);
            expect(underTest.resources.propellant).toBe(underTest.resourceCapacity.propellant);

            console.log(underTest.toString());
        });
        test("Structure becomes created after it's construction duration has passed", () => {
            const underTest = testEarth();
            underTest.resources.add(underTest.resourceCapacity);
            underTest.tryConstruction(BLUEPRINT_COAL_MINE);

            expect(underTest.findStructure(BLUEPRINT_COAL_MINE)?.level).toBeUndefined();
            underTest.update(BLUEPRINT_COAL_MINE.baseConstructionDuration);
            expect(underTest.findStructure(BLUEPRINT_COAL_MINE)?.level).toBe(1);
            console.log(underTest.toString());
        });
        test("Structure becomes upgraded after it's upgrade construction duration has passed", () => {
            const underTest = testEarth();
            underTest.resources.add(underTest.resourceCapacity);
            underTest.build(new Structure(BLUEPRINT_COAL_MINE));
            expect(underTest.findStructure(BLUEPRINT_COAL_MINE)?.level).toBe(1);

            underTest.tryConstruction(BLUEPRINT_COAL_MINE);
            underTest.update(underTest.calculateConstructionDuration(BLUEPRINT_COAL_MINE, 2));

            expect(underTest.findStructure(BLUEPRINT_COAL_MINE)?.level).toBe(2);
            console.log(underTest.toString());
        });
    });
});
