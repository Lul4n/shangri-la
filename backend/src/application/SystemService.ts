import { SystemRepository } from '../secondary/port/SystemRepository';
import { SystemPort } from '../primary/port/SystemPort';
import { System } from './domain/economysystem/System';
import { Simulatable } from './simulation/Simulatable';
import { Ticks } from './simulation/Ticks';

export class SystemService implements SystemPort, Simulatable {
    private systemRepository: SystemRepository;

    constructor(systemRepository: SystemRepository) {
        this.systemRepository = systemRepository;
    }

    public update(deltaTime: Ticks): void {
        const systems: System[] = this.systemRepository.all();
        for (const system of systems) {
            system.update(deltaTime);
            this.systemRepository.save(system);
        }
    }

    public all(): System[] {
        return this.systemRepository.all();
    }
}
