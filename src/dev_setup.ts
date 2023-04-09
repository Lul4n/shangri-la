import { ImmutableResourceAmount } from './economysystem/ImmutableResourceAmount';
import { LabeledPlanet } from './economysystem/Planet';
import { LabeledStructure } from './economysystem/Structure';
import { LabeledSystem } from './economysystem/System';
import { Battle } from './fightsystem/Battle';
import { LabeledFleet } from './fightsystem/Fleet';
import { ShipFactory } from './fightsystem/ShipFactory';
import { Simulation } from './simulation/Simulation';
import * as Utils from './Utils';

export function devSetup(simulation: Simulation) {
    const factory1 = new ShipFactory('red');
    const f1 = new LabeledFleet();
    f1.setLabel('F1');
    simulation.addPart(f1);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f1.join(factory1.spawnShip());
    }

    const factory2 = new ShipFactory('blue');
    const f2 = new LabeledFleet();
    f2.setLabel('F2');
    simulation.addPart(f2);
    for (let i = 0; i < Utils.randomInt(900, 1000); i++) {
        f2.join(factory2.spawnShip());
    }

    const battle = new Battle(f1, f2, 100n);
    simulation.addPart(battle);

    const s1 = new LabeledSystem([1n, 1n, 1n]);
    s1.setLabel('Sonnensystem');
    const p1 = new LabeledPlanet();
    p1.setLabel('Erde');
    const b1 = new LabeledStructure(ImmutableResourceAmount.carbon(1n));
    b1.setLabel('Kohlemine');
    p1.build(b1);
    s1.addPlanet(p1);
    simulation.addPart(s1);
}
