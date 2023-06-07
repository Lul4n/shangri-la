import { loggerFactory } from '../../../ccc/Logger';
import { Ship } from './Ship';
import { Ticks } from '../simulation/Ticks';
import { Simulatable } from '../simulation/Simulatable';
import { HasLabel } from '../HasLabel';
import { ToStringHelper } from '../../../ccc/ToStringHelper';

export class Fleet implements Simulatable, HasLabel {
    private static readonly LOGGER = loggerFactory('Fleet');
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
            Fleet.LOGGER.debug('%s is joined by %s', this, ship);
            return true;
        }
        return false;
    }
    public leave(ship: Ship): boolean {
        if (this._ships.has(ship)) {
            this._ships.delete(ship);
            ship.leave(this);
            Fleet.LOGGER.debug('%s is left by %s', this, ship);
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
        Fleet.LOGGER.trace('%s is going to attack %s', this, other);
        this._ships.forEach((ship) => {
            ship.attack(other);
        });
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('label', this.label).add('ships', this._ships.size);
    }
    public toString(): string {
        return this.toStringHelper().toString();
    }
}
