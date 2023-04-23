import { ResourceAmount } from './ResourceAmount';
import assert = require('assert');

export class ResourceInventory {
    private _carbon: number = 0;
    private _metal: number = 0;
    private _silicon: number = 0;
    private _synthetics: number = 0;
    private _propellant: number = 0;

    public isNothing(): boolean {
        return this._carbon === 0 && this._metal === 0 && this._silicon === 0 && this._synthetics === 0 && this._propellant === 0;
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
        this._carbon += carbon;
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
        this._metal += metal;
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
        this._silicon += silicon;
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
        this._synthetics += synthetics;
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
        this._propellant += propellant;
    }

    public add(amount: ResourceAmount) {
        this._carbon += amount.carbon;
        this._metal += amount.metal;
        this._silicon += amount.silicon;
        this._synthetics += amount.synthetics;
        this._propellant += amount.propellant;
    }
    public subtract(amount: ResourceAmount): boolean {
        if (this._carbon >= amount.carbon && this._metal >= amount.metal && this._silicon >= amount.silicon && this._synthetics >= amount.synthetics && this._propellant >= amount.propellant) {
            this._carbon -= amount.carbon;
            this._metal -= amount.metal;
            this._silicon -= amount.silicon;
            this._synthetics -= amount.synthetics;
            this._propellant -= amount.propellant;
            return true;
        } else {
            return false;
        }
    }

    public toResourceAmount(): ResourceAmount {
        return new ResourceAmount(this._carbon, this._metal, this._silicon, this._synthetics, this._propellant);
    }

    public toString(): string {
        return `{carbon:${this._carbon},metal:${this._metal},silicon:${this._silicon},synthetics:${this._synthetics},propellant:${this._propellant}}`;
    }
}
