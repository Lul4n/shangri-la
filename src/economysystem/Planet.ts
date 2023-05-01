import assert = require('assert');
import { Labeled } from '../Labeled';
import { ToStringHelper } from '../ToStringHelper';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { HasResources } from './HasResources';
import { LimitedResourceInventory } from './LimitedResourceInventory';
import { ResourceAmount } from './ResourceAmount';
import { Structure } from './Structure';
import { StructureConstructionQueue } from './StructureConstructionQueue';
import { StructureBlueprint } from './StructureBlueprint';
import { loggerFactory } from '../Logger';

export type PlanetSize = number;

const LOGGER = loggerFactory('Planet');

export class Planet implements Simulatable, Labeled {
    private readonly _structures: Structure[] = [];
    private readonly _resources: LimitedResourceInventory;
    private readonly _structureBuildingQueue: StructureConstructionQueue;
    private _label: string | null;
    private _size: PlanetSize;

    constructor(size: PlanetSize, label?: string) {
        assert(size >= 0);
        this._size = size;
        this._resources = LimitedResourceInventory.ofCapacity(size);
        this._label = label ? label : null;
        this._structureBuildingQueue = new StructureConstructionQueue((blueprint) => this.build(blueprint));
    }

    public get size(): PlanetSize {
        return this._size;
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

    public build(structure: Structure | StructureBlueprint) {
        if (structure instanceof Structure) {
            this._structures.push(structure);
        } else if (structure instanceof StructureBlueprint) {
            LOGGER.debug('not implemented yet');
        }
    }

    public update(deltaTime: Ticks) {
        this._structureBuildingQueue.update(deltaTime);
        this._structures.forEach((structure) => {
            const production = structure.produce(deltaTime);
            this._resources.add(production);
        });
    }
    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('label', this.label).add('resources', this._resources).add('structures', this._structures);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}
