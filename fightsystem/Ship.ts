import assert = require('assert');
import { LOGGER } from '../Logger';

import { Fleet } from './Fleet'
import { Damage } from './Damage';
import { Weapon } from './Weapon';
import { Hull } from './Hull';
import { Shield } from './Shield';
import { Ticks } from '../simulation/Ticks';
import { Simulatable } from '../simulation/Simulatable';
import { Labeled } from '../Labeled';

export class Ship implements Simulatable{
    private fleet: Fleet | null;
    private shield: Shield;
    private hull: Hull;
    private weapon: Weapon;

    constructor(hull: Hull, shield: Shield, weapon: Weapon) {
        this.hull = hull;
        this.shield = shield;
        this.weapon = weapon;
        this.fleet = null;
    }

    public join(fleet: Fleet): boolean {
        if (this.fleet != fleet) {
            this.leave(fleet);
            this.fleet = fleet;
            this.fleet.join(this);
            LOGGER.debug(`${this} joined ${fleet}`);
            return true;
        } else {
            return false;
        }
    }

    public leave(fleet: Fleet): boolean {
        if (this.fleet && this.fleet == fleet) {
            let previousFleet = this.fleet;
            this.fleet = null;
            previousFleet.leave(this);
            LOGGER.debug(`${this} left ${fleet}`);
            return true;
        } else {
            return false;
        }
    }

    public take(damage: Damage): Damage {
        let damageDealtToShield: Damage = this.shield.take(damage);
        if (!damageDealtToShield.isNoDamage()) {
            LOGGER.trace(`${damageDealtToShield} has been dealt to ${this.shield}`);
        }
        let remainingDamage = damage.decreaseBy(damageDealtToShield);
        if (this.shield.isDestroyed() && !remainingDamage.isNoDamage()) {
            let damageDealtToHull: Damage = this.hull.take(remainingDamage);
            if (!damageDealtToHull.isNoDamage()) {
                LOGGER.trace(`${damageDealtToHull} has been dealt to ${this.hull}`);
            }
            if (this.hull.isDestroyed()) {
                LOGGER.debug(`${this.hull} has been destroyed`);
                this.destroy();
            }
            return remainingDamage.decreaseBy(damageDealtToHull);
        } else {
            LOGGER.trace(`${damage} has been absorbed by ${this.shield}`);
            return remainingDamage;
        }
    }

    public destroy(): boolean {
        LOGGER.info(`${this} has been destroyed`);
        this.shield.destroy();
        this.hull.destroy();
        this.fleet?.leave(this);
        return true;
    }

    public isDestroyed() {
        return this.hull.isDestroyed();
    }

    public update(deltaTime : Ticks): void {
        assert(!this.isDestroyed());
        this.shield.update(deltaTime);
    }

    private selectTarget(fleet: Fleet, hit: number): Ship | null {
        if (fleet.isEmpty()) {
            return null;
        } else {
            let ships = Array.from(fleet.getShips());
            return ships[hit % ships.length];
        }
    }

    private shotAt(fleet: Fleet, shot: number) {
        let d: Damage = this.weapon.attack();
        let remainingTargets: number = this.weapon.getTargets();
        LOGGER.trace(`${this} shoots at ${fleet} for the ${shot + 1} time`);
        do {
            let target: Ship | null = this.selectTarget(fleet, shot + this.weapon.getTargets() - remainingTargets);
            if (target) {
                target.take(d);
                d = d.decreaseBy(d.getValue() * this.weapon.getSplashCoefficiant());
                remainingTargets -= 1;
            } else {
                remainingTargets = 0;
            }
        } while (!d.isNoDamage() && remainingTargets > 0);
    }

    public attack(fleet: Fleet): boolean {
        assert(!this.isDestroyed());
        if (!fleet.isEmpty()) {
            LOGGER.trace(`${this} is going to attack ${fleet}`);
            for (let shot = 0; shot < this.weapon.getShots(); shot++) {
                this.shotAt(fleet, shot);
            }
            return true
        } else {
            return false;
        }
    }


    public toString(): string {
        return `Ship{hull:${this.hull},shield:${this.shield},weapon:${this.weapon},fleet:${this.fleet}}`
    }
}

export const LabeledShip = Labeled(Ship);