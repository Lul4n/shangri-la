import { UUID } from '../../ccc/UUID';
import { System } from '../../application/domain/economysystem/System';
import { Fleet } from '../../application/domain/fightsystem/Fleet';
import { Battle } from '../../application/domain/fightsystem/Battle';

export interface BattleRepository {
    find(uuid: UUID): Battle | null;

    all(): Battle[];

    save(battle: Battle): void;
}
