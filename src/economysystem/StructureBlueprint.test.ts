import { UUID } from '../HasUuid';
import { Ticks } from '../simulation/Ticks';
import { ResourceAmount } from './ResourceAmount';
import { testArcFurnaceProduction, testCoalMineProduction, testRefineryProduction, testSteelWorksProduction } from './ResourceAmount.test';
import { StructureBlueprint } from './StructureBlueprint';

export const TEST_COAL_MINE_UUID: UUID = '8e1a4da2-c13b-4398-8513-484cc950f50e';
export const TEST_STEEL_WORKS_UUID: UUID = '8f498865-d3d9-4fee-9a99-f7a3de5eed44';
export const TEST_ARC_FURNACE_UUID: UUID = '7dae961d-68b8-42d7-afeb-1c10ba8ab741';
export const TEST_REFINERY_UUID: UUID = 'f41f960b-5554-4b32-a9c4-80f5c0240c2d';

export const TEST_BASECOSTS_COAL_MINE: ResourceAmount = ResourceAmount.carbon(100).withMetal(100).withSynthetics(100).withSilicon(100);
export const TEST_BASECOSTS_STEEL_WORKS: ResourceAmount = ResourceAmount.carbon(100).withMetal(100).withSynthetics(100).withSilicon(100);
export const TEST_BASECOSTS_ARC_FURNACE: ResourceAmount = ResourceAmount.carbon(100).withMetal(100).withSynthetics(100).withSilicon(100);
export const TEST_BASECOSTS_REFINERY: ResourceAmount = ResourceAmount.carbon(100).withMetal(100).withSynthetics(100).withSilicon(100);

export const TEST_BASECONSTRUCTIONDURATION_COAL_MINE: Ticks = 100;
export const TEST_BASECONSTRUCTIONDURATION_STEEL_WORKS: Ticks = 100;
export const TEST_BASECONSTRUCTIONDURATION_ARC_FURNACE: Ticks = 100;
export const TEST_BASECONSTRUCTIONDURATION_REFINERY: Ticks = 100;

export const TEST_COAL_MINE_LABEL: string = 'Coal Mine';
export const TEST_STEEL_WORKS_LABEL: string = 'Steel Works';
export const TEST_ARC_FURNACE_LABEL: string = 'Arc Furnace';
export const TEST_REFINERY_LABEL: string = 'Refinery';

export function testCoalMineBlueprint(): StructureBlueprint {
    return new StructureBlueprint(TEST_COAL_MINE_UUID, testCoalMineProduction(), TEST_BASECOSTS_COAL_MINE, TEST_BASECONSTRUCTIONDURATION_COAL_MINE, TEST_COAL_MINE_LABEL);
}
export function testSteelWorksBlueprint(): StructureBlueprint {
    return new StructureBlueprint(TEST_STEEL_WORKS_UUID, testSteelWorksProduction(), TEST_BASECOSTS_STEEL_WORKS, TEST_BASECONSTRUCTIONDURATION_STEEL_WORKS, TEST_STEEL_WORKS_LABEL);
}
export function testArcFurnaceBlueprint(): StructureBlueprint {
    return new StructureBlueprint(TEST_ARC_FURNACE_UUID, testArcFurnaceProduction(), TEST_BASECOSTS_ARC_FURNACE, TEST_BASECONSTRUCTIONDURATION_ARC_FURNACE, TEST_ARC_FURNACE_LABEL);
}
export function testRefineryBlueprint(): StructureBlueprint {
    return new StructureBlueprint(TEST_REFINERY_UUID, testRefineryProduction(), TEST_BASECOSTS_REFINERY, TEST_BASECONSTRUCTIONDURATION_REFINERY, TEST_REFINERY_LABEL);
}
describe('StructureBlueprint', () => {
    describe('Labels', () => {
        test('Coal Mine', () => {
            const underTest = testCoalMineBlueprint();
            expect(underTest.label).toBe(TEST_COAL_MINE_LABEL);
        });
    });
});
