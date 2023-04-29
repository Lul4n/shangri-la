import { Labeled } from '../Labeled';
import { ToStringHelper } from '../ToStringHelper';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { HasResources } from './HasResources';
import { LimitedResourceInventory } from './LimitedResourceInventory';
import { ResourceAmount } from './ResourceAmount';
import { Structure } from './Structure';

export class Planet implements Simulatable, Labeled {
    private readonly _structures: Structure[] = [];
    private readonly _resources: LimitedResourceInventory;
    private _label: string | null;

    constructor(label?: string) {
        this._resources = LimitedResourceInventory.ofCapacity(1000);
        this._label = label ? label : null;
    }

    public get label(): string | null {
        return this._label;
    }
    public set label(label: string | null) {
        this._label = label;
    }
    public hasLabel(): boolean {
        return this._label ? true : false;
    }

    public get resources(): ResourceAmount {
        return this._resources.toResourceAmount();
    }
    public get resourceCapacity(): HasResources {
        return this._resources.capacity;
    }

    public build(structure: Structure) {
        this._structures.push(structure);
    }

    public update(deltaTime: Ticks) {
        this._structures.forEach((structure) => {
            const production = structure.produce(deltaTime);
            this._resources.add(production);
        });
    }
    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this)
            .add('label', this.label)
            .add('resources', this.resources)
            .add('structures', this._structures);
    }

    public toString(): string {
        return this.toStringHelper.toString();
    }
}
