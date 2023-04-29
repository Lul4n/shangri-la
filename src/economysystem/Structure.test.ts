import { Structure } from './Structure';
import { testArcFurnaceProduction, testCoalMineProduction, testSteelWorksProduction, testRefineryProduction } from './ResourceAmount.test';

export const TEST_COAL_MINE_LABEL: string = 'Coal Mine';
export const TEST_STEEL_WORKS_LABEL: string = 'Steel Works';
export const TEST_ARC_FURNACE_LABEL: string = 'Arc Furnace';
export const TEST_REFINERY_LABEL: string = 'Refinery';

export function testCoalMine(): Structure {
    const structure = new Structure(testCoalMineProduction(), TEST_COAL_MINE_LABEL);
    return structure;
}
export function testSteelWorks(): Structure {
    const structure = new Structure(testSteelWorksProduction(), TEST_STEEL_WORKS_LABEL);
    return structure;
}
export function testArcFurnace(): Structure {
    const structure = new Structure(testArcFurnaceProduction(), TEST_ARC_FURNACE_LABEL);
    return structure;
}
export function testRefinery(): Structure {
    const structure = new Structure(testRefineryProduction(), TEST_REFINERY_LABEL);
    return structure;
}

describe('Structure', () => {
    describe('Labels', () => {
        test('Coal Mine', () => {
            const underTest = testCoalMine();
            expect(underTest.label).toBe(TEST_COAL_MINE_LABEL);
        });
    });
});
