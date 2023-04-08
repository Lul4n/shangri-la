import * as Utils from '../Utils';

export type DefenseType = 'NONE' | 'PASSIVE' | 'ENERGY' | 'ACTIVE';
const ALL: DefenseType[] = ['NONE', 'PASSIVE', 'ENERGY', 'ACTIVE'];
export const DefenseTypes = {
    all: function (): DefenseType[] {
        return ALL;
    },
    size: function (): number {
        return ALL.length;
    },
    random: function (): DefenseType {
        return ALL[Utils.randomInt(0, ALL.length - 1)] as DefenseType;
    }
}