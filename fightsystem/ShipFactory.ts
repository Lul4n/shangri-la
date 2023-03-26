import * as Utils from '../Utils' ;

import { LabeledShip, Ship } from './Ship'
import { DamageTypes } from './DamageType';
import { DefenseTypes } from './DefenseType';
import { SimpleWeapon } from './SimpleWeapon';
import { SimpleHull } from './SimpleHull';
import { SimpleShield } from './SimpleShield';

export class ShipFactory {
    private shipLabelPrefix: string;
    private producedShips: number = 0;
    constructor(shipLabelPrefix: string) {
        this.shipLabelPrefix = shipLabelPrefix;
    }
    public spawnShip(): Ship {
        this.producedShips += 1;
        const ship = new LabeledShip(
            new SimpleHull(Utils.randomInt(80, 1000), DefenseTypes.random()), 
            new SimpleShield(Utils.randomInt(50, 200), Utils.randomInt(0, 10)), 
            new SimpleWeapon(Utils.randomInt(3, 15), DamageTypes.random(), Utils.randomInt(1, 3), Utils.randomInt(1, 10), Math.random()));
        ship.setLabel(`${this.shipLabelPrefix}-${this.producedShips}`);
        return ship;
    }
}