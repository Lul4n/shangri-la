import assert = require("assert");

export function randomInt(min: number, max: number): number {
    assert(min <= max);
    let minInt: number = Math.ceil(min);
    let maxInt: number = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

export function randomBoolean(): boolean {
    return Math.random() >= 0.5;
}