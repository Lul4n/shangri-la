import { UUID } from '../../application/domain/HasUuid';
import { System } from '../../application/domain/economysystem/System';

export interface SystemRepository {
    find(uuid: UUID): System | null;
}
