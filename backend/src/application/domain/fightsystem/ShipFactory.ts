import * as Utils from '../../../ccc/Utils';

import { Ship } from './Ship';
import { DamageTypes } from './DamageType';
import { DefenseTypes } from './DefenseType';
import { SimpleWeapon } from './SimpleWeapon';
import { SimpleHull } from './SimpleHull';
import { SimpleShield } from './SimpleShield';

export class ShipFactory {
    private _shipLabelPrefix: string;
    private _producedShips: number = 0;
    constructor(shipLabelPrefix: string) {
        this._shipLabelPrefix = shipLabelPrefix;
    }
    public spawnShip(): Ship {
        this._producedShips += 1;
        const ship = new Ship(
            new SimpleHull(Utils.randomInt(80, 1000), DefenseTypes.random()),
            new SimpleShield(Utils.randomInt(50, 200), Utils.randomInt(0, 10)),
            new SimpleWeapon(Utils.randomInt(3, 15), DamageTypes.random(), Utils.randomInt(1, 3), Utils.randomInt(1, 10), Math.random()),
            `${this._shipLabelPrefix}-${this._producedShips}`
        );
        return ship;
    }
}
