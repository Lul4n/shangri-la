import { Ticks } from '../simulation/Ticks';
import { ResourceAmount } from './ResourceAmount';
export interface ResourceProduction {
    produce(deltaTime: Ticks): ResourceAmount;
} 