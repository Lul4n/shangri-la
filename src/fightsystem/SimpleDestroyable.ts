import assert = require('assert');
import { DefenseType } from './DefenseType';
import { Destroyable } from './Destroyable';
import { Damage } from './Damage';
import { lookupDamageCoefficiant } from './DamageCoefficiants';

export class SimpleDestroyable implements Destroyable {
    private readonly _maxHp: number;
    private _hp: number;
    private readonly _defenseType: DefenseType;

    constructor(hp: number, defenseType: DefenseType = 'PASSIVE') {
        assert(hp > 0);
        this._hp = hp;
        this._maxHp = hp;
        this._defenseType = defenseType;
    }

    protected get hp(): number {
        return this._hp;
    }

    protected set hp(hp: number) {
        assert(hp >= 0 && hp <= this._maxHp);
        this._hp = hp;
    }

    protected get maxHp(): number {
        return this._maxHp;
    }

    protected get defenseType(): DefenseType {
        return this._defenseType;
    }

    public take(damage: Damage): Damage {
        const coefficiant = lookupDamageCoefficiant(damage.getType(), this._defenseType);

        const rawDamageValue = damage.getValue() * coefficiant;
        const previousHp = this._hp;
        if (rawDamageValue > this._hp) {
            this.destroy();
            return damage.setTo(previousHp / coefficiant);
        } else {
            this._hp -= rawDamageValue;
            return damage;
        }
    }
    public destroy() {
        this._hp = 0;
    }
    public isDamaged(): boolean {
        return this._hp < this._maxHp;
    }
    public isDestroyed(): boolean {
        return this._hp <= 0;
    }
}
