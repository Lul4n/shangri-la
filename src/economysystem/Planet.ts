import { Labeled } from '../Labeled';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { ResourceAmount } from './ResourceAmount';
import { ResourceInventory } from './ResourceInventory';
import { Structure } from './Structure';

export class Planet implements Simulatable, Labeled {
    private readonly _structures: Structure[] = [];
    private readonly _resources: ResourceInventory;
    private _label: string | null;

    constructor(label?: string) {
        this._resources = new ResourceInventory();
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
        return `Planet{resources:${this._resources},structures:${this._structures},label:${this._label}}`;
    }
}
