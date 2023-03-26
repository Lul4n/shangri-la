import { Simulatable } from "../simulation/Simulatable";
import { Ticks } from "../simulation/Ticks";
import { ResourceInventory } from "./ResourceInventory";
import { Structure } from './Structure';
import { Labeled } from '../Labeled';



export class Planet implements Simulatable{
    
    private readonly structures : Structure[] = [];
    private readonly resources : ResourceInventory;

    constructor(){
        this.resources = new ResourceInventory();
    }

    public build(structure : Structure){
        this.structures.push(structure);
    }

    public update(deltaTime : Ticks){
        this.structures.forEach(structure =>{
            const production = structure.produce(deltaTime);
            this.resources.add(production);
        });
    }
    
    public toString(): string{        
        return `Planet{resources:${this.resources},structures:${this.structures}}`
    }
}

export const LabeledPlanet = Labeled(Planet);