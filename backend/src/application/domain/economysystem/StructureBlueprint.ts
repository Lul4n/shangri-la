import { assert } from 'console';
import { HasLabel } from '../HasLabel';
import { HasUuid } from '../HasUuid';
import { ToStringHelper } from '../../../ccc/ToStringHelper';
import { Ticks } from '../../simulation/Ticks';
import { HasResources } from './HasResources';
import { ResourceAmount } from './ResourceAmount';
import { UUID } from '../../../ccc/UUID';

export class StructureBlueprint implements HasLabel, HasUuid {
    private readonly _uuid: UUID;
    private _label: string | null;
    private _baseProduction: ResourceAmount;
    private _baseConstructionCosts: ResourceAmount;
    private _baseConstructionDuration: Ticks;

    constructor(uuid: UUID, baseProduction: HasResources, baseConstructionCosts: HasResources, baseConstructionDuration: Ticks, label?: string) {
        this._uuid = uuid;
        this._baseProduction = ResourceAmount.copyFrom(baseProduction);
        this._baseConstructionCosts = ResourceAmount.copyFrom(baseConstructionCosts);
        this._baseConstructionDuration = baseConstructionDuration;
        assert(this._baseConstructionDuration > 0);
        this._label = label ? label : null;
    }

    public get uuid(): UUID {
        return this._uuid;
    }

    public get baseProduction(): ResourceAmount {
        return this._baseProduction;
    }
    public get baseConstructionCosts(): ResourceAmount {
        return this._baseConstructionCosts;
    }
    public get baseConstructionDuration(): Ticks {
        return this._baseConstructionDuration;
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
