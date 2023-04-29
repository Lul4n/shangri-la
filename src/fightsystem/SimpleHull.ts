import { DefenseType } from './DefenseType';
import { Hull } from './Hull';
import { SimpleDestroyable } from './SimpleDestroyable';

export class SimpleHull extends SimpleDestroyable implements Hull {
    constructor(hp: number, defenseType: DefenseType) {
        super(hp, defenseType);
    }
}
