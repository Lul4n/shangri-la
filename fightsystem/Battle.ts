import assert = require("assert");

import * as Utils from '../Utils';

import { Fleet } from "./Fleet";
import { LOGGER } from "../Logger";
import { Simulatable } from "../simulation/Simulatable";
import { Ticks } from "../simulation/Ticks";
import { EveryXTicks } from "../simulation/EveryXTicks";

export type BattleResult = 'OPEN' | 'ATTACKER_WON' | 'DEFENDER_WON' | 'DRAW';

export class Battle implements Simulatable{
    private readonly _everyXTicks : EveryXTicks;
    private readonly _attacker : Fleet;
    private readonly _defender : Fleet;
    private readonly _maxRounds : bigint;
    private _round : bigint = 0n;
    private _result : BattleResult;

    constructor(attacker: Fleet, defender: Fleet, maxRounds: bigint){
        this._everyXTicks = new EveryXTicks(10n, () => this.calculateRound());
        this._attacker = attacker;
        this._defender = defender;
        this._maxRounds = maxRounds;
        this._round = 0n;
        this._result = 'OPEN';
    }

    public update(deltaTime : Ticks){
        if(this._result !== 'OPEN'){
            return;
        }
        this._everyXTicks.update(deltaTime);
    }

    private determineParticipantOrder() : [Fleet, Fleet]{
        if (Utils.randomBoolean()) {
            return [this._attacker, this._defender];
        } else {
            return [this._defender, this._attacker];
        }
    }

    private calculateRound(){
        if(this._result !== 'OPEN'){
            return;
        }
        this._round++;
        LOGGER.info(`Round ${this._round}: ${this._attacker} vs. ${this._defender}`);

        const ordered = this.determineParticipantOrder();
        ordered[0].attack(ordered[1]);
        if(!ordered[1].isEmpty()){
            ordered[1].attack(ordered[0]);
        }
        
        if(this._attacker.isEmpty() && this._defender.isEmpty()){
            this._result = 'DRAW';
        }else if (this._attacker.isEmpty()) {
            this._result = 'DEFENDER_WON';
        } else if (this._defender.isEmpty()) {
            this._result = 'ATTACKER_WON';
        } else if(this._round >= this._maxRounds){
            this._result = 'DRAW';
        }else{
            this._result = 'OPEN';
        }
    }
}