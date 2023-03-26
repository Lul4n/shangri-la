import assert = require("assert");
import { DamageType } from "./DamageType";

export class Damage {
    private static readonly NO_DAMAGE = new Damage(0.0, 'NONE');
    private readonly value: number;
    private readonly dType: DamageType;

    constructor(value: number, dType: DamageType) {
        assert(value >= 0);
        this.value = value;
        this.dType = dType;
    }
    public decreaseBy(other: Damage | number): Damage {
        if (other instanceof Damage && this.value > other.value) {
            return new Damage(this.value - other.value, this.dType);
        } else if (other instanceof Damage) {
            return Damage.NO_DAMAGE;
        } else if (this.value > other) {
            return new Damage(this.value - (other as number), this.dType);
        } else {
            return Damage.NO_DAMAGE;
        }
    }
    public setTo(previousHp: number): Damage {
        assert(previousHp >= 0);
        return new Damage(previousHp, this.dType);
    }
    public isNoDamage(): boolean {
        return this.value <= 0.0 || this.dType == 'NONE';
    }
    public getType(): DamageType {
        return this.dType;
    }
    public getValue(): number {
        return this.value;
    }

    public toString(): string {
        return `Damage{value:${this.value},type:${this.dType}}`
    }

}