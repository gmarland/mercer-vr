import { 
    Object3D
} from 'three';

export class ScatterSeries {
    constructor(row, dataRow) {
        this._id = dataRow.id.toString();
        this._row = row;

        this._scatterPoints = [];

        this._color = dataRow.color;
    };

    // ----- Getters

    public get row() {
        return this._row;
    };

    public get minX() {
        var min = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getX();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxX() {
        var max = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getX();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get MinY() {
        var min = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getY();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY() {
        var max = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getY();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get minZ() {
        var min = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getZ();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxZ() {
        var max = null;

        for (var i=0; i<this._scatterPoints.length; i++) {
            var dataValue = this._scatterPoints[i].getZ();

            if ((max === null) || (dataValue > max)) max = dataValue;
        }

        return max;
    };

    public get width() {
        return this.maxX-this.minX;
    };

    public get length() {
        return this.maxZ-this.minZ;
    };

    // ----- Public Methods

    public addScatterPoint(linePoint) {
        this._scatterPoints.push(linePoint);
    }

    public draw(graphMinX, graphMinY, graphMinZ) {    
        var rowObject = new Object3D();

        for (var i=0; i<this._scatterPoints.length; i++) {
            rowObject.add(this._scatterPoints[i].draw(this._color));
        }

        rowObject.position.x -= graphMinX;
        rowObject.position.z -= graphMinZ;

        return rowObject;
    };
}