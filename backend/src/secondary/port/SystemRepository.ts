import { System } from '../../application/domain/economysystem/System';
import { UUID } from '../../ccc/UUID';

export interface SystemRepository {
    find(uuid: UUID): System | null;

    all(): System[];

    save(system: System): void;
}
