import { 
    Object3D
} from 'three';

export class SeriesCollection {
    private _seriesSpace;

    private _allSeries = [];
    private _seriesLabels = [];
    private _columnLabels = [];
    
    constructor(seriesSpace) {``
        this._seriesSpace = seriesSpace;
    }

    // ----- Getters

    public get minX() {
        var min = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var minValue = this._allSeries[i].minX;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxX() {
        var max = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var maxValue = this._allSeries[i].maxX;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get minY() {
        var min = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var minValue = this._allSeries[i].minY;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxY() {
        var max = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var maxValue = this._allSeries[i].maxY;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get minZ() {
        var min = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var minValue = this._allSeries[i].minZ;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxZ() {
        var max = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var maxValue = this._allSeries[i].maxZ;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get width() {
        var maxWidth = 0;

        for (var i=0; i<this._allSeries.length; i++) {
            var seriesWidth = this._allSeries[i].width;

            if (seriesWidth > maxWidth) maxWidth = seriesWidth;
        }

        return maxWidth;
    }

    public get length() {
        if (this._seriesSpace) {
            var totalLength = 0;

            for (var i=0; i<this._allSeries.length; i++) {
                totalLength += this._allSeries[i].length;

                if (i != (this._allSeries.length-1)) totalLength += this._seriesSpace;
            }

            return totalLength;
        }
        else {
            var maxLength = 0;

            for (var i=0; i<this._allSeries.length; i++) {
                var seriesLength = this._allSeries[i].length;

                if (seriesLength > maxLength) maxLength = seriesLength;
            }

            return maxLength;
        }
    }

    // ----- Public Methods

    public addSeries(series) {
        this._allSeries.push(series);
    }

    public addSeriesLabel(seriesLabel) {
        this._seriesLabels.push(seriesLabel);
    }

    public addColumnLabel(columnLabel) {
        this._columnLabels.push(columnLabel);
    }

    public drawAllSeries(graphMinY, graphMaxY) {
        var collectionObjects = new Object3D();

        for (var i=0; i<this._allSeries.length; i++) {
            var series = this._allSeries[i].draw(this.getMinX(), graphMinY, this.getMinZ());

            if (this._seriesSpace) series.position.z += ((this._allSeries[i].getSeries()*this._seriesSpace) + (this._allSeries[i].getSeries()*this._allSeries[i].getLength())) + (this._allSeries[i].getLength()/2);

            collectionObjects.add(series);
        }

        return collectionObjects;
    }

    public drawSeriesLabels() {
        var seriesLabelObjects = new Object3D();

        for (var i=0; i<this._seriesLabels.length; i++) {
            seriesLabelObjects.add(this._seriesLabels[i].draw());
        }

        return seriesLabelObjects;
    }

    public drawColumnLabels() {
        var columnLabelObjects = new Object3D();

        for (var i=0; i<this._columnLabels.length; i++) {
            columnLabelObjects.add(this._columnLabels[i].draw());
        }

        return columnLabelObjects;
    }
}