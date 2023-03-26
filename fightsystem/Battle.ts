import assert = require("assert");

import * as Utils from '../Utils';

import { Fleet } from "./Fleet";
import { LOGGER } from "../Logger";
import { Simulatable } from "../simulation/Simulatable";
import { Ticks } from "../simulation/Ticks";
import { EveryXTicks } from "../simulation/EveryXTicks";

export type BattleResult = 'OPEN' | 'ATTACKER_WON' | 'DEFENDER_WON' | 'DRAW';

export class Battle implements Simulatable{
    private readonly everyXTicks : EveryXTicks;
    private readonly attacker : Fleet;
    private readonly defender : Fleet;
    private readonly maxRounds : bigint;
    private round : bigint = 0n;
    private result : BattleResult;

    constructor(attacker: Fleet, defender: Fleet, maxRounds: bigint){
        this.everyXTicks = new EveryXTicks(10n, () => this.calculateRound());
        this.round = 0n;
        this.attacker = attacker;
        this.defender = defender;
        this.maxRounds = maxRounds;
        this.result = 'OPEN';
    }

    public update(deltaTime : Ticks){
        if(this.result !== 'OPEN'){
            return;
        }
        this.everyXTicks.update(deltaTime);
    }

    private determineParticipantOrder() : [Fleet, Fleet]{
        if (Utils.randomBoolean()) {
            return [this.attacker, this.defender];
        } else {
            return [this.defender, this.attacker];
        }
    }

    private calculateRound(){
        if(this.result !== 'OPEN'){
            return;
        }
        this.round++;
        LOGGER.info(`Round ${this.round}: ${this.attacker} vs. ${this.defender}`);

        const ordered = this.determineParticipantOrder();
        ordered[0].attack(ordered[1]);
        if(!ordered[1].isEmpty()){
            ordered[1].attack(ordered[0]);
        }
        
        if(this.attacker.isEmpty() && this.defender.isEmpty()){
            this.result = 'DRAW';
        }else if (this.attacker.isEmpty()) {
            this.result = 'DEFENDER_WON';
        } else if (this.defender.isEmpty()) {
            this.result = 'ATTACKER_WON';
        } else if(this.round >= this.maxRounds){
            this.result = 'DRAW';
        }else{
            this.result = 'OPEN';
        }
    }
}