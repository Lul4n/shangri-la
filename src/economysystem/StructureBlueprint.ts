import { HasLabel } from '../HasLabel';
import { HasUuid, UUID } from '../HasUuid';
import { ToStringHelper } from '../ToStringHelper';
import { HasResources } from './HasResources';
import { ResourceAmount } from './ResourceAmount';

export class StructureBlueprint implements HasLabel, HasUuid {
    private readonly _uuid: UUID;
    private _label: string | null;
    private _baseProduction: ResourceAmount;

    constructor(uuid: UUID, baseProduction: HasResources, label?: string) {
        this._uuid = uuid;
        this._label = label ? label : null;
        this._baseProduction = ResourceAmount.copyFrom(baseProduction);
    }

    public get uuid(): UUID {
        return this._uuid;
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
