import { Simulatable } from './simulation/Simulatable';
import { Ticks } from './simulation/Ticks';
import { FleetRepository } from '../secondary/port/FleetRepository';
import { Fleet } from './domain/fightsystem/Fleet';

export class FleetService implements Simulatable {
    private fleetRepository: FleetRepository;

    constructor(fleetRepository: FleetRepository) {
        this.fleetRepository = fleetRepository;
    }

    public update(deltaTime: Ticks): void {
        const fleets: Fleet[] = this.fleetRepository.all();
        for (const fleet of fleets) {
            fleet.update(deltaTime);
            this.fleetRepository.save(fleet);
        }
    }
}
