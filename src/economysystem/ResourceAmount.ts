import assert = require('assert');
import { HasResources } from './HasResources';
import { ToStringHelper } from '../ToStringHelper';

export class ResourceAmount implements HasResources {
    public static carbon(carbon: number): ResourceAmount {
        return new ResourceAmount(carbon, 0, 0, 0, 0);
    }
    public static metal(metal: number): ResourceAmount {
        return new ResourceAmount(0, metal, 0, 0, 0);
    }
    public static silicon(silicon: number): ResourceAmount {
        return new ResourceAmount(0, 0, silicon, 0, 0);
    }
    public static synthetics(synthetics: number): ResourceAmount {
        return new ResourceAmount(0, 0, 0, synthetics, 0);
    }
    public static propellant(propellant: number): ResourceAmount {
        return new ResourceAmount(0, 0, 0, 0, propellant);
    }
    public static copyFrom(copyFrom: HasResources): ResourceAmount {
        return new ResourceAmount(copyFrom.carbon, copyFrom.metal, copyFrom.silicon, copyFrom.synthetics, copyFrom.propellant);
    }
    private readonly _carbon: number;
    private readonly _metal: number;
    private readonly _silicon: number;
    private readonly _synthetics: number;
    private readonly _propellant: number;

    constructor(carbon: number, metal: number, silicon: number, synthetics: number, propellant: number) {
        assert(carbon >= 0);
        assert(metal >= 0);
        assert(silicon >= 0);
        assert(synthetics >= 0);
        assert(propellant >= 0);

        this._carbon = carbon;
        this._metal = metal;
        this._silicon = silicon;
        this._synthetics = synthetics;
        this._propellant = propellant;
    }

    public isNothing(): boolean {
        return this.carbon === 0 && this.metal === 0 && this.silicon === 0 && this.synthetics === 0 && this.propellant === 0;
    }

    public multiply(factor: number): ResourceAmount {
        assert(factor >= 0);
        return new ResourceAmount(this._carbon * factor, this._metal * factor, this._silicon * factor, this._synthetics * factor, this._propellant * factor);
    }

    public get carbon(): number {
        return this._carbon;
    }
    public get metal(): number {
        return this._metal;
    }
    public get silicon(): number {
        return this._silicon;
    }
    public get synthetics(): number {
        return this._synthetics;
    }
    public get propellant(): number {
        return this._propellant;
    }
    public withCarbon(carbon: number): ResourceAmount {
        assert(carbon >= 0);
        if (carbon != this._carbon) {
            return new ResourceAmount(carbon, this._metal, this._silicon, this.synthetics, this._propellant);
        } else {
            return this;
        }
    }
    public withMetal(metal: number): ResourceAmount {
        assert(metal >= 0);
        if (metal != this._metal) {
            return new ResourceAmount(this._carbon, metal, this._silicon, this.synthetics, this._propellant);
        } else {
            return this;
        }
    }
    public withSilicon(silicon: number): ResourceAmount {
        assert(silicon >= 0);
        if (silicon != this._silicon) {
            return new ResourceAmount(this._carbon, this._metal, silicon, this.synthetics, this._propellant);
        } else {
            return this;
        }
    }
    public withSynthetics(synthetics: number): ResourceAmount {
        assert(synthetics >= 0);
        if (synthetics != this._synthetics) {
            return new ResourceAmount(this._carbon, this._metal, this._silicon, synthetics, this._propellant);
        } else {
            return this;
        }
    }
    public withPropellant(propellant: number): ResourceAmount {
        assert(propellant >= 0);
        if (propellant != this._propellant) {
            return new ResourceAmount(this._carbon, this._metal, this._silicon, this.synthetics, propellant);
        } else {
            return this;
        }
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this)
            .omnitNullValues()
            .add('carbon', this.carbon)
            .add('metal', this.metal)
            .add('silicon', this.silicon)
            .add('synthetics', this.synthetics)
            .add('propellant', this.propellant);
    }

    public toString(): string {
        return this.toStringHelper().toString();
    }
}

export const NOTHING: ResourceAmount = new ResourceAmount(0, 0, 0, 0, 0);
