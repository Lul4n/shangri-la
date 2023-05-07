export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface HasUuid {
    get uuid(): UUID;
}
