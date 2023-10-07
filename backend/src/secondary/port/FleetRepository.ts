import { UUID } from '../../ccc/UUID';
import { System } from '../../application/domain/economysystem/System';
import { Fleet } from '../../application/domain/fightsystem/Fleet';

export interface FleetRepository {
    find(uuid: UUID): Fleet | null;

    all(): Fleet[];

    save(fleet: Fleet): void;
}
