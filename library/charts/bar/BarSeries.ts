import { 
    Object3D
} from 'three';

export class BarSeries {
    constructor(row, dataRow, columnSpace, width) {
        this._id = dataRow.id.toString();

        this._row = row;

        this._bars = [];

        this._barWidth = width;

        this._columnSpace = columnSpace;

        this._barLabels = dataRow.showBarLabels;
    }

// ----- Getters

    public get row() {
        return this._row;
    };

    public get minX() {
        return 0;
    };

    public get maxX() {
        return 0;
    };

    public get minY() {
        var min = null;

        for (var i=0; i<this._bars.length; i++) {
            var dataValue = this._bars[i].getDataValue();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY() {
        var max = null;

        for (var i=0; i<this._bars.length; i++) {
            var dataValue = this._bars[i].getDataValue();

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
        var totalWidth = 0;

        for (var i=0; i<this._bars.length; i++) {
            totalWidth += this._barWidth;

            if (i != (this._bars.length-1)) totalWidth += this._columnSpace;
        }

        return totalWidth;
    };

    public get length() {
        var maxLength = 0;

        for (var i=0; i<this._bars.length; i++) {
            var barWidth = this._barWidth;

            if (barWidth > maxLength) maxLength = barWidth;
        }

        return maxLength;
    };

    public get height() {
        var maxHeight = 0;

        for (var i=0; i<this._bars.length; i++) {
            var height = this._bars[i].getHeight();

            if (height > maxHeight) maxHeight = height;
        }

        return maxHeight;
    };

// ----- Public Methods

    public addBar(bar) {
        this._bars.push(bar);
    }

    public draw(graphMinX, graphMinY, graphMinZ) {
        var barObjects = new Object3D();

        for (var i=0; i<this._bars.length; i++) {
            barObjects.add(this._bars[i].draw(graphMinY, this._barWidth));
        }

        return barObjects;
    }
}