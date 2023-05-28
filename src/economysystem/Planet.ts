import assert = require('assert');
import { HasLabel } from '../HasLabel';
import { ToStringHelper } from '../ToStringHelper';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { HasResources } from './HasResources';
import { LimitedResourceInventory } from './LimitedResourceInventory';
import { ResourceAmount } from './ResourceAmount';
import { Structure } from './Structure';
import { StructureBlueprint } from './StructureBlueprint';
import { loggerFactory } from '../Logger';
import { UUID } from '../HasUuid';

export type PlanetSize = number;
2;

interface Construction {
    blueprint: StructureBlueprint;
    paid: ResourceAmount;
    remainingDuration: Ticks;
    level: number;
}

export class Planet implements Simulatable, HasLabel {
    private static readonly LOGGER = loggerFactory(Planet);
    private readonly _structuresByBlueprintUuid: Record<UUID, Structure> = {};
    private readonly _structureConstructionQueue: Construction[] = [];
    private readonly _resources: LimitedResourceInventory;
    private _label: string | null;
    private _size: PlanetSize;

    constructor(size: PlanetSize, label?: string) {
        assert(size >= 0);
        this._size = size;
        this._resources = LimitedResourceInventory.ofCapacity(size);
        this._label = label ? label : null;
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

    public get resources(): LimitedResourceInventory {
        return this._resources;
    }
    public get resourceCapacity(): HasResources {
        return this._resources.capacity;
    }

    public findStructure(by: StructureBlueprint | UUID): Structure | null {
        if (by instanceof StructureBlueprint) {
            return this.findStructure(by.uuid);
        } else {
            const structure = this._structuresByBlueprintUuid[by];
            return structure ? structure : null;
        }
    }

    public calculateConstructionCosts(blueprint: StructureBlueprint, lvl: number): ResourceAmount {
        assert(lvl >= 0);
        return blueprint.baseConstructionCosts.multiply(Math.pow(1 + 0.01, Math.floor(lvl)));
    }
    public calculateConstructionDuration(blueprint: StructureBlueprint, lvl: number): Ticks {
        assert(lvl >= 0);
        return Math.floor(blueprint.baseConstructionDuration * Math.pow(1 + 0.01, Math.floor(lvl)));
    }

    public tryConstruction(blueprint: StructureBlueprint) {
        const structure: Structure | null = this.findStructure(blueprint);
        const lvl = structure ? structure.level : 0;
        const costs = this.calculateConstructionCosts(blueprint, lvl);
        const paid = this._resources.subtract(costs);
        if (paid) {
            const duration = this.calculateConstructionDuration(blueprint, lvl);
            Planet.LOGGER.debug('Paid {} to begin construction of {}', costs, blueprint);
            this._structureConstructionQueue.push({
                blueprint: blueprint,
                paid: costs,
                remainingDuration: duration,
                level: lvl,
            });
            return true;
        } else {
            Planet.LOGGER.debug('Insufficiant resources to pay {} in order to begin construction of {}', costs, blueprint);
            return false;
        }
    }

    public build(structure: Structure) {
        this._structuresByBlueprintUuid[structure.blueprint.uuid] = structure;
    }

    private updateSingleTickConstruction() {
        const currentConstruction = this._structureConstructionQueue[0];
        if (this._structureConstructionQueue.length > 0 && currentConstruction) {
            currentConstruction.remainingDuration -= 1;
            if (currentConstruction.remainingDuration == 0) {
                this._structureConstructionQueue.splice(0, 1);
                if (currentConstruction.level == 0) {
                    this._structuresByBlueprintUuid[currentConstruction.blueprint.uuid] = new Structure(currentConstruction.blueprint);
                } else {
                    const currentStructure = this._structuresByBlueprintUuid[currentConstruction.blueprint.uuid];
                    assert(currentStructure);
                    currentStructure.level++;
                }
            }
        }
    }

    private updateSingleTickProduction() {
        Object.values(this._structuresByBlueprintUuid).forEach((structure) => {
            const production = structure.produce(1);
            this._resources.add(production);
        });
    }

    public update(deltaTime: Ticks) {
        for (let tick = 0; tick < deltaTime; tick++) {
            this.updateSingleTickConstruction();
            this.updateSingleTickProduction();
        }
    }
    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this)
            .add('label', this.label)
            .add('resources', this._resources)
            .add('structures', this._structuresByBlueprintUuid)
            .add('construction', this._structureConstructionQueue);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}
