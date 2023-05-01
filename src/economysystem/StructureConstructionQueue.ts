import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { StructureBlueprint } from './StructureBlueprint';

export type ConstructFunction = (blueprint: StructureBlueprint) => void;

export class StructureConstructionQueue implements Simulatable {
    private _constructionFunction: ConstructFunction;

    constructor(constructionFunction: ConstructFunction) {
        this._constructionFunction = constructionFunction;
    }
    public update(deltaTime: Ticks) {
        console.log(deltaTime, this._constructionFunction);
    }
}
