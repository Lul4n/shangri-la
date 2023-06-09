import { LimitedResourceInventory } from './LimitedResourceInventory';
import { ResourceAmount } from './ResourceAmount';

describe('LimitedResourceInventory', () => {
    describe('zero()', () => {
        test('Current resources are nothing', () => {
            const underTest = LimitedResourceInventory.zero();

            expect(underTest.isNothing()).toBe(true);

            expect(underTest.carbon).toBe(0);
            expect(underTest.metal).toBe(0);
            expect(underTest.silicon).toBe(0);
            expect(underTest.synthetics).toBe(0);
            expect(underTest.propellant).toBe(0);
        });
        test('Capacity is set for all resource types', () => {
            const underTest = LimitedResourceInventory.zero();

            expect(underTest.capacity.carbon).toBe(0);
            expect(underTest.capacity.metal).toBe(0);
            expect(underTest.capacity.silicon).toBe(0);
            expect(underTest.capacity.synthetics).toBe(0);
            expect(underTest.capacity.propellant).toBe(0);

            expect(underTest.maxCarbon).toBe(0);
            expect(underTest.maxMetal).toBe(0);
            expect(underTest.maxSilicon).toBe(0);
            expect(underTest.maxSynthetics).toBe(0);
            expect(underTest.maxPropellant).toBe(0);
        });
        test('Level is 1 for all resource types', () => {
            const underTest = LimitedResourceInventory.zero();

            expect(underTest.levelCarbon).toBe(1);
            expect(underTest.levelMetal).toBe(1);
            expect(underTest.levelSilicon).toBe(1);
            expect(underTest.levelSynthetics).toBe(1);
            expect(underTest.levelPropellant).toBe(1);
        });
        test('No carbon can be added', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.addCarbon(1);
            expect(underTest.carbon).toBe(0);
            expect(underTest.levelCarbon).toBe(1);
        });
        test('No carbon can be set', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.carbon = 1;
            expect(underTest.carbon).toBe(0);
            expect(underTest.levelCarbon).toBe(1);
        });
        test('No metal can be added', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.addMetal(1);
            expect(underTest.metal).toBe(0);
            expect(underTest.levelMetal).toBe(1);
        });
        test('No metal can be set', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.metal = 1;
            expect(underTest.metal).toBe(0);
            expect(underTest.levelMetal).toBe(1);
        });
        test('No silicon can be added', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.addSilicon(1);
            expect(underTest.silicon).toBe(0);
            expect(underTest.levelSilicon).toBe(1);
        });
        test('No silicon can be set', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.silicon = 1;
            expect(underTest.silicon).toBe(0);
            expect(underTest.levelSilicon).toBe(1);
        });
        test('No synthetics can be added', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.addSynthetics(1);
            expect(underTest.synthetics).toBe(0);
            expect(underTest.levelSynthetics).toBe(1);
        });
        test('No synthetics can be set', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.synthetics = 1;
            expect(underTest.synthetics).toBe(0);
            expect(underTest.levelSynthetics).toBe(1);
        });
        test('No propellant can be added', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.addPropellant(1);
            expect(underTest.propellant).toBe(0);
            expect(underTest.levelPropellant).toBe(1);
        });
        test('No propellant can be set', () => {
            const underTest = LimitedResourceInventory.zero();
            underTest.propellant = 1;
            expect(underTest.propellant).toBe(0);
            expect(underTest.levelPropellant).toBe(1);
        });
    });
    describe('ofCapacity()', () => {
        const capacity = 1000;
        test('Capacity is set for all resource types', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);

            expect(underTest.capacity.carbon).toBe(capacity);
            expect(underTest.capacity.metal).toBe(capacity);
            expect(underTest.capacity.silicon).toBe(capacity);
            expect(underTest.capacity.synthetics).toBe(capacity);
            expect(underTest.capacity.propellant).toBe(capacity);

            expect(underTest.maxCarbon).toBe(capacity);
            expect(underTest.maxMetal).toBe(capacity);
            expect(underTest.maxSilicon).toBe(capacity);
            expect(underTest.maxSynthetics).toBe(capacity);
            expect(underTest.maxPropellant).toBe(capacity);
        });
        test('Level is 0 for all resource types', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);

            expect(underTest.levelCarbon).toBe(0);
            expect(underTest.levelMetal).toBe(0);
            expect(underTest.levelSilicon).toBe(0);
            expect(underTest.levelSynthetics).toBe(0);
            expect(underTest.levelPropellant).toBe(0);
        });
        test('Capacity can be adusted all at once', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.capacity = ResourceAmount.copyFrom(underTest.capacity).multiply(2);

            expect(underTest.capacity.carbon).toBe(capacity * 2);
            expect(underTest.capacity.metal).toBe(capacity * 2);
            expect(underTest.capacity.silicon).toBe(capacity * 2);
            expect(underTest.capacity.synthetics).toBe(capacity * 2);
            expect(underTest.capacity.propellant).toBe(capacity * 2);

            expect(underTest.maxCarbon).toBe(capacity * 2);
            expect(underTest.maxMetal).toBe(capacity * 2);
            expect(underTest.maxSilicon).toBe(capacity * 2);
            expect(underTest.maxSynthetics).toBe(capacity * 2);
            expect(underTest.maxPropellant).toBe(capacity * 2);
        });
        test('Capacity of carbon can be adjusted', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.maxCarbon = capacity * 2;
            expect(underTest.capacity.carbon).toBe(capacity * 2);
            expect(underTest.maxCarbon).toBe(capacity * 2);
            expect(underTest.levelCarbon).toBe(0);
        });
        test('Capacity of metal can be adjusted', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.maxMetal = capacity * 2;
            expect(underTest.capacity.metal).toBe(capacity * 2);
            expect(underTest.maxMetal).toBe(capacity * 2);
            expect(underTest.levelMetal).toBe(0);
        });
        test('Capacity of silicon can be adjusted', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.maxSilicon = capacity * 2;
            expect(underTest.capacity.silicon).toBe(capacity * 2);
            expect(underTest.maxSilicon).toBe(capacity * 2);
            expect(underTest.levelSilicon).toBe(0);
        });
        test('Capacity of synthetics can be adjusted', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.maxSynthetics = capacity * 2;
            expect(underTest.capacity.synthetics).toBe(capacity * 2);
            expect(underTest.maxSynthetics).toBe(capacity * 2);
            expect(underTest.levelSynthetics).toBe(0);
        });
        test('Capacity of propellant can be adjusted', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.maxPropellant = capacity * 2;
            expect(underTest.capacity.propellant).toBe(capacity * 2);
            expect(underTest.maxPropellant).toBe(capacity * 2);
            expect(underTest.levelPropellant).toBe(0);
        });
        test('Current resources are nothing', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);

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
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addCarbon(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelCarbon).toBe(1);
        });
        test('Carbon can be filled by adding to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addCarbon(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelCarbon).toBe(1);
            expect(underTest.carbon).toBe(capacity);
        });
        test('Carbon can be set to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.carbon = capacity + 1;
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelCarbon).toBe(1);
            expect(underTest.carbon).toBe(capacity);
        });

        test('Metal can be filled by adding capacity', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addMetal(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelMetal).toBe(1);
        });
        test('Metal can be filled by adding to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addMetal(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelMetal).toBe(1);
            expect(underTest.metal).toBe(capacity);
        });
        test('Metal can be set to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.metal = capacity + 1;
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelMetal).toBe(1);
            expect(underTest.metal).toBe(capacity);
        });

        test('Silicon can be filled by adding capacity', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addSilicon(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSilicon).toBe(1);
        });
        test('Silicon can be filled by adding to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addSilicon(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSilicon).toBe(1);
            expect(underTest.silicon).toBe(capacity);
        });
        test('Silicon can be set to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.silicon = capacity + 1;
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSilicon).toBe(1);
            expect(underTest.silicon).toBe(capacity);
        });

        test('Synthetics can be filled by adding capacity', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addSynthetics(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSynthetics).toBe(1);
        });
        test('Synthetics can be filled by adding to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addSynthetics(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSynthetics).toBe(1);
            expect(underTest.synthetics).toBe(capacity);
        });
        test('Synthetics can be set to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.synthetics = capacity + 1;
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelSynthetics).toBe(1);
            expect(underTest.synthetics).toBe(capacity);
        });

        test('Propellant can be filled by adding capacity', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addPropellant(capacity);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelPropellant).toBe(1);
        });
        test('Propellant can be filled by adding to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.addPropellant(capacity + 1);
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelPropellant).toBe(1);
            expect(underTest.propellant).toBe(capacity);
        });
        test('Propellant can be set to more than 100%', () => {
            const underTest = LimitedResourceInventory.ofCapacity(capacity);
            underTest.propellant = capacity + 1;
            expect(underTest.isNothing()).toBe(false);
            expect(underTest.levelPropellant).toBe(1);
            expect(underTest.propellant).toBe(capacity);
        });
    });
});
