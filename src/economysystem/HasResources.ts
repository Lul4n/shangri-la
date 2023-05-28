export interface HasResources {
    covers(other: HasResources): boolean;
    isNothing(): boolean;
    get carbon(): number;
    get metal(): number;
    get silicon(): number;
    get synthetics(): number;
    get propellant(): number;
}
