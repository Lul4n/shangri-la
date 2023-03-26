import * as Utils from '../Utils';

export type DamageType = 'NONE' | 'PROJECTILE' | 'ENERGY' | 'EXPLOSIVE';
const ALL : DamageType[]= ['NONE', 'PROJECTILE', "ENERGY", "EXPLOSIVE"];
export const DamageTypes = {
    from: function(x : NonNullable<any>): DamageType | null{
        if(!x){
            return null;
        }
        const str = x.toString();
        if(DamageTypes.is(str)){
            return str;
        }
        return null;
    },
    is: function(x : any): x is DamageType{
        return x && ALL.find(x.toString()) !== undefined;
    },
    all: function(): DamageType[] {
        return ALL;
    },
    size: function(): number{
        return ALL.length;
    },
    random: function(): DamageType {
        return ALL[Utils.randomInt(0, ALL.length-1)];
    }
}

