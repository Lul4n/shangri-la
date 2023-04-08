import assert = require('assert');
import { ResourceAmount } from './ResourceAmount';

export class ImmutableResourceAmount implements ResourceAmount {
    public static carbon(carbon: bigint): ImmutableResourceAmount {
        return new ImmutableResourceAmount(carbon, 0n, 0n, 0n, 0n);
    }
    public static metal(metal: bigint): ImmutableResourceAmount {
        return new ImmutableResourceAmount(0n, metal, 0n, 0n, 0n);
    }
    public static silicon(silicon: bigint): ImmutableResourceAmount {
        return new ImmutableResourceAmount(0n, 0n, silicon, 0n, 0n);
    }
    public static synthetics(synthetics: bigint): ImmutableResourceAmount {
        return new ImmutableResourceAmount(0n, 0n, 0n, synthetics, 0n);
    }
    public static propellant(propellant: bigint): ImmutableResourceAmount {
        return new ImmutableResourceAmount(0n, 0n, 0n, 0n, propellant);
    }
    public static copyFrom(copyFrom: ResourceAmount): ImmutableResourceAmount {
        return new ImmutableResourceAmount(copyFrom.carbon, copyFrom.metal, copyFrom.silicon, copyFrom.synthetics, copyFrom.propellant);
    }
    private readonly _carbon: bigint;
    private readonly _metal: bigint;
    private readonly _silicon: bigint;
    private readonly _synthetics: bigint;
    private readonly _propellant: bigint;

    constructor(carbon: bigint, metal: bigint, silicon: bigint, synthetics: bigint, propellant: bigint) {
        assert(carbon >= 0n);
        assert(metal >= 0n);
        assert(silicon >= 0n);
        assert(synthetics >= 0n);
        assert(propellant >= 0n);

        this._carbon = carbon;
        this._metal = metal;
        this._silicon = silicon;
        this._synthetics = synthetics;
        this._propellant = propellant;
    }

    public multiply(factor: number | bigint): ImmutableResourceAmount {
        assert(factor >= 0);
        let bigIntFactor: bigint;
        if (typeof factor === 'number') {
            bigIntFactor = BigInt(factor);
        } else {
            bigIntFactor = factor;
        }
        return new ImmutableResourceAmount(this._carbon * bigIntFactor, this._metal * bigIntFactor, this._silicon * bigIntFactor, this._synthetics * bigIntFactor, this._propellant * bigIntFactor);
    }

    public get carbon(): bigint {
        return this._carbon;
    }
    public get metal(): bigint {
        return this._metal;
    }
    public get silicon(): bigint {
        return this._silicon;
    }
    public get synthetics(): bigint {
        return this._synthetics;
    }
    public get propellant(): bigint {
        return this._propellant;
    }

    public toString(): string {
        return `{carbon:${this._carbon},metal:${this._metal},silicon:${this._silicon},synthetics:${this._synthetics},propellant:${this._propellant}}`;
    }
}
