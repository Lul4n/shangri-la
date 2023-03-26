import assert = require('assert');

import { DamageType } from './DamageType';
import { Weapon } from './Weapon';
import { Damage } from './Damage';

export class SimpleWeapon implements Weapon {
    private readonly damageValue: number;
    private readonly damageType: DamageType;
    private readonly shots: number;
    private readonly targets: number;
    private readonly splashCoefficiant: number;

    constructor(damageValue: number, damageType: DamageType, shots: number = 1, targets: number = 1, splashCoefficiant: number = 0.0) {
        assert(damageValue >= 0);
        assert(shots >= 0);
        assert(targets >= 0);
        assert(splashCoefficiant >= 0);

        this.damageValue = damageValue;
        this.damageType = damageType;
        this.shots = shots;
        this.targets = targets;
        this.splashCoefficiant = splashCoefficiant;
    }
    public getShots(): number {
        return this.shots;
    }
    public getTargets(): number {
        return this.shots;
    }
    public getSplashCoefficiant(): number {
        return this.splashCoefficiant;
    }
    public attack(): Damage {
        return new Damage(this.damageValue, this.damageType);
    }
    public toString(): string {
        return `SimpleWeapon{damage:${this.damageValue},type:${this.damageType},shots:${this.shots},targets:${this.targets},splash:${this.splashCoefficiant}}`;
    }
}