import { System } from '../../application/domain/economysystem/System';

export interface SystemPort {
    getAll(): System[];
}
