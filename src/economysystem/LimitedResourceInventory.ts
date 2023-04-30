import { ResourceInventory } from './ResourceInventory';
import { HasResources } from './HasResources';
import { ResourceAmount } from './ResourceAmount';
import { ToStringHelper } from '../ToStringHelper';
import assert = require('assert');

export class LimitedResourceInventory extends ResourceInventory {
    public static zero(): LimitedResourceInventory {
        return new LimitedResourceInventory(0, 0, 0, 0, 0);
    }
    public static ofCapacity(capacity: number): LimitedResourceInventory {
        return new LimitedResourceInventory(capacity, capacity, capacity, capacity, capacity);
    }

    public static withCapacityFor(source: HasResources): LimitedResourceInventory {
        return new LimitedResourceInventory(source.carbon, source.metal, source.silicon, source.synthetics, source.propellant);
    }

    private _maxCarbon: number = 0;
    private _maxMetal: number = 0;
    private _maxSilicon: number = 0;
    private _maxSynthetics: number = 0;
    private _maxPropellant: number = 0;

    private constructor(maxCarbon: number = 0, maxMetal: number = 0, maxSilicon: number = 0, maxSynthetics: number = 0, maxPropellant: number = 0) {
        super();
        this._maxCarbon = maxCarbon;
        this._maxMetal = maxMetal;
        this._maxSilicon = maxSilicon;
        this._maxSynthetics = maxSynthetics;
        this._maxPropellant = maxPropellant;
    }

    public set capacity(capacity: HasResources) {
        this.maxCarbon = capacity.carbon;
        this.maxMetal = capacity.metal;
        this.maxSilicon = capacity.silicon;
        this.maxSynthetics = capacity.synthetics;
        this.maxPropellant = capacity.propellant;
    }
    public get capacity(): HasResources {
        return new ResourceAmount(this.maxCarbon, this.maxMetal, this.maxSilicon, this.maxSynthetics, this.maxPropellant);
    }

    public get levelCarbon(): number {
        return this.carbon / this.maxCarbon;
    }
    public get levelMetal(): number {
        return this.metal / this.maxMetal;
    }
    public get levelSilicon(): number {
        return this.silicon / this.maxSilicon;
    }
    public get levelSynthetics(): number {
        return this.synthetics / this.maxSynthetics;
    }
    public get levelPropellant(): number {
        return this.propellant / this.maxPropellant;
    }

    public set maxCarbon(carbon: number) {
        assert(carbon >= 0);
        this._maxCarbon = carbon;
    }
    public get maxCarbon(): number {
        return this._maxCarbon;
    }
    public set maxMetal(metal: number) {
        assert(metal >= 0);
        this._maxMetal = metal;
    }
    public get maxMetal(): number {
        return this._maxMetal;
    }
    public set maxSilicon(silicon: number) {
        assert(silicon >= 0);
        this._maxSilicon = silicon;
    }
    public get maxSilicon(): number {
        return this._maxSilicon;
    }
    public set maxSynthetics(synthetics: number) {
        assert(synthetics >= 0);
        this._maxSynthetics = synthetics;
    }
    public get maxSynthetics(): number {
        return this._maxSynthetics;
    }
    public set maxPropellant(propellant: number) {
        assert(propellant >= 0);
        this._maxPropellant = propellant;
    }
    public get maxPropellant(): number {
        return this._maxPropellant;
    }
    public override set carbon(carbon: number) {
        super.carbon = Math.min(this._maxCarbon, carbon);
    }
    public override get carbon(): number {
        super.carbon = Math.min(this._maxCarbon, super.carbon);
        return super.carbon;
    }
    public override set metal(metal: number) {
        super.metal = Math.min(this._maxMetal, metal);
    }
    public override get metal(): number {
        super.metal = Math.min(this._maxMetal, super.metal);
        return super.metal;
    }
    public override set silicon(silicon: number) {
        super.silicon = Math.min(this._maxSilicon, silicon);
    }
    public override get silicon(): number {
        super.silicon = Math.min(this._maxSilicon, super.silicon);
        return super.silicon;
    }
    public override set synthetics(synthetics: number) {
        super.synthetics = Math.min(this._maxSynthetics, synthetics);
    }
    public override get synthetics(): number {
        super.synthetics = Math.min(this._maxSynthetics, super.synthetics);
        return super.synthetics;
    }
    public override set propellant(propellant: number) {
        super.propellant = Math.min(this._maxPropellant, propellant);
    }
    public override get propellant(): number {
        super.propellant = Math.min(this._maxPropellant, super.propellant);
        return super.propellant;
    }

    protected override toStringHelper(): ToStringHelper {
        return super
            .toStringHelper()
            .add('maxCarbon', this.maxCarbon)
            .add('maxMetal', this.maxMetal)
            .add('maxSilicon', this.maxSilicon)
            .add('maxSynthetics', this.maxSynthetics)
            .add('maxPropellant', this.maxPropellant);
    }
}
