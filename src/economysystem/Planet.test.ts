import { LabeledPlanet } from './Planet';

export const TEST_MERKUR = new LabeledPlanet();
TEST_MERKUR.setLabel('MERKUR');
export const TEST_VENUS = new LabeledPlanet();
TEST_VENUS.setLabel('VENUS');
export const TEST_EARTH = new LabeledPlanet();
TEST_EARTH.setLabel('EARTH');
export const TEST_MARS = new LabeledPlanet();
TEST_MARS.setLabel('MARS');
export const TEST_JUPITER = new LabeledPlanet();
TEST_JUPITER.setLabel('JUPITER');
export const TEST_SATURN = new LabeledPlanet();
TEST_SATURN.setLabel('SATURN');
export const TEST_URANUS = new LabeledPlanet();
TEST_URANUS.setLabel('URANUS');

test('basic', () => {
    const underTest = TEST_EARTH;
    expect(underTest.getLabel()).toBe('EARTH');
});
