import { Damage } from "./Damage";

export interface Weapon {
    get splashCoefficiant(): number;
    get targets(): number;
    get shots(): number;
    attack(): Damage;
    toString() : string;
}