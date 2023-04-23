import { Structure } from './Structure';
import { ResourceAmount } from './ResourceAmount';

export function testCoalMine(): Structure {
    const structure = new Structure(ResourceAmount.carbon(100), 'Coal Mine');
    return structure;
}
export function testSteelWorks(): Structure {
    const structure = new Structure(ResourceAmount.metal(100), 'Steel Works');
    return structure;
}
export function testArcFurnace(): Structure {
    const structure = new Structure(ResourceAmount.silicon(100), 'Arc Furnace');
    return structure;
}
export function testRefinery(): Structure {
    const structure = new Structure(ResourceAmount.synthetics(80).withPropellant(20), 'Refinery');
    return structure;
}

describe('Structure', () => {
    describe('Labels', () => {
        test('basic', () => {
            const underTest = testCoalMine();
            expect(underTest.label).toBe('Coal Mine');
        });
    });
});
