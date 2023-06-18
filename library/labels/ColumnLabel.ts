import { 
    TextGeometry,
    MeshBasicMaterial,
    Mesh,
    Box3
} from 'three';

import { Label } from './Label';

export class ColumnLabel extends Label {
    private _column;

    constructor(column, columnSpace, columnWidth, size, color, text) {
        super(columnSpace, columnWidth, size, color, text);

        this._column = column;
    };

    public draw(): void {
        var textGeometry = new TextGeometry(this.text, {
            font: _font,
            size: this.size,
            height: .2
        });

        var textMaterial = new MeshBasicMaterial({
            color: this.color
        });
        
        const textMesh = new Mesh(textGeometry, textMaterial);

        textMesh.rotation.x = (Math.PI/2)*-1;
        textMesh.rotation.z += (Math.PI/2);

        var textBoxArea = new Box3().setFromObject(textMesh);

        textMesh.position.z = (3 + textBoxArea.size().z);
        textMesh.position.x = ((this._column*this.space) + (this._column*this.width) + (this.width/2) + (textBoxArea.size().x/2));

        return textMesh;
    }
}