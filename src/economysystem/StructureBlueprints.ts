import { UUID } from '../HasUuid';
import { ResourceAmount } from './ResourceAmount';
import { StructureBlueprint } from './StructureBlueprint';

export const UUID_COAL_MINE: UUID = '9883db39-7a5b-41b6-bd63-4a85bf23bba6';
export const UUID_STEEL_WORKS: UUID = 'd35b95ad-eab2-44c9-9cca-3017be334eb1';
export const UUID_ARC_FURNACE: UUID = '62b87a5a-0588-4a75-a274-e86fc84db4a3';
export const UUID_REFINERY: UUID = 'dd0f6a75-7a6f-4399-a7ef-0907952873b2';

export const PRODUCTION_COAL_MINE: ResourceAmount = ResourceAmount.carbon(100);
export const PRODUCTION_STEEL_WORKS: ResourceAmount = ResourceAmount.metal(100);
export const PRODUCTION_ARC_FURNACE: ResourceAmount = ResourceAmount.silicon(80);
export const PRODUCTION_REFINERY: ResourceAmount = ResourceAmount.synthetics(80).withPropellant(20);

export const BLUEPRINT_COAL_MINE: StructureBlueprint = new StructureBlueprint(UUID_COAL_MINE, PRODUCTION_COAL_MINE, 'Kohlemine');
export const BLUEPRINT_STEEL_WORKS: StructureBlueprint = new StructureBlueprint(UUID_STEEL_WORKS, PRODUCTION_STEEL_WORKS, 'Stahlwerk');
export const BLUEPRINT_ARC_FURNACE: StructureBlueprint = new StructureBlueprint(UUID_ARC_FURNACE, PRODUCTION_ARC_FURNACE, 'Lichtbogenofen');
export const BLUEPRINT_REFINERY: StructureBlueprint = new StructureBlueprint(UUID_REFINERY, PRODUCTION_REFINERY, 'Raffenerie');

export const ALL_BLUEPRINTS = [BLUEPRINT_COAL_MINE, BLUEPRINT_STEEL_WORKS, BLUEPRINT_ARC_FURNACE, BLUEPRINT_REFINERY];
