import * as Utils from '../Utils';

export type DefenseType = 'NONE' | 'PASSIVE' | 'ENERGY' | 'ACTIVE';
const ALL : DefenseType[] = ['NONE' , 'PASSIVE' , 'ENERGY' , 'ACTIVE'];
export const DefenseTypes = {
    from: function(x : NonNullable<any>): DefenseType | null{
        if(!x){
            return null;
        }
        const str = x.toString();
        if(DefenseTypes.is(str)){
            return str;
        }
        return null;
    },
    is: function(x : any): x is DefenseType{
        return x && ALL.find(x.toString()) !== undefined;
    },
    all: function(): DefenseType[] {
        return ALL;
    },
    size: function(): number{
        return ALL.length;
    },
    random: function(): DefenseType {
        return ALL[Utils.randomInt(0, ALL.length-1)];
    }
}