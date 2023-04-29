import assert = require('assert');

import { Planet } from './Planet';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { Coordinates } from '../Coordinates';
import { Labeled } from '../Labeled';
import { ToStringHelper } from '../ToStringHelper';

export class System implements Simulatable, Labeled {
    private readonly _coordinates: Coordinates;
    private readonly _planets: Planet[] = [];
    private _label: string | null;

    constructor(coordinates: Coordinates, label?: string) {
        assert(coordinates[0] >= 0, `invalid x coordinate ${coordinates[0]}`);
        assert(coordinates[1] >= 0, `invalid y coordinate ${coordinates[1]}`);
        assert(coordinates[2] >= 0, `invalid z coordinate ${coordinates[2]}`);
        this._coordinates = coordinates;
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

    public get coordinates(): Coordinates {
        return this._coordinates;
    }

    public addPlanet(planet: Planet) {
        this._planets.push(planet);
    }

    public update(deltaTime: Ticks) {
        this._planets.forEach((p) => p.update(deltaTime));
    }
    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('label', this.label).add('planets', this._planets);
    }
    public toString(): string {
        return this.toStringHelper().toString();
    }
}
