
export interface ResourceAmount{
    get carbon() : bigint;
    get metal() : bigint;
    get silicon() : bigint;
    get synthetics() : bigint;
    get propellant() : bigint;
}