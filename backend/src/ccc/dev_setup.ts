import { Planet } from '../application/domain/economysystem/Planet';
import { Structure } from '../application/domain/economysystem/Structure';
import { System } from '../application/domain/economysystem/System';
import { Battle } from '../application/domain/fightsystem/Battle';
import { Fleet } from '../application/domain/fightsystem/Fleet';
import { ShipFactory } from '../application/domain/fightsystem/ShipFactory';
import * as Utils from './Utils';
import { ORIGIN } from '../application/domain/Coordinates';
import { BLUEPRINT_ARC_FURNACE, BLUEPRINT_COAL_MINE, BLUEPRINT_REFINERY, BLUEPRINT_STEEL_WORKS } from '../application/domain/economysystem/StructureBlueprints';
import { SystemRepository } from '../secondary/port/SystemRepository';
import { FleetRepository } from '../secondary/port/FleetRepository';
import { BattleRepository } from '../secondary/port/BattleRepository';

export function devSetup(systemRepository: SystemRepository, fleetRepository: FleetRepository, battleRepository: BattleRepository) {
    const factory1 = new ShipFactory('red');
    const f1 = new Fleet('F1');
    fleetRepository.save(f1);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f1.join(factory1.spawnShip());
    }

    const factory2 = new ShipFactory('blue');
    const f2 = new Fleet('F2');
    fleetRepository.save(f2);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f2.join(factory2.spawnShip());
    }

    const battle = new Battle(f1, f2, 100);
    battleRepository.save(battle);

    const s1 = new System(ORIGIN, 'Sonnensystem');

    const p0 = new Planet(100, 'Mars');
    s1.addPlanet(p0);
    const p1 = new Planet(100, 'Erde');
    s1.addPlanet(p1);
    p1.build(new Structure(BLUEPRINT_COAL_MINE));
    p1.build(new Structure(BLUEPRINT_STEEL_WORKS));
    p1.build(new Structure(BLUEPRINT_ARC_FURNACE));
    p1.build(new Structure(BLUEPRINT_REFINERY));

    systemRepository.save(s1);
}
