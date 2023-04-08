import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { ResourceInventory } from './ResourceInventory';
import { Structure } from './Structure';
import { Labeled } from '../Labeled';

export class Planet implements Simulatable {
    private readonly _structures: Structure[] = [];
    private readonly _resources: ResourceInventory;

    constructor() {
        this._resources = new ResourceInventory();
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

    public toString(): string {
        return `Planet{resources:${this._resources},structures:${this._structures}}`;
    }
}

export const LabeledPlanet = Labeled(Planet);
