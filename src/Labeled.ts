
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-base-to-string */
export interface Labeled {
    getLabel(): string | null;
    setLabel(label?: string): void;
    hasLabel(): boolean;
}

type Constructor = new (...args: any[]) => object;
export function Labeled<TBase extends Constructor>(Base: TBase) {
    return class Labeled extends Base implements Labeled {
        private label: string | null = null;

        setLabel(label?: string) {
            this.label = label ? label : null;
        }

        hasLabel(): boolean {
            return this.label ? true : false;
        }

        getLabel(): string | null {
            return this.label;
        }
        toString(): string {
            return super.toString() + `@{label:${this.label}}`
        }
    };
}