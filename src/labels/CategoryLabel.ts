import { 
    MeshBasicMaterial,
    Mesh,
    Box3,
    Color
} from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { Label } from './Label';
import { GeometryUtils } from '../utils/GeometryUtils';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

export class CategoryLabel extends Label {
    private _index: number;

    constructor(index: number, 
                categorySpace: number, 
                categoryWidth: number, 
                font: Font,
                size: number, 
                color: Color, 
                text: string) {
        super(categorySpace, categoryWidth, font, size, color, text);

        this._index = index;
    };

    public draw(): Mesh {
        const textGeometry = new TextGeometry(this.text, {
            font: this.font,
            size: this.size,
            height: .2
        });

        const textMaterial = new MeshBasicMaterial({
            color: this.color
        });
        
        const textMesh = new Mesh(textGeometry, textMaterial);

        textMesh.rotation.x = (Math.PI/2)*-1;
        textMesh.rotation.z += (Math.PI/2);

        const textBoxArea = new Box3().setFromObject(textMesh);
        const textDims = GeometryUtils.getBoxSize(textBoxArea);

        textMesh.position.z = (3 + textDims.z);
        textMesh.position.x = ((this._index*this.space) + (this._index*this.width) + (this.width/2) + (textDims.x/2));

        return textMesh;
    }
}