import { DamageType } from './DamageType';
import { DefenseType } from './DefenseType';

interface DamageCoefficiants extends Record<DamageType, Record<DefenseType, number>> { };

const DAMAGE_COEFFICIANTS: DamageCoefficiants = {
    NONE: { NONE: 0, PASSIVE: 0, ENERGY: 0, ACTIVE: 0 },
    PROJECTILE: { NONE: 10, PASSIVE: 1, ENERGY: 0.5, ACTIVE: 1 },
    ENERGY: { NONE: 10, PASSIVE: 0.5, ENERGY: 2, ACTIVE: 0.5 },
    EXPLOSIVE: { NONE: 10, PASSIVE: 1, ENERGY: 1, ACTIVE: 0.5 }
}

export function lookupDamageCoefficiant(damageType: DamageType, defenseType: DefenseType): number {
    return DAMAGE_COEFFICIANTS[damageType][defenseType];
}