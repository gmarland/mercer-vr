import { 
    Color 
} from "three";

import { Font } from "three/examples/jsm/loaders/FontLoader";

export class Label {
    private _space: number; 
    private _width: number; 
    private _font: Font; 
    private _size: number; 
    private _color: Color; 
    private _text: string;

    constructor(space: number, 
                width: number,
                font: Font,
                size: number, 
                color: Color, 
                text: string) {
        this._space = space; 
        this._width = width; 
        this._font = font;
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

    public get font(): Font {
        return this._font;
    }

    public get size(): number {
        return this._size;
    }

    public get color(): Color {
        return this._color;
    }

    public get text(): string {
        return this._text;
    }
}