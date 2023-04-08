import * as Utils from '../Utils';

export type DamageType = 'NONE' | 'PROJECTILE' | 'ENERGY' | 'EXPLOSIVE';
const ALL: DamageType[] = ['NONE', 'PROJECTILE', "ENERGY", "EXPLOSIVE"];
export const DamageTypes = {
    all: function (): DamageType[] {
        return ALL;
    },
    size: function (): number {
        return ALL.length;
    },
    random: function (): DamageType {
        return ALL[Utils.randomInt(0, ALL.length - 1)] as DamageType;
    }
}

