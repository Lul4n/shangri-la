import { Ticks } from '../simulation/Ticks';
import { ResourceProduction } from './ResourceProduction';
import { ResourceAmount } from './ResourceAmount';
import assert = require('assert');
import { ToStringHelper } from '../ToStringHelper';
import { StructureBlueprint } from './StructureBlueprint';

export class Structure implements ResourceProduction {
    private _blueprint: StructureBlueprint;
    private _level: number = 1;

    constructor(blueprint: StructureBlueprint) {
        this._blueprint = blueprint;
    }

    public get label(): string | null {
        return this._blueprint.label;
    }

    public set level(level: number) {
        assert(level > 0);
        this._level = level;
    }

    public get level(): number {
        return this._level;
    }

    public get blueprint(): StructureBlueprint {
        return this._blueprint;
    }

    public produce(deltaTime: Ticks): ResourceAmount {
        return this._blueprint.baseProduction.multiply(this.level * deltaTime);
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('blueprint', this._blueprint).add('level', this.level);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}
