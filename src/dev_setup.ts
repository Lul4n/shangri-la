import { Planet } from './economysystem/Planet';
import { Structure } from './economysystem/Structure';
import { System } from './economysystem/System';
import { Battle } from './fightsystem/Battle';
import { Fleet } from './fightsystem/Fleet';
import { ShipFactory } from './fightsystem/ShipFactory';
import { Simulation } from './simulation/Simulation';
import * as Utils from './Utils';
import { ORIGIN } from './Coordinates';
import { ResourceAmount } from './economysystem/ResourceAmount';

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
    const p1 = new Planet('Erde');
    const b1 = new Structure(ResourceAmount.carbon(1), 'Kohlemine');
    p1.build(b1);
    s1.addPlanet(p1);
    simulation.addPart(s1);
}
