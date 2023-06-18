export class Label {
    private _space: number; 
    private _width: number; 
    private _size: number; 
    private _color; 
    private _text;

    constructor(space, width, size, color, text) {
        this._space = space; 
        this._width = width; 
        this._size = size; 
        this._color = color; 
        this._text = text;
    }

    public get space(): number {
        return this._space;
    }
    
    public get width(): number {
        return this._width;
    }

    public get size(): number {
        return this._size;
    }

    public get color() {
        return this._color;
    }

    public get text() {
        return this._text;
    }
}