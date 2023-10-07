import { Simulatable } from './simulation/Simulatable';
import { Ticks } from './simulation/Ticks';
import { BattleRepository } from '../secondary/port/BattleRepository';
import { Battle } from './domain/fightsystem/Battle';

export class BattleService implements Simulatable {
    private battleRepository: BattleRepository;

    constructor(battleRepository: BattleRepository) {
        this.battleRepository = battleRepository;
    }

    public update(deltaTime: Ticks): void {
        const battles: Battle[] = this.battleRepository.all();
        for (const battle of battles) {
            battle.update(deltaTime);
            this.battleRepository.save(battle);
        }
    }
}
