export class ToStringHelper {
    private static normalizeValue(value: unknown): string {
        if ((typeof value === 'string' || value instanceof String) && value.length === 0) {
            return '';
        } else if (value === null || value === undefined) {
            return 'null';
        } else if (Array.isArray(value)) {
            return `[${value}]`;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            return `${value}`;
        }
    }
    public static toStringHelper(source?: unknown): ToStringHelper {
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
    private _values: unknown[] = [];
    private _properties: Record<string, unknown> = {};
    private _omnitNullValues: boolean = false;
    private _omnitFalsishValues: boolean = false;

    private constructor(name: string, omnitNullValues: boolean = false, omnitFalsishValues: boolean = false) {
        this._name = name;
        this._omnitNullValues = omnitNullValues;
        this._omnitFalsishValues = omnitFalsishValues;
    }

    public reset(): this {
        this._values = [];
        this._properties = {};
        return this;
    }

    public omnitNullValues(omnitNullValues: boolean = true): this {
        this._omnitNullValues = omnitNullValues;
        return this;
    }
    public omnitFalsishValues(omnitFalsishValues: boolean = true): this {
        this._omnitFalsishValues = omnitFalsishValues;
        return this;
    }

    public value(value: unknown): this {
        this._values.push(value);
        return this;
    }
    public add(key: string, value: unknown): this {
        this._properties[key] = value;
        return this;
    }

    public toString(): string {
        let result = this._name + '{';
        let relevantValues: unknown[];
        if (this._omnitNullValues || this._omnitFalsishValues) {
            relevantValues = [];
            this._values
                .filter((value) => !this._omnitNullValues || value !== null)
                .filter((value) => !this._omnitFalsishValues || !!value)
                .forEach((value) => relevantValues.push(value));
        } else {
            relevantValues = this._values;
        }
        const keys = [];
        for (const key in this._properties) {
            const value = this._properties[key];
            if ((!this._omnitNullValues || value !== null) && (!this._omnitFalsishValues || !!value)) {
                keys.push(key);
            }
        }
        for (let i = 0; i < keys.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const key = keys[i]!;
            const value = this._properties[key];
            result += key + ':' + ToStringHelper.normalizeValue(value);
            if (i < keys.length - 1 || relevantValues.length > 0) {
                result += ',';
            }
        }
        for (let i = 0; i < relevantValues.length; i++) {
            const value = relevantValues[i];
            result += ToStringHelper.normalizeValue(value);
            if (i < relevantValues.length - 1) {
                result += ',';
            }
        }
        result += '}';
        return result;
    }
}
