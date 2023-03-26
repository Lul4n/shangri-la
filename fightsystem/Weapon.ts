import { Damage } from "./Damage";

export interface Weapon {
    getSplashCoefficiant(): number;
    getTargets(): number;
    getShots(): number;
    attack(): Damage;
}