import { Ticks } from '../simulation/Ticks';
import { ResourceProduction } from './ResourceProduction';
import { ResourceAmount } from './ResourceAmount';
import assert = require('assert');
import { Labeled } from '../Labeled';
import { ToStringHelper } from '../ToStringHelper';

export class Structure implements ResourceProduction, Labeled {
    private _baseProduction: ResourceAmount;
    private _level: number = 1;
    private _label: string | null;

    constructor(baseProduction: ResourceAmount, label?: string) {
        this._baseProduction = ResourceAmount.copyFrom(baseProduction);
        this._label = label ? label : null;
    }
    public get label(): string | null {
        return this._label;
    }
    public set label(label: string | null) {
        this._label = label ? label : null;
    }
    public hasLabel(): boolean {
        return this._label ? true : false;
    }

    public set level(level: number) {
        assert(level > 0);
        this._level = level;
    }

    public get level(): number {
        return this._level;
    }

    public produce(deltaTime: Ticks): ResourceAmount {
        return this._baseProduction.multiply(this.level * deltaTime);
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('label', this.label).add('level', this.level).add('baseProduction', this._baseProduction);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}
