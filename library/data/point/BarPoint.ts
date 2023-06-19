export class BarPoint {
    private _name: string;
    private _value: number;

    constructor(name: string, value: number) {
        this._name = name;
        this._value = value;
    }

    public get name(): string {
        return this._name;
    }

    public get value(): number {
        return this._value;
    }
}