import assert = require("assert");
import { DefenseType } from "./DefenseType";
import { Destroyable } from "./Destroyable";
import { Damage } from "./Damage";
import { lookupDamageCoefficiant } from "./DamageCoefficiants";

export class SimpleDestroyable implements Destroyable {
    private readonly maxHp: number;
    private hp: number;
    private readonly defenseType: DefenseType;

    constructor(hp: number, defenseType: DefenseType = 'PASSIVE') {
        assert(hp > 0);
        this.hp = hp;
        this.maxHp = hp;
        this.defenseType = defenseType;
    }

    protected getHp(): number {
        return this.hp;
    }

    protected setHp(hp: number) {
        assert(hp >= 0 && hp <= this.maxHp);
        this.hp = hp;
    }

    protected getMaxHp(): number {
        return this.maxHp;
    }

    protected getDefenseType(): DefenseType {
        return this.defenseType;
    }

    public take(damage: Damage): Damage {
        let coefficiant = lookupDamageCoefficiant(damage.getType(), this.defenseType)

        let rawDamageValue = damage.getValue() * coefficiant;
        let previousHp = this.hp;
        if (rawDamageValue > this.hp) {
            this.destroy();
            return damage.setTo(previousHp / coefficiant);
        } else {
            this.hp -= rawDamageValue;
            return damage;
        }
    }
    public destroy() {
        this.hp = 0;
    }
    public isDamaged(): boolean {
        return this.hp < this.maxHp;
    }
    public isDestroyed(): boolean {
        return this.hp <= 0;
    }
}