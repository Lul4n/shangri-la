import { Ticks } from "../simulation/Ticks";
import { ResourceProduction } from "./ResourceProduction";
import { ResourceInventory } from './ResourceInventory';
import { ResourceAmount } from './ResourceAmount';
import { ImmutableResourceAmount } from './ImmutableResourceAmount';
import assert = require("assert");
import { Labeled } from "../Labeled";

export class Structure implements ResourceProduction{

    private baseProduction : ImmutableResourceAmount;
    private level : bigint = 1n;

    constructor(baseProduction : ResourceAmount){
        this.baseProduction = ImmutableResourceAmount.copyFrom(baseProduction);
    }

    public setLevel(level : bigint){
        assert(level > 0);
        this.level = level;
    }

    public getLevel():bigint{
        return this.level;
    }

    public produce(deltaTime : Ticks): ResourceAmount{
        return this.baseProduction.multiply(this.level * deltaTime);
    }
    
    public toString(): string{        
        return `Structure{level:${this.level},baseProduction:${this.baseProduction}}`
    }
}
export const LabeledStructure = Labeled(Structure);