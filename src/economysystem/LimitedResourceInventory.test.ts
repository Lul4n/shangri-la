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

        test('Carbon can be filled by adding capacity', () => {
            underTest.clear();
            underTest.addCarbon(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelCarbon).toBe(1);
        });
        test('Carbon can be filled to more than 100%', () => {
            underTest.clear();
            underTest.addCarbon(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelCarbon).toBe(1);
            expect(underTest.carbon).toBe(capacity);
        });

        test('Metal can be filled by adding capacity', () => {
            underTest.clear();
            underTest.addMetal(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelMetal).toBe(1);
        });
        test('Metal can be filled to more than 100%', () => {
            underTest.clear();
            underTest.addMetal(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelMetal).toBe(1);
            expect(underTest.metal).toBe(capacity);
        });

        test('Silicon can be filled by adding capacity', () => {
            underTest.clear();
            underTest.addSilicon(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSilicon).toBe(1);
        });
        test('Silicon can be filled to more than 100%', () => {
            underTest.clear();
            underTest.addSilicon(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSilicon).toBe(1);
            expect(underTest.silicon).toBe(capacity);
        });

        test('Synthetics can be filled by adding capacity', () => {
            underTest.clear();
            underTest.addSynthetics(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSynthetics).toBe(1);
        });
        test('Synthetics can be filled to more than 100%', () => {
            underTest.clear();
            underTest.addSynthetics(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSynthetics).toBe(1);
            expect(underTest.synthetics).toBe(capacity);
        });

        test('Propellant can be filled by adding capacity', () => {
            underTest.clear();
            underTest.addPropellant(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelPropellant).toBe(1);
        });
        test('Propellant can be filled to more than 100%', () => {
            underTest.clear();
            underTest.addPropellant(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelPropellant).toBe(1);
            expect(underTest.propellant).toBe(capacity);
        });
    });
});
