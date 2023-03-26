import { Damage } from "./Damage";

export interface Destroyable{
    destroy(): void;
    take(damage: Damage): Damage;
    isDestroyed(): boolean;
    isDamaged(): boolean;
}