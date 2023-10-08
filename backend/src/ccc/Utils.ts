import assert = require('assert');
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { UUID } from './UUID';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export function randomUUID(): UUID {
    return uuidv4() as UUID;
}
export function parseUUID(uuid: string): UUID | null {
    if (uuidValidate(uuid)) {
        return uuid as UUID;
    } else {
        return null;
    }
}

export function randomInt(min: number, max: number): number {
    assert(min <= max);
    const minInt: number = Math.ceil(min);
    const maxInt: number = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

export function randomBoolean(): boolean {
    return Math.random() >= 0.5;
}
