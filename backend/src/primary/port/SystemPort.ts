import { System } from '../../application/domain/economysystem/System';
import { UUID } from '../../ccc/UUID';

export interface SystemPort {
    all(): System[];
    find(systemId: UUID): System | null;
}
