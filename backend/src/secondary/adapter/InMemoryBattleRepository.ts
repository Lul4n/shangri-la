import { UUID } from '../../ccc/UUID';
import { loggerFactory } from '../../ccc/Logger';
import { BattleRepository } from '../port/BattleRepository';
import { Battle } from '../../application/domain/fightsystem/Battle';

export class InMemoryBattleRepository implements BattleRepository {
    private static readonly LOGGER = loggerFactory(InMemoryBattleRepository);
    private battles: Record<UUID, Battle> = {};
    public find(uuid: UUID): Battle | null {
        const found = this.battles[uuid] ? this.battles[uuid] : null;
        InMemoryBattleRepository.LOGGER.trace('find battle by %s: %s', uuid, found);
        return found;
    }
    public all(): Battle[] {
        const all: Battle[] = Object.values(this.battles);
        InMemoryBattleRepository.LOGGER.trace('all battles: %s', all.length);
        return all;
    }

    public save(battle: Battle): void {
        this.battles[battle.uuid] = battle;
        InMemoryBattleRepository.LOGGER.trace('saved battle: %s', battle);
    }
}
