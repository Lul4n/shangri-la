import { testArcFurnaceProduction, testCoalMineProduction, testRefineryProduction, testSteelWorksProduction } from './ResourceAmount.test';
import { StructureBlueprint } from './StructureBlueprint';

export const TEST_COAL_MINE_LABEL: string = 'Coal Mine';
export const TEST_STEEL_WORKS_LABEL: string = 'Steel Works';
export const TEST_ARC_FURNACE_LABEL: string = 'Arc Furnace';
export const TEST_REFINERY_LABEL: string = 'Refinery';

export function testCoalMineBlueprint(): StructureBlueprint {
    return new StructureBlueprint(testCoalMineProduction(), TEST_COAL_MINE_LABEL);
}
export function testSteelWorksBlueprint(): StructureBlueprint {
    return new StructureBlueprint(testSteelWorksProduction(), TEST_STEEL_WORKS_LABEL);
}
export function testArcFurnaceBlueprint(): StructureBlueprint {
    return new StructureBlueprint(testArcFurnaceProduction(), TEST_ARC_FURNACE_LABEL);
}
export function testRefineryBlueprint(): StructureBlueprint {
    return new StructureBlueprint(testRefineryProduction(), TEST_REFINERY_LABEL);
}
describe('StructureBlueprint', () => {
    describe('Labels', () => {
        test('Coal Mine', () => {
            const underTest = testCoalMineBlueprint();
            expect(underTest.label).toBe(TEST_COAL_MINE_LABEL);
        });
    });
});
