import { System } from '../../application/domain/economysystem/System';
import { loggerFactory } from '../../ccc/Logger';
import { SystemRepository } from '../port/SystemRepository';
import { UUID } from '../../ccc/UUID';
import {Fleet} from "../../application/domain/fightsystem/Fleet";

export class InMemorySystemRepository implements SystemRepository {
    private static readonly LOGGER = loggerFactory(InMemorySystemRepository);
    private systems: Record<UUID, System> = {};

    public find(uuid: UUID): System | null {
        const found = this.systems[uuid] ? this.systems[uuid] : null;
        InMemorySystemRepository.LOGGER.trace('find system by %s: %s', uuid, found);
        return found;
    }
    public all(): System[] {
        const all: System[] = Object.values(this.systems);
        InMemorySystemRepository.LOGGER.trace('all systems: %s', all.length);
        return all;
    }

    public save(system: System): void {
        this.systems[system.uuid] = system;
        InMemorySystemRepository.LOGGER.trace('save system: %s', system);
    }
}
