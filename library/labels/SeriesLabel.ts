import { 
    TextGeometry,
    MeshBasicMaterial,
    Mesh,
    Box3
} from 'three';

import { Label } from './Label';

export class SeriesLabel extends Label {
    private _row;

    constructor(row, rowSpace, rowWidth, size, color, text) {
        super(rowSpace, rowWidth, size, color, text);

        this._row = row;
    }

    public draw(): Mesh {
        var textGeometry = new TextGeometry(this.text, {
            size: this.size,
            height: .2
        });
        
        var textMaterial = new MeshBasicMaterial({
            color: this.color
        });

        const textMesh = new Mesh(textGeometry, textMaterial);

        textMesh.rotation.x = (Math.PI/2)*-1;

        var textBoxArea = new Box3().setFromObject(textMesh);

        textMesh.position.x = 3;
        textMesh.position.z = ((this._row*this.space) + (this._row*this.width) + (this.width/2) + (textBoxArea.size().z/2));

        return textMesh;
    }
}