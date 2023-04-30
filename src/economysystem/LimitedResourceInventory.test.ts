import { LimitedResourceInventory } from './LimitedResourceInventory';

describe('LimitedResourceInventory', () => {
    describe('ofCapacity()', () => {
        const capacity = 1000;
        const underTest = LimitedResourceInventory.ofCapacity(capacity);
        test('Capacity is set for all resource types', () => {
            underTest.clear();
            expect(underTest.capacity.carbon).toBe(capacity);
            expect(underTest.capacity.metal).toBe(capacity);
            expect(underTest.capacity.silicon).toBe(capacity);
            expect(underTest.capacity.synthetics).toBe(capacity);
            expect(underTest.capacity.propellant).toBe(capacity);
        });
        test('Current resources are nothing', () => {
            underTest.clear();
            expect(underTest.isNothing()).toBe(true);
            expect(underTest.carbon).toBe(0);
            expect(underTest.metal).toBe(0);
            expect(underTest.silicon).toBe(0);
            expect(underTest.synthetics).toBe(0);
            expect(underTest.propellant).toBe(0);
            expect(underTest.levelCarbon).toBe(0);
            expect(underTest.levelMetal).toBe(0);
            expect(underTest.levelSilicon).toBe(0);
            expect(underTest.levelSynthetics).toBe(0);
            expect(underTest.levelPropellant).toBe(0);
        });
    });
});
