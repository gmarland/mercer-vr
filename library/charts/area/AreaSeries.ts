import { 
    Object3D,
    Geometry,
    LineBasicMaterial,
    MeshLambertMaterial,
    Face3,
    Vector3,
    Mesh,
    Line
} from 'three';

export class AreaSeries {
    constructor(row, dataRow, pointSpace, width) {
        this._id = dataRow.id.toString();
        this._row = row;

        this._areaPoints = [];

        this._pointSpace = pointSpace;
        this._color = dataRow.color;
        this._areaWidth = width;
    };

    // ----- Getters

    public get row() {
        return this._row;
    };

    public get minX() {
        var min = null;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].getX();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxX() {
        var max = null;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].getX();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minY() {
        var min = null;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].getY();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY() {
        var max = null;

        for (var i=0; i<this._areaPoints.length; i++) {
            var dataValue = this._areaPoints[i].getY();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minZ() {
        return 0;
    };

    public get maxZ() {
        return 0;
    };

    public get width() {
        return this.maxX-this.minX;
    };

    public get length() {
        return this._areaWidth;
    };

    // ----- Public Methods

    public addAreaPoint(areaPoint) {
        this._areaPoints.push(areaPoint);
    }

    public draw(graphMinX, graphMinY, graphMinZ) {    
        var areaObject = new Object3D();

        var frontVertices = [],
            backVertices = [];

        var areaGeometry = new Geometry();

        // create the front verticies

        for (var i=0; i<this._areaPoints.length; i++) {
            frontVertices.push(new Vector3(this._areaPoints[i].getX(), 0, (this._areaWidth/2)));
            frontVertices.push(new Vector3(this._areaPoints[i].getX(), this._areaPoints[i].getY()-graphMinY, (this._areaWidth/2)));
            backVertices.push(new Vector3(this._areaPoints[i].getX(), 0, (this._areaWidth/2)*-1));
            backVertices.push(new Vector3(this._areaPoints[i].getX(), this._areaPoints[i].getY()-graphMinY, (this._areaWidth/2)*-1));
        }

        for (var i=0; i<frontVertices.length; i++) {
            areaGeometry.vertices.push(frontVertices[i]);
        }

        for (var i=0; i<backVertices.length; i++) {
            areaGeometry.vertices.push(backVertices[i]);
        }

        // Add the front face
        for (var i=0; i<frontVertices.length-2; i+=2) {
            areaGeometry.faces.push( new Face3( i, (i+1), (i+3) ) );
            areaGeometry.faces.push( new Face3( i, (i+2), (i+3) ) );
        }

        // Add the back face
        for (var i=frontVertices.length; i<(frontVertices.length+backVertices.length)-2; i+=2) {
            areaGeometry.faces.push( new Face3( i, (i+1), (i+3) ) );
            areaGeometry.faces.push( new Face3( i, (i+2), (i+3) ) );
        }
            
        // add the opening face
        areaGeometry.faces.push( new Face3( 0, (frontVertices.length), (frontVertices.length+1) ) );
        areaGeometry.faces.push( new Face3( 0, 1, (frontVertices.length+1) ) );

        // Add the joining face
        for (var i=0; i<frontVertices.length-2; i+=2) {
            areaGeometry.faces.push( new Face3( (i+1), (i+3), (i+(frontVertices.length+3)) ) );
            areaGeometry.faces.push( new Face3( (i+1), (i+(frontVertices.length+1)), (i+(frontVertices.length+3)) ) );
        }

        // add the end face
        areaGeometry.faces.push( new Face3( (frontVertices.length-2), (frontVertices.length-1), (frontVertices.length+backVertices.length-2) ) );
        areaGeometry.faces.push( new Face3( (frontVertices.length-1), (frontVertices.length+backVertices.length-1), (frontVertices.length+backVertices.length-2) ) );

        areaGeometry.computeFaceNormals();

        var areaMesh = new Mesh(areaGeometry, new MeshLambertMaterial({
            color: this._color, 
            side: DoubleSide,
            transparent: true,
            opacity: 0.65
        }));

        areaObject.add(areaMesh);

        // Generate the outline
        var areaLineGeometry = new Geometry();
        for (var i=0; i<this._areaPoints.length; i++) {
            areaLineGeometry.vertices.push(new Vector3(this._areaPoints[i].getX(), this._areaPoints[i].getY()-graphMinY, (this._areaWidth/2)));
        }

        var areaLine = new Line(areaLineGeometry, new LineBasicMaterial({
            color: this._color
        }));

        areaObject.add(areaLine);

        areaObject.position.x -= graphMinX;

        return areaObject;
    };
}