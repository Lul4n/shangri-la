
export interface ResourceAmount{
    getCarbon() : bigint;
    getMetal() : bigint;
    getSilicon() : bigint;
    getSynthetics() : bigint;
    getPropellant() : bigint;
}