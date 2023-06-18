import { 
    Face3,
    Vector3,
    Geometry,
    Line,
    LineBasicMaterial,
    TextGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Box3,
    Object3D,
    DoubleSide
} from 'three';

export class Bar {
    private _column;
    private _barWidth;
    private _color;
    private _opacity;
    private _dataValue;
    private _columnSpace;
    private _showLabels;
    private _labelSize;
    private _labelColor;

    private _height: number;

    private _barObject: Object3D = null;

    constructor(column, barWidth, dataValue, columnSpace, color, opacity, showLabels, labelSize, labelColor) {
        this._column = column;
        this._barWidth = barWidth;
        this._color = color;
        this._opacity = opacity;
        this._dataValue = dataValue;
        this._columnSpace = columnSpace;
        this._showLabels = showLabels;
        this._labelSize = labelSize;
        this._labelColor = labelColor;
    }

    // ----- Getters

    public getDataValue() {
        return this._dataValue;
    };

    public getHeight() {
        return this._height;
    };

    public getBarWidth() {
        return this._barWidth;
    };

    public getBarObject() {
        return this._barObject;
    }

    // ----- Public Methods

    public draw(graphMinY, barWidth) {
        this._barObject = new Object3D();

        // Calculate the bar geometry
        const xPos = ((this._column*this._columnSpace) + (this._column*barWidth)) + (barWidth/2);

        this._height = (this._dataValue-graphMinY);

        var barGeometry = new Geometry();
        barGeometry.dynamic = true;

        // Plot the verticies
        barGeometry.vertices = this.getBarVertices(xPos, 0, this._height, barWidth);

        // Add the faces
        barGeometry.faces.push( new Face3( 0, 1, 4 ) );
        barGeometry.faces.push( new Face3( 4, 5, 1 ) );

        barGeometry.faces.push( new Face3( 3, 2, 7 ) );
        barGeometry.faces.push( new Face3( 7, 6, 2 ) );

        barGeometry.faces.push( new Face3( 1, 3, 5 ) );
        barGeometry.faces.push( new Face3( 5, 7, 3 ) );

        barGeometry.faces.push( new Face3( 0, 2, 4 ) );
        barGeometry.faces.push( new Face3( 4, 6, 2 ) );

        barGeometry.faces.push( new Face3( 4, 5, 7 ) );
        barGeometry.faces.push( new Face3( 6, 7, 4 ) );

        barGeometry.faces.push( new Face3( 0, 1, 3 ) );
        barGeometry.faces.push( new Face3( 0, 2, 3 ) );

        barGeometry.computeFaceNormals();

        var barMesh = new Mesh(barGeometry, new MeshLambertMaterial({
            color: this._color, 
            side: DoubleSide,
            transparent: true,
            opacity: this._opacity
        }));
        barMesh.name = "bar";

        this._barObject.add(barMesh);

        var barOutline = new Object3D();
        barOutline.name = "outline";

        // Generate the outlines

        barOutline.add(this.getOutlineMesh("front", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("back", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("left", xPos, 0, this._height, barWidth, this._color));
        barOutline.add(this.getOutlineMesh("right", xPos, 0, this._height, barWidth, this._color));

        this._barObject.add(barOutline);

        if (this._showLabels) {
            var valueGeometry = new TextGeometry(this._dataValue, {
                size: this._labelSize,
                height: .2
            });
            
            var valueMesh = new Mesh(valueGeometry, new MeshBasicMaterial({
                color: this._labelColor
            }));

            var valueArea = new Box3().setFromObject(valueMesh);

            valueMesh.position.x = xPos-(valueArea.size().x/2);
            valueMesh.position.y = this._height + 2;
            valueMesh.position.z = 0;

            this._barObject.add(valueMesh);
        }

        return this._barObject;
    }

    // ----- Private Methods

    private getBarVertices(xPos, zPos, height, width): Array<Vector3> {
        var vertices = new Array<Vector3>();

        vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
        vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));

        vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
        vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));

        vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
        vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));

        vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
        vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));

        return vertices;
    }

    private getLineGeometry(type, xPos, zPos, height, width): Array<Vector3> {
        var vertices = new Array<Vector3>();

        switch(type) {
            case "front":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));
                break;
            case "back":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
                break;
            case "left":
                vertices.push(new Vector3(xPos+(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos+(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos+(width/2), 0, zPos-(width/2)));
                break;
            case "right":
                vertices.push(new Vector3(xPos-(width/2), 0, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos+(width/2)));
                vertices.push(new Vector3(xPos-(width/2), height, zPos-(width/2)));
                vertices.push(new Vector3(xPos-(width/2), 0, zPos-(width/2)));
                break;
        }

        return vertices;
    };

    private getOutlineMesh(type, xPos, zPos, height, width, color) {
        var outlineGeometry = new Geometry();
        outlineGeometry.vertices = this.getLineGeometry(type, xPos, zPos, height, width);

        var outline = new Line(outlineGeometry, new LineBasicMaterial({
            color: color
        }));

        outline.name = type;

        return outline;
    };
}