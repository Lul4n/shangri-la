import assert = require('assert');

import { Planet } from './Planet';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { Coordinates } from '../Coordinates';
import { LOGGER } from '../Logger';
import { Labeled } from '../Labeled';

export class System implements Simulatable{

    private readonly _coordinates : Coordinates;
    private readonly _planets : Planet[] = [];

    constructor(coordinates : Coordinates){
        assert (coordinates[0] >= 0, `invalid x coordinate ${coordinates[0]}`);
        assert (coordinates[1] >= 0, `invalid y coordinate ${coordinates[1]}`);
        assert (coordinates[2] >= 0, `invalid z coordinate ${coordinates[2]}`);
        this._coordinates = coordinates;
    }

    public addPlanet(planet : Planet) {
        this._planets.push(planet);
    }

    public update(deltaTime : Ticks) {
        this._planets.forEach(p => p.update(deltaTime));
        LOGGER.info("%s",this);
    }
    
    public toString(): string{        
        return `System{planets:${this._planets}}`
    }
}
export const LabeledSystem = Labeled(System);