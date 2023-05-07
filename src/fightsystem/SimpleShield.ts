import assert = require('assert');
import { DefenseType } from './DefenseType';
import { Shield } from './Shield';
import { SimpleDestroyable } from './SimpleDestroyable';
import { Ticks } from '../simulation/Ticks';
import { EveryXTicks } from '../simulation/EveryXTicks';
import { loggerFactory } from '../Logger';
import { ToStringHelper } from '../ToStringHelper';

export class SimpleShield extends SimpleDestroyable implements Shield {
    private static readonly LOGGER = loggerFactory(SimpleShield);
    private readonly _regenerationRate: number;
    private readonly _everyXTicks: EveryXTicks;

    constructor(hp: number, regenerationRate: number, defenseType: DefenseType = 'ENERGY') {
        super(hp, defenseType);
        assert(regenerationRate >= 0);
        this._regenerationRate = regenerationRate;
        this._everyXTicks = new EveryXTicks(3, () => this.regenerate());
    }

    private regenerate() {
        const newHp = Math.min(this.maxHp, this.hp + this._regenerationRate);
        if (this.hp !== newHp) {
            SimpleShield.LOGGER.trace('%s is regenerating %s hp', this, newHp - this.hp);
            this.hp = newHp;
        }
    }

    public update(deltaTime: Ticks): void {
        this._everyXTicks.update(deltaTime);
    }
    protected override toStringHelper(): ToStringHelper {
        return super.toStringHelper().add('regenerationRate', this._regenerationRate);
    }
}
