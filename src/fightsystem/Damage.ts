import assert = require("assert");
import { DamageType } from "./DamageType";

export class Damage {
    private static readonly NO_DAMAGE = new Damage(0.0, 'NONE');
    private readonly _value: number;
    private readonly _dType: DamageType;

    constructor(value: number, dType: DamageType) {
        assert(value >= 0);
        this._value = value;
        this._dType = dType;
    }
    public decreaseBy(other: Damage | number): Damage {
        if (other instanceof Damage && this._value > other._value) {
            return new Damage(this._value - other._value, this._dType);
        } else if (other instanceof Damage) {
            return Damage.NO_DAMAGE;
        } else if (this._value > other) {
            return new Damage(this._value - other, this._dType);
        } else {
            return Damage.NO_DAMAGE;
        }
    }
    public setTo(previousHp: number): Damage {
        assert(previousHp >= 0);
        return new Damage(previousHp, this._dType);
    }
    public isNoDamage(): boolean {
        return this._value <= 0.0 || this._dType == 'NONE';
    }
    public getType(): DamageType {
        return this._dType;
    }
    public getValue(): number {
        return this._value;
    }

    public toString(): string {
        return `Damage{value:${this._value},type:${this._dType}}`
    }
}