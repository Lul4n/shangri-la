import assert = require('assert');

import { Fleet } from './Fleet';
import { Damage } from './Damage';
import { Weapon } from './Weapon';
import { Hull } from './Hull';
import { Shield } from './Shield';
import { Ticks } from '../simulation/Ticks';
import { Simulatable } from '../simulation/Simulatable';
import { Labeled } from '../Labeled';
import { loggerFactory } from '../Logger';

const LOGGER = loggerFactory('Ship');

export class Ship implements Simulatable {
    private _fleet: Fleet | null;
    private _shield: Shield;
    private _hull: Hull;
    private _weapon: Weapon;

    constructor(hull: Hull, shield: Shield, weapon: Weapon) {
        this._fleet = null;
        this._shield = shield;
        this._hull = hull;
        this._weapon = weapon;
    }

    public join(fleet: Fleet): boolean {
        if (this._fleet != fleet) {
            this.leave(fleet);
            this._fleet = fleet;
            this._fleet.join(this);
            LOGGER.trace('%s joined %s', this, fleet);
            return true;
        } else {
            return false;
        }
    }

    public leave(fleet: Fleet): boolean {
        if (this._fleet && this._fleet == fleet) {
            const previousFleet = this._fleet;
            this._fleet = null;
            previousFleet.leave(this);
            LOGGER.trace('%s left %s', this, fleet);
            return true;
        } else {
            return false;
        }
    }

    public take(damage: Damage): Damage {
        const damageDealtToShield: Damage = this._shield.take(damage);
        if (!damageDealtToShield.isNoDamage()) {
            LOGGER.trace('%s has been dealt to %s', damageDealtToShield, this._shield);
        }
        const remainingDamage = damage.decreaseBy(damageDealtToShield);
        if (this._shield.isDestroyed() && !remainingDamage.isNoDamage()) {
            const damageDealtToHull: Damage = this._hull.take(remainingDamage);
            if (!damageDealtToHull.isNoDamage()) {
                LOGGER.trace('%s has been dealt to %s', damageDealtToHull, this._hull);
            }
            if (this._hull.isDestroyed()) {
                LOGGER.debug('%s has been destroyed', this._hull);
                this.destroy();
            }
            return remainingDamage.decreaseBy(damageDealtToHull);
        } else {
            LOGGER.trace('%s has been absorbed by %s', damage, this._shield);
            return remainingDamage;
        }
    }

    public destroy(): boolean {
        LOGGER.trace('%s has been destroyed', this);
        this._shield.destroy();
        this._hull.destroy();
        this._fleet?.leave(this);
        return true;
    }

    public isDestroyed() {
        return this._hull.isDestroyed();
    }

    public update(deltaTime: Ticks): void {
        assert(!this.isDestroyed());
        this._shield.update(deltaTime);
    }

    private selectTarget(fleet: Fleet, hit: number): Ship | null {
        if (fleet.isEmpty()) {
            return null;
        } else {
            const ships = Array.from(fleet.getShips());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return ships[hit % ships.length]!;
        }
    }

    private shotAt(fleet: Fleet, shot: number) {
        let d: Damage = this._weapon.attack();
        let remainingTargets: number = this._weapon.targets;
        LOGGER.trace('%s shoots at %s for the %s time', this, fleet, shot + 1);
        do {
            const target: Ship | null = this.selectTarget(fleet, shot + this._weapon.targets - remainingTargets);
            if (target) {
                target.take(d);
                d = d.decreaseBy(d.getValue() * this._weapon.splashCoefficiant);
                remainingTargets -= 1;
            } else {
                remainingTargets = 0;
            }
        } while (!d.isNoDamage() && remainingTargets > 0);
    }

    public attack(fleet: Fleet): boolean {
        assert(!this.isDestroyed());
        if (!fleet.isEmpty()) {
            LOGGER.trace('%s is going to attack %s', this, fleet);
            for (let shot = 0; shot < this._weapon.shots; shot++) {
                this.shotAt(fleet, shot);
            }
            return true;
        } else {
            return false;
        }
    }

    public toString(): string {
        return `Ship{hull:${this._hull},shield:${this._shield},weapon:${this._weapon},fleet:${this._fleet}}`;
    }
}

export const LabeledShip = Labeled(Ship);
