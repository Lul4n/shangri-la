import * as Utils from '../../../ccc/Utils';

export type DamageType = 'NONE' | 'PROJECTILE' | 'ENERGY' | 'EXPLOSIVE';
const ALL: DamageType[] = ['NONE', 'PROJECTILE', 'ENERGY', 'EXPLOSIVE'];
export const DamageTypes = {
    all: function (): DamageType[] {
        return ALL;
    },
    size: function (): number {
        return ALL.length;
    },
    random: function (): DamageType {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return ALL[Utils.randomInt(0, ALL.length - 1)]!;
    },
};
