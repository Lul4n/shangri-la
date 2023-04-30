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

    public clear() {
        this.carbon = 0;
        this.metal = 0;
        this.silicon = 0;
        this.synthetics = 0;
        this.propellant = 0;
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
    public addCarbon(carbon: number) {
        assert(carbon >= 0);
        this.carbon += carbon;
    }
    public get metal(): number {
        return this._metal;
    }
    public set metal(metal: number) {
        assert(metal >= 0);
        this._metal = metal;
    }
    public addMetal(metal: number) {
        assert(metal >= 0);
        this.metal += metal;
    }
    public get silicon(): number {
        return this._silicon;
    }
    public set silicon(silicon: number) {
        assert(silicon >= 0);
        this._silicon = silicon;
    }
    public addSilicon(silicon: number) {
        assert(silicon >= 0);
        this.silicon += silicon;
    }
    public get synthetics(): number {
        return this._synthetics;
    }
    public set synthetics(synthetics: number) {
        assert(synthetics >= 0);
        this._synthetics = synthetics;
    }
    public addSynthetics(synthetics: number) {
        assert(synthetics >= 0);
        this.synthetics += synthetics;
    }
    public get propellant(): number {
        return this._propellant;
    }
    public set propellant(propellant: number) {
        assert(propellant >= 0);
        this._propellant = propellant;
    }
    public addPropellant(propellant: number) {
        assert(propellant >= 0);
        this.propellant += propellant;
    }

    public add(amount: ResourceAmount) {
        this.carbon += amount.carbon;
        this.metal += amount.metal;
        this.silicon += amount.silicon;
        this.synthetics += amount.synthetics;
        this.propellant += amount.propellant;
    }
    public subtract(amount: ResourceAmount): boolean {
        if (this.carbon >= amount.carbon && this.metal >= amount.metal && this.silicon >= amount.silicon && this.synthetics >= amount.synthetics && this.propellant >= amount.propellant) {
            this.carbon -= amount.carbon;
            this.metal -= amount.metal;
            this.silicon -= amount.silicon;
            this.synthetics -= amount.synthetics;
            this.propellant -= amount.propellant;
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
