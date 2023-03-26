import assert = require('assert');
import { ResourceAmount } from './ResourceAmount';


export class ImmutableResourceAmount implements ResourceAmount{
    public static carbon(carbon : bigint) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(carbon,0n,0n,0n,0n);
    }
    public static metal(metal : bigint) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(0n,metal,0n,0n,0n);
    }
    public static silicon(silicon : bigint) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(0n,0n,silicon,0n,0n);
    }
    public static synthetics(synthetics : bigint) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(0n,0n,0n,synthetics,0n);
    }
    public static propellant(propellant : bigint) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(0n,0n,0n,0n,propellant);
    }
    public static copyFrom(copyFrom:ResourceAmount) : ImmutableResourceAmount{
        return new ImmutableResourceAmount(
            copyFrom.getCarbon(),
            copyFrom.getMetal(),
            copyFrom.getSilicon(),
            copyFrom.getSynthetics(),
            copyFrom.getPropellant()
        );
    }
    private readonly carbon : bigint;
    private readonly metal : bigint;
    private readonly silicon : bigint;
    private readonly synthetics : bigint;
    private readonly propellant : bigint;

    constructor(carbon : bigint, metal : bigint, silicon : bigint, synthetics : bigint, propellant : bigint){
        assert(carbon >= 0n);
        assert(metal >= 0n);
        assert(silicon >= 0n);
        assert(synthetics >= 0n);
        assert(propellant >= 0n);

        this.carbon = carbon;
        this.metal = metal;
        this.silicon = silicon;
        this.synthetics = synthetics;
        this.propellant = propellant;
    }

    public multiply(factor : number | bigint): ImmutableResourceAmount{
        assert(factor >= 0);
        let bigIntFactor;
        if(typeof factor === 'number'){
            bigIntFactor = BigInt(factor);
        }else{
            bigIntFactor = factor;
        }
        return new ImmutableResourceAmount(this.carbon * bigIntFactor, this.metal * bigIntFactor, this.silicon * bigIntFactor, this.synthetics *  bigIntFactor, this.propellant * bigIntFactor);
    }

    public getCarbon(): bigint {
        return this.carbon;
    }
    public getMetal(): bigint {
        return this.metal;
    }
    public getSilicon(): bigint {
        return this.silicon;
    }
    public getSynthetics(): bigint {
        return this.synthetics;
    }
    public getPropellant(): bigint {
        return this.propellant;
    }
    
    public toString(): string{        
        return `{carbon:${this.carbon},metal:${this.metal},silicon:${this.silicon},synthetics:${this.synthetics},propellant:${this.propellant}}`
    }
}