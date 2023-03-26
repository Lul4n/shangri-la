import assert = require('assert');
import { Simulatable } from './Simulatable';
import { Ticks } from './Ticks';

export class EveryXTicks implements Simulatable{

    private readonly x : Ticks;
    private ticks : Ticks;
    private readonly callback : () => void

    constructor(x:Ticks, callback : () => void){
        assert(x > 0);
        this.x = x;
        this.ticks = 0n;
        this.callback = callback;
    }
    public getX(): bigint{
        return this.x;
    }

    public update(deltaTime : Ticks){
        assert(deltaTime >= 0n);
        this.ticks += deltaTime;
        const timesX = this.ticks / this.x;
        this.ticks -= timesX * this.x;
        for(let time = 0; time < timesX; time++){
            this.callback();
        }
    }
}