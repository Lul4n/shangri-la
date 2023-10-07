import { UUID } from '../../ccc/UUID';

export interface HasUuid {
    get uuid(): UUID;
}
