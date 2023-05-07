import { loggerFactory } from '../Logger';
import { Simulatable } from '../simulation/Simulatable';
import { Ticks } from '../simulation/Ticks';
import { StructureBlueprint } from './StructureBlueprint';

export type ConstructFunction = (blueprint: StructureBlueprint) => void;

export class StructureConstructionQueue implements Simulatable {
    private static readonly LOGGER = loggerFactory(StructureConstructionQueue);
    private _constructionFunction: ConstructFunction;

    constructor(constructionFunction: ConstructFunction) {
        this._constructionFunction = constructionFunction;
    }
    public update(deltaTime: Ticks) {
        //TODO not implemented yet
        StructureConstructionQueue.LOGGER.info('%s, %s', deltaTime, this._constructionFunction);
    }
}
