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

export class SeriesLabel extends Label {
    private _index: number;

    constructor(index: number, seriesSpace: number, seriesWidth: number, size: number, color: Color, text: string) {
        super(seriesSpace, seriesWidth, size, color, text);

        this._index = index;
    }

    public draw(): Mesh {
        const textGeometry = new TextGeometry(this.text, {
            font: new Font(),
            size: this.size,
            height: .2
        });
        
        const textMaterial = new MeshBasicMaterial({
            color: this.color
        });

        const textMesh = new Mesh(textGeometry, textMaterial);

        textMesh.rotation.x = (Math.PI/2)*-1;

        const textBoxArea = new Box3().setFromObject(textMesh);
        const textDims = GeometryUtils.getBoxSize(textBoxArea);

        textMesh.position.x = 3;
        textMesh.position.z = ((this._index*this.space) + (this._index*this.width) + (this.width/2) + (textDims.z/2));

        return textMesh;
    }
}