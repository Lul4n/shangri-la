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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return ALL[Utils.randomInt(0, ALL.length - 1)]!;
    },
};
