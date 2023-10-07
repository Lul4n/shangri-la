import { UUID } from '../../ccc/UUID';
import { Fleet } from '../../application/domain/fightsystem/Fleet';
import { FleetRepository } from '../port/FleetRepository';
import { loggerFactory } from '../../ccc/Logger';
import {Battle} from "../../application/domain/fightsystem/Battle";

export class InMemoryFleetRepository implements FleetRepository {
    private static readonly LOGGER = loggerFactory(InMemoryFleetRepository);
    private fleets: Record<UUID, Fleet> = {};
    public find(uuid: UUID): Fleet | null {
        const found = this.fleets[uuid] ? this.fleets[uuid] : null;
        InMemoryFleetRepository.LOGGER.trace('find fleet by %s: %s', uuid, found);
        return found;
    }
    public all(): Fleet[] {
        const all: Fleet[] = Object.values(this.fleets);
        InMemoryFleetRepository.LOGGER.trace('all fleets: %s', all.length);
        return all;
    }

    public save(fleet: Fleet): void {
        this.fleets[fleet.uuid] = fleet;
        InMemoryFleetRepository.LOGGER.trace('save fleet: %s', fleet);
    }
}
