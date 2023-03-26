import { ImmutableResourceAmount } from './ImmutableResourceAmount';
import { ResourceAmount } from './ResourceAmount';
import assert = require("assert");

export class ResourceInventory implements ResourceAmount{
    private carbon : bigint = 0n;
    private metal : bigint = 0n;
    private silicon : bigint = 0n;
    private synthetics : bigint = 0n;
    private propellant : bigint = 0n;

    constructor(){
    }

    public isNothing():boolean{
        return this.carbon === 0n &&
            this.metal === 0n &&
            this.silicon === 0n &&
            this.synthetics === 0n &&
            this.propellant === 0n;
    }
    public getCarbon() : bigint{
        return this.carbon;
    }
    public getMetal() : bigint{
        return this.metal;
    }
    public getSilicon() : bigint{
        return this.silicon;
    }
    public getSynthetics() : bigint{
        return this.synthetics;
    }
    public getPropellant() : bigint{
        return this.propellant;
    }
    
    public setCarbon(carbon : bigint){
        assert(carbon >= 0n);
        this.carbon = carbon;
    }
    public setMetal(metal : bigint){
        assert(metal >= 0n);
        this.metal = metal;
    }
    public setSilicon(silicon : bigint){
        assert(silicon >= 0n);
        this.silicon = silicon;
    }
    public setSynthetics(synthetics : bigint){
        assert(synthetics >= 0n);
        this.synthetics = synthetics;
    }
    public setPropellant(propellant : bigint) {
        assert(propellant >= 0n);
        this.propellant = propellant;
    }
    
    public addCarbon(carbon : bigint){
        assert(carbon >= 0n);
         this.carbon += carbon;
    }
    public addMetal(metal : bigint){
        assert(metal >= 0n);
        this.metal += metal;
    }
    public addSilicon(silicon : bigint){
        assert(silicon >= 0n);
        this.silicon += silicon;
    }
    public addSynthetics(synthetics : bigint){
        assert(synthetics >= 0n);
        this.synthetics += synthetics;
    }
    public addPropellant(propellant : bigint) {
        assert(propellant >= 0n);
        this.propellant += propellant;
    }

    public add(amount : ResourceAmount){
        this.carbon += amount.getCarbon();
        this.metal += amount.getMetal();
        this.silicon += amount.getSilicon();
        this.synthetics += amount.getSynthetics();
        this.propellant += amount.getPropellant();
    }
    public subtract(amount : ResourceAmount) : boolean{
        if(this.carbon >= amount.getCarbon() &&
            this.metal >= amount.getMetal() &&
            this.silicon >= amount.getSilicon() &&
            this.synthetics >= amount.getSynthetics() &&
            this.propellant >= amount.getPropellant()
        ){
            this.carbon -= amount.getCarbon();
            this.metal -= amount.getMetal();
            this.silicon -= amount.getSilicon();
            this.synthetics -= amount.getSynthetics();
            this.propellant -= amount.getPropellant();
            return true;
        }else{
            return false;
        }
    }

    public toResourceAmount(): ResourceAmount{
        return new ImmutableResourceAmount(this.carbon, this.metal, this.silicon, this.synthetics, this.propellant);
    }

    public toString(): string{        
        return `{carbon:${this.carbon},metal:${this.metal},silicon:${this.silicon},synthetics:${this.synthetics},propellant:${this.propellant}}`
    }
}