import { loggerFactory } from '../Logger';
import { Ship } from './Ship';
import { Ticks } from '../simulation/Ticks';
import { Simulatable } from '../simulation/Simulatable';
import { Labeled } from '../Labeled';

const LOGGER = loggerFactory('Fleet');

export class Fleet implements Simulatable, Labeled {
    private readonly _ships: Set<Ship> = new Set<Ship>();
    private _label: string | null;

    constructor(label?: string) {
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

    public getShips(): Set<Ship> {
        return this._ships;
    }
    public isEmpty() {
        return this._ships.size == 0;
    }

    public join(ship: Ship): boolean {
        if (!this._ships.has(ship)) {
            this._ships.add(ship);
            ship.join(this);
            LOGGER.debug('%s is joined by %s', this, ship);
            return true;
        }
        return false;
    }
    public leave(ship: Ship): boolean {
        if (this._ships.has(ship)) {
            this._ships.delete(ship);
            ship.leave(this);
            LOGGER.debug('%s is left by %s', this, ship);
            return true;
        } else {
            return false;
        }
    }

    public update(deltaTime: Ticks) {
        this._ships.forEach((ship) => {
            ship.update(deltaTime);
        });
    }

    public attack(other: Fleet) {
        LOGGER.trace('%s is going to attack %s', this, other);
        this._ships.forEach((ship) => {
            ship.attack(other);
        });
    }

    public toString(): string {
        return `Fleet{ships:${this._ships.size},label:${this._label}}`;
    }
}
