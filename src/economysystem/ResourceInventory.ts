import { ImmutableResourceAmount } from './ImmutableResourceAmount';
import { ResourceAmount } from './ResourceAmount';
import assert = require("assert");

export class ResourceInventory implements ResourceAmount{
    private _carbon : bigint = 0n;
    private _metal : bigint = 0n;
    private _silicon : bigint = 0n;
    private _synthetics : bigint = 0n;
    private _propellant : bigint = 0n;

    public isNothing():boolean{
        return this._carbon === 0n &&
            this._metal === 0n &&
            this._silicon === 0n &&
            this._synthetics === 0n &&
            this._propellant === 0n;
    }
    public set carbon(carbon : bigint){
        assert(carbon >= 0n);
        this._carbon = carbon;
    }
    public get carbon() : bigint{
        return this._carbon;
    }
    public addCarbon(carbon : bigint){
        assert(carbon >= 0n);
         this._carbon += carbon;
    }
    public get metal() : bigint{
        return this._metal;
    }
    public set metal(metal : bigint){
        assert(metal >= 0n);
        this._metal = metal;
    }
    public addMetal(metal : bigint){
        assert(metal >= 0n);
        this._metal += metal;
    }
    public get silicon() : bigint{
        return this._silicon;
    }
    public set silicon(silicon : bigint){
        assert(silicon >= 0n);
        this._silicon = silicon;
    }
    public addSilicon(silicon : bigint){
        assert(silicon >= 0n);
        this._silicon += silicon;
    }
    public get synthetics() : bigint{
        return this._synthetics;
    }
    public set synthetics(synthetics : bigint){
        assert(synthetics >= 0n);
        this._synthetics = synthetics;
    }
    public addSynthetics(synthetics : bigint){
        assert(synthetics >= 0n);
        this._synthetics += synthetics;
    }
    public get propellant() : bigint{
        return this._propellant;
    }
    public set propellant(propellant : bigint) {
        assert(propellant >= 0n);
        this._propellant = propellant;
    }
    public addPropellant(propellant : bigint) {
        assert(propellant >= 0n);
        this._propellant += propellant;
    }

    public add(amount : ResourceAmount){
        this._carbon += amount.carbon;
        this._metal += amount.metal;
        this._silicon += amount.silicon;
        this._synthetics += amount.synthetics;
        this._propellant += amount.propellant;
    }
    public subtract(amount : ResourceAmount) : boolean{
        if(this._carbon >= amount.carbon &&
            this._metal >= amount.metal &&
            this._silicon >= amount.silicon &&
            this._synthetics >= amount.synthetics &&
            this._propellant >= amount.propellant
        ){
            this._carbon -= amount.carbon;
            this._metal -= amount.metal;
            this._silicon -= amount.silicon;
            this._synthetics -= amount.synthetics;
            this._propellant -= amount.propellant;
            return true;
        }else{
            return false;
        }
    }

    public toResourceAmount(): ResourceAmount{
        return new ImmutableResourceAmount(this._carbon, this._metal, this._silicon, this._synthetics, this._propellant);
    }

    public toString(): string{        
        return `{carbon:${this._carbon},metal:${this._metal},silicon:${this._silicon},synthetics:${this._synthetics},propellant:${this._propellant}}`
    }
}