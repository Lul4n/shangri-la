
export interface HasResources{

    isNothing(): boolean;
    get carbon(): number;
    get metal(): number;
    get silicon(): number;
    get synthetics(): number;
    get propellant(): number;
}