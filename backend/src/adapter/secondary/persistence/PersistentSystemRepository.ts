import { UUID } from '../../../application/domain/HasUuid';
import { System } from '../../../application/domain/economysystem/System';
import { loggerFactory } from '../../../ccc/Logger';
import { SystemRepository } from '../../../ports/secondary/SystemRepository';

export class PersistentSystemRepository implements SystemRepository {
    private static readonly LOGGER = loggerFactory(PersistentSystemRepository);
    public find(uuid: UUID): System | null {
        PersistentSystemRepository.LOGGER.info('find system by {}', uuid);
        return null;
    }
}
