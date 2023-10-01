import { Structure } from './Structure';
import { TEST_COAL_MINE_LABEL, testArcFurnaceBlueprint, testCoalMineBlueprint, testRefineryBlueprint, testSteelWorksBlueprint } from './StructureBlueprint.test';

export function testCoalMine(): Structure {
    const structure = new Structure(testCoalMineBlueprint());
    return structure;
}
export function testSteelWorks(): Structure {
    const structure = new Structure(testSteelWorksBlueprint());
    return structure;
}
export function testArcFurnace(): Structure {
    const structure = new Structure(testArcFurnaceBlueprint());
    return structure;
}
export function testRefinery(): Structure {
    const structure = new Structure(testRefineryBlueprint());
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
