import assert = require('assert');

import { DamageType } from './DamageType';
import { Weapon } from './Weapon';
import { Damage } from './Damage';
import { ToStringHelper } from '../../../ccc/ToStringHelper';

export class SimpleWeapon implements Weapon {
    private readonly _damageValue: number;
    private readonly _damageType: DamageType;
    private readonly _shots: number;
    private readonly _targets: number;
    private readonly _splashCoefficiant: number;

    constructor(damageValue: number, damageType: DamageType, shots: number = 1, targets: number = 1, splashCoefficiant: number = 0.0) {
        assert(damageValue >= 0);
        assert(shots >= 0);
        assert(targets >= 0);
        assert(splashCoefficiant >= 0);

        this._damageValue = damageValue;
        this._damageType = damageType;
        this._shots = shots;
        this._targets = targets;
        this._splashCoefficiant = splashCoefficiant;
    }
    public get shots(): number {
        return this._shots;
    }
    public get targets(): number {
        return this._targets;
    }
    public get splashCoefficiant(): number {
        return this._splashCoefficiant;
    }
    public attack(): Damage {
        return new Damage(this._damageValue, this._damageType);
    }
    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this)
            .add('value', this._damageValue)
            .add('type', this._damageType)
            .add('shots', this._shots)
            .add('targets', this._targets)
            .add('splashCoefficiant', this._splashCoefficiant);
    }
    public toString(): string {
        return this.toStringHelper().toString();
    }
}
