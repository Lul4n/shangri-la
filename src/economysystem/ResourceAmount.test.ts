import { ResourceAmount } from './ResourceAmount';
import { TEST_ARC_FURNACE_LABEL, TEST_COAL_MINE_LABEL, TEST_REFINERY_LABEL, TEST_STEEL_WORKS_LABEL } from './Structure.test';

export const TEST_COAL_MINE_PRODUCTION_CARBON: number = 100;
export const TEST_STEEL_WORKS_PRODUCTION_METAL: number = 99;
export const TEST_ARC_FURNACE_PRODUCTION_SILICON: number = 75;
export const TEST_REFINERY_PRODUCTION_SYNTHETICS: number = 80;
export const TEST_REFINERY_PRODUCTION_PROPELLANT: number = 20;
export function testCoalMineProduction(): ResourceAmount{
    return ResourceAmount.carbon(TEST_COAL_MINE_PRODUCTION_CARBON);
}

export function testSteelWorksProduction(): ResourceAmount{
    return ResourceAmount.metal(TEST_STEEL_WORKS_PRODUCTION_METAL);
}

export function testArcFurnaceProduction(): ResourceAmount{
    return ResourceAmount.silicon(TEST_ARC_FURNACE_PRODUCTION_SILICON);
}

export function testRefineryProduction(): ResourceAmount{
    return ResourceAmount.synthetics(TEST_REFINERY_PRODUCTION_SYNTHETICS).withPropellant(TEST_REFINERY_PRODUCTION_PROPELLANT);
}

describe('ResourceAmount', () => {
    describe('ToString', ()=>{
        test(TEST_COAL_MINE_LABEL, () =>{
            const underTest = testCoalMineProduction();
            expect(underTest.toString()).toContain(`${TEST_COAL_MINE_PRODUCTION_CARBON}`);
        });
        test(TEST_STEEL_WORKS_LABEL, () =>{
            const underTest = testSteelWorksProduction();
            expect(underTest.toString()).toContain(`${TEST_STEEL_WORKS_PRODUCTION_METAL}`);
        });
        test(TEST_ARC_FURNACE_LABEL, () =>{
            const underTest = testArcFurnaceProduction();
            expect(underTest.toString()).toContain(`${TEST_ARC_FURNACE_PRODUCTION_SILICON}`);
        });
        test(TEST_REFINERY_LABEL, () =>{
            const underTest = testRefineryProduction();
            expect(underTest.toString()).toContain(`${TEST_REFINERY_PRODUCTION_PROPELLANT}`);
            expect(underTest.toString()).toContain(`${TEST_REFINERY_PRODUCTION_SYNTHETICS}`);
        });
    });
    describe('Production', () => {
        test(TEST_COAL_MINE_LABEL, () => {
            const underTest = testCoalMineProduction();
            expect(underTest.carbon).toBe(TEST_COAL_MINE_PRODUCTION_CARBON);
            expect(underTest.metal).toBe(0);
            expect(underTest.propellant).toBe(0);
            expect(underTest.silicon).toBe(0);
            expect(underTest.synthetics).toBe(0);
        });
        test(TEST_STEEL_WORKS_LABEL, () => {
            const underTest = testSteelWorksProduction();
            expect(underTest.carbon).toBe(0);
            expect(underTest.metal).toBe(TEST_STEEL_WORKS_PRODUCTION_METAL);
            expect(underTest.propellant).toBe(0);
            expect(underTest.silicon).toBe(0);
            expect(underTest.synthetics).toBe(0);
        });
        test(TEST_ARC_FURNACE_LABEL, () => {
            const underTest = testArcFurnaceProduction();
            expect(underTest.carbon).toBe(0);
            expect(underTest.metal).toBe(0);
            expect(underTest.propellant).toBe(0);
            expect(underTest.silicon).toBe(TEST_ARC_FURNACE_PRODUCTION_SILICON);
            expect(underTest.synthetics).toBe(0);
        });
        test(TEST_REFINERY_LABEL, () => {
            const underTest = testRefineryProduction();
            expect(underTest.carbon).toBe(0);
            expect(underTest.metal).toBe(0);
            expect(underTest.propellant).toBe(TEST_REFINERY_PRODUCTION_PROPELLANT);
            expect(underTest.silicon).toBe(0);
            expect(underTest.synthetics).toBe(TEST_REFINERY_PRODUCTION_SYNTHETICS);
        });
    });
});
