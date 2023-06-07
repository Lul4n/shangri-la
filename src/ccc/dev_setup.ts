import { Planet } from '../application/domain/economysystem/Planet';
import { Structure } from '../application/domain/economysystem/Structure';
import { System } from '../application/domain/economysystem/System';
import { Battle } from '../application/domain/fightsystem/Battle';
import { Fleet } from '../application/domain/fightsystem/Fleet';
import { ShipFactory } from '../application/domain/fightsystem/ShipFactory';
import { Simulation } from '../application/domain/simulation/Simulation';
import * as Utils from './Utils';
import { ORIGIN } from '../application/domain/Coordinates';
import { BLUEPRINT_ARC_FURNACE, BLUEPRINT_COAL_MINE, BLUEPRINT_REFINERY, BLUEPRINT_STEEL_WORKS } from '../application/domain/economysystem/StructureBlueprints';

export function devSetup(simulation: Simulation) {
    const factory1 = new ShipFactory('red');
    const f1 = new Fleet('F1');
    simulation.addPart(f1);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f1.join(factory1.spawnShip());
    }

    const factory2 = new ShipFactory('blue');
    const f2 = new Fleet('F2');
    simulation.addPart(f2);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f2.join(factory2.spawnShip());
    }

    const battle = new Battle(f1, f2, 100);
    simulation.addPart(battle);

    const s1 = new System(ORIGIN, 'Sonnensystem');
    const p1 = new Planet(100, 'Erde');
    p1.build(new Structure(BLUEPRINT_COAL_MINE));
    p1.build(new Structure(BLUEPRINT_STEEL_WORKS));
    p1.build(new Structure(BLUEPRINT_ARC_FURNACE));
    p1.build(new Structure(BLUEPRINT_REFINERY));

    s1.addPlanet(p1);
    simulation.addPart(s1);
}
