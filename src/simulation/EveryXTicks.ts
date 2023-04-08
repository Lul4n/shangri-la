import assert = require('assert');
import { Simulatable } from './Simulatable';
import { Ticks } from './Ticks';

export class EveryXTicks implements Simulatable {

    private readonly _x: Ticks;
    private _ticks: Ticks;
    private readonly _callback: () => void

    constructor(x: Ticks, callback: () => void) {
        assert(x > 0);
        this._x = x;
        this._ticks = 0n;
        this._callback = callback;
    }
    public get x(): bigint {
        return this._x;
    }

    public update(deltaTime: Ticks) {
        assert(deltaTime >= 0n);
        this._ticks += deltaTime;
        const timesX = this._ticks / this._x;
        this._ticks -= timesX * this._x;
        for (let time = 0; time < timesX; time++) {
            this._callback();
        }
    }
}