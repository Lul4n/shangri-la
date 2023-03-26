import { LOGGER } from '../Logger';
import { Ship } from './Ship';
import { Ticks } from '../simulation/Ticks';
import { Simulatable } from '../simulation/Simulatable';
import { Labeled } from '../Labeled';

export class Fleet implements Simulatable{
    private ships: Set<Ship> = new Set<Ship>();

    public getShips(): Set<Ship> {
        return this.ships;
    }
    public isEmpty() {
        return this.ships.size == 0;
    }

    public join(ship: Ship): boolean {
        if (!this.ships.has(ship)) {
            this.ships.add(ship);
            ship.join(this);
            LOGGER.debug(`${this} is joined by ${ship}`);
            return true;
        }
        return false;
    }
    public leave(ship: Ship): boolean {
        if (this.ships.has(ship)) {
            this.ships.delete(ship);
            ship.leave(this);
            LOGGER.debug(`${this} is left by ${ship}`);
            return true;
        } else {
            return false;
        }
    }

    public update(deltaTime : Ticks) {
        this.ships.forEach(ship => {
            ship.update(deltaTime);
        });
    }

    public attack(other: Fleet) {
        LOGGER.trace(`${this} is going to attack ${other}`);
        this.ships.forEach(ship => {
            ship.attack(other);
        });
    }

    public toString(): string {
        return `Fleet{ships:${this.ships.size}}`
    }
}

export const LabeledFleet = Labeled(Fleet);