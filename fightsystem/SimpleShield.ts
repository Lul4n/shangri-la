import assert = require("assert");
import { DefenseType } from "./DefenseType";
import { Shield } from "./Shield";
import { SimpleDestroyable } from "./SimpleDestroyable";
import { LOGGER } from "../Logger";
import { Ticks } from '../simulation/Ticks';
import { EveryXTicks } from '../simulation/EveryXTicks';

export class SimpleShield extends SimpleDestroyable implements Shield {
    private readonly regenerationRate: number;
    private readonly everyXTicks : EveryXTicks;

    constructor(hp: number, regenerationRate: number, defenseType: DefenseType = 'ENERGY') {
        super(hp, defenseType);
        assert(regenerationRate >= 0);
        this.regenerationRate = regenerationRate;
        this.everyXTicks = new EveryXTicks(3n, ()=>this.regenerate());
    }

    private regenerate(){
        let newHp = Math.min(this.getMaxHp(), this.getHp() + this.regenerationRate);
        if (this.getHp() !== newHp) {
            LOGGER.info(`${this} is regenerating ${newHp - this.getHp()}hp`);
            this.setHp(newHp);
        }
    }

    public update(deltaTime : Ticks): void {
        this.everyXTicks.update(deltaTime);
    }
    public toString(): string {
        return `SimpleShield{hp:${this.getHp()}/${this.getMaxHp()},type:${this.getDefenseType()},regenRate:${this.regenerationRate}}`;
    }
}