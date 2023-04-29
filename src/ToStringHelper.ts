export class ToStringHelper {
    public static toStringHelper(source: unknown): ToStringHelper {
        if (!source) {
            return new ToStringHelper('');
        } else if (typeof source === 'object') {
            return new ToStringHelper(source.constructor.name);
        } else if (typeof source === 'function') {
            return new ToStringHelper(source.name);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            return new ToStringHelper(`${source}`);
        }
    }

    private _name: string;
    private _values: (string | null)[] = [];
    private _properties: Record<string, string | null> = {};
    private _omnitNullValues: boolean = false;

    private constructor(name: string, omnitNullValues: boolean = false) {
        this._name = name;
        this._omnitNullValues = omnitNullValues;
    }

    public omnitNullValues(omnitNullValues: boolean = true): this {
        this._omnitNullValues = omnitNullValues;
        return this;
    }

    public value(value: unknown): this {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        this._values.push(value ? `${value}` : null);
        return this;
    }
    public add(key: string, value: unknown): this {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        this._properties[key] = value ? `${value}` : null;
        return this;
    }

    public toString(): string {
        let result = this._name + '{';
        let relevantValues: (string | null)[];
        if (this._omnitNullValues) {
            relevantValues = [];
            this._values.filter((value) => value !== null).forEach((value) => relevantValues.push(value));
        } else {
            relevantValues = this._values;
        }
        const keys = [];
        for (const key in this._properties) {
            const value = this._properties[key];
            if ((value !== undefined && value !== null) || !this._omnitNullValues) {
                keys.push(key);
            }
        }
        for (let i = 0; i < keys.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const key = keys[i]!;
            const value = this._properties[key];
            result += key + ':' + (value ? value : 'null');
            if (i < keys.length - 1 || relevantValues.length > 0) {
                result += ',';
            }
        }
        for (let i = 0; i < relevantValues.length; i++) {
            const value = relevantValues[i];
            result += value ? value : 'null';
            if (i < relevantValues.length - 1) {
                result += ',';
            }
        }
        result += '}';
        return result;
    }
}
