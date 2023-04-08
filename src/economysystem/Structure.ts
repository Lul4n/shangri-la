import { Ticks } from "../simulation/Ticks";
import { ResourceProduction } from "./ResourceProduction";
import { ResourceAmount } from './ResourceAmount';
import { ImmutableResourceAmount } from './ImmutableResourceAmount';
import assert = require("assert");
import { Labeled } from "../Labeled";

export class Structure implements ResourceProduction {

    private _baseProduction: ImmutableResourceAmount;
    private _level: bigint = 1n;

    constructor(baseProduction: ResourceAmount) {
        this._baseProduction = ImmutableResourceAmount.copyFrom(baseProduction);
    }

    public set level(level: bigint) {
        assert(level > 0);
        this._level = level;
    }

    public get level(): bigint {
        return this._level;
    }

    public produce(deltaTime: Ticks): ResourceAmount {
        return this._baseProduction.multiply(this._level * deltaTime);
    }

    public toString(): string {
        return `Structure{level:${this._level},baseProduction:${this._baseProduction}}`
    }
}
export const LabeledStructure = Labeled(Structure);