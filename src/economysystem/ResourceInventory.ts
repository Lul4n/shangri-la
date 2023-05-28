import { ToStringHelper } from '../ToStringHelper';
import { HasResources } from './HasResources';
import { ResourceAmount } from './ResourceAmount';
import assert = require('assert');

export class ResourceInventory implements HasResources {
    private _carbon: number = 0;
    private _metal: number = 0;
    private _silicon: number = 0;
    private _synthetics: number = 0;
    private _propellant: number = 0;

    public covers(other: HasResources): boolean {
        return this.carbon >= other.carbon && this.metal >= other.metal && this.silicon >= other.silicon && this.synthetics >= other.synthetics && this.propellant >= other.synthetics;
    }

    public clear(): this {
        this.carbon = 0;
        this.metal = 0;
        this.silicon = 0;
        this.synthetics = 0;
        this.propellant = 0;
        return this;
    }
    public isNothing(): boolean {
        return this.carbon === 0 && this.metal === 0 && this.silicon === 0 && this.synthetics === 0 && this.propellant === 0;
    }
    public set carbon(carbon: number) {
        assert(carbon >= 0);
        this._carbon = carbon;
    }
    public get carbon(): number {
        return this._carbon;
    }
    public addCarbon(carbon: number): this {
        assert(carbon >= 0);
        this.carbon += carbon;
        return this;
    }
    public get metal(): number {
        return this._metal;
    }
    public set metal(metal: number) {
        assert(metal >= 0);
        this._metal = metal;
    }
    public addMetal(metal: number): this {
        assert(metal >= 0);
        this.metal += metal;
        return this;
    }
    public get silicon(): number {
        return this._silicon;
    }
    public set silicon(silicon: number) {
        assert(silicon >= 0);
        this._silicon = silicon;
    }
    public addSilicon(silicon: number): this {
        assert(silicon >= 0);
        this.silicon += silicon;
        return this;
    }
    public get synthetics(): number {
        return this._synthetics;
    }
    public set synthetics(synthetics: number) {
        assert(synthetics >= 0);
        this._synthetics = synthetics;
    }
    public addSynthetics(synthetics: number): this {
        assert(synthetics >= 0);
        this.synthetics += synthetics;
        return this;
    }
    public get propellant(): number {
        return this._propellant;
    }
    public set propellant(propellant: number) {
        assert(propellant >= 0);
        this._propellant = propellant;
    }
    public addPropellant(propellant: number): this {
        assert(propellant >= 0);
        this.propellant += propellant;
        return this;
    }

    public add(amount: HasResources): this {
        this.carbon += amount.carbon;
        this.metal += amount.metal;
        this.silicon += amount.silicon;
        this.synthetics += amount.synthetics;
        this.propellant += amount.propellant;
        return this;
    }
    public subtract(amount: HasResources): boolean {
        if (this.covers(amount)) {
            this.carbon -= amount.carbon;
            this.metal -= amount.metal;
            this.silicon -= amount.silicon;
            this.synthetics -= amount.synthetics;
            this.propellant -= amount.propellant;
            assert(this.carbon >= 0);
            assert(this.metal >= 0);
            assert(this.silicon >= 0);
            assert(this.synthetics >= 0);
            assert(this.propellant >= 0);
            return true;
        } else {
            return false;
        }
    }

    public toResourceAmount(): ResourceAmount {
        return new ResourceAmount(this.carbon, this.metal, this.silicon, this.synthetics, this.propellant);
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this)
            .omnitFalsishValues()
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
