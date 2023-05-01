import { Labeled } from '../Labeled';
import { ToStringHelper } from '../ToStringHelper';
import { ResourceAmount } from './ResourceAmount';

export class StructureBlueprint implements Labeled {
    private _label: string | null;
    private _baseProduction: ResourceAmount;

    constructor(baseProduction: ResourceAmount, label?: string) {
        this._label = label ? label : null;
        this._baseProduction = ResourceAmount.copyFrom(baseProduction);
    }

    public get baseProduction(): ResourceAmount {
        return this._baseProduction;
    }

    public get label(): string | null {
        return this._label;
    }
    public set label(label: string | null) {
        this._label = label;
    }

    public hasLabel(): boolean {
        return !!this._label;
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('label', this.label).add('baseProduction', this.baseProduction);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}
