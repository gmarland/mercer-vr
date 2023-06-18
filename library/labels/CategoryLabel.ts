import { 
    TextGeometry,
    MeshBasicMaterial,
    Mesh,
    Box3
} from 'three';

import { Label } from './Label';

export class CategoryLabel extends Label {
    private _category;

    constructor(category, categorySpace, categoryWidth, size, color, text) {
        super(categorySpace, categoryWidth, size, color, text);

        this._category = category;
    };

    public draw(): void {
        const textGeometry = new TextGeometry(this.text, {
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

        textMesh.position.z = (3 + textBoxArea.size().z);
        textMesh.position.x = ((this._category*this.space) + (this._category*this.width) + (this.width/2) + (textBoxArea.size().x/2));

        return textMesh;
    }
}