import assert = require('assert');
import { DefenseType } from './DefenseType';
import { Shield } from './Shield';
import { SimpleDestroyable } from './SimpleDestroyable';
import { LOGGER } from '../Logger';
import { Ticks } from '../simulation/Ticks';
import { EveryXTicks } from '../simulation/EveryXTicks';

export class SimpleShield extends SimpleDestroyable implements Shield {
    private readonly _regenerationRate: number;
    private readonly _everyXTicks: EveryXTicks;

    constructor(hp: number, regenerationRate: number, defenseType: DefenseType = 'ENERGY') {
        super(hp, defenseType);
        assert(regenerationRate >= 0);
        this._regenerationRate = regenerationRate;
        this._everyXTicks = new EveryXTicks(3n, () => this.regenerate());
    }

    private regenerate() {
        const newHp = Math.min(this.maxHp, this.hp + this._regenerationRate);
        if (this.hp !== newHp) {
            LOGGER.info(`${this} is regenerating ${newHp - this.hp}hp`);
            this.hp = newHp;
        }
    }

    public update(deltaTime: Ticks): void {
        this._everyXTicks.update(deltaTime);
    }
    public override toString(): string {
        return `SimpleShield{hp:${this.hp}/${this.maxHp},type:${this.defenseType},regenRate:${this._regenerationRate}}`;
    }
}
