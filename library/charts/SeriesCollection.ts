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
        const min = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minX;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxX() {
        const max = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxX;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get minY() {
        const min = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minY;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxY() {
        const max = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxY;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get minZ() {
        const min = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minZ;

            if ((min === null) || (minValue < min)) min = minValue;
        }

        return min;
    }

    public get maxZ() {
        const max = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxZ;

            if ((max === null) || (maxValue > max)) max = maxValue;
        }

        return max;
    }

    public get width() {
        const maxWidth = 0;

        for (const i=0; i<this._allSeries.length; i++) {
            const seriesWidth = this._allSeries[i].width;

            if (seriesWidth > maxWidth) maxWidth = seriesWidth;
        }

        return maxWidth;
    }

    public get length() {
        if (this._seriesSpace) {
            const totalLength = 0;

            for (const i=0; i<this._allSeries.length; i++) {
                totalLength += this._allSeries[i].length;

                if (i != (this._allSeries.length-1)) totalLength += this._seriesSpace;
            }

            return totalLength;
        }
        else {
            const maxLength = 0;

            for (const i=0; i<this._allSeries.length; i++) {
                const seriesLength = this._allSeries[i].length;

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
        const collectionObjects = new Object3D();

        for (const i=0; i<this._allSeries.length; i++) {
            const series = this._allSeries[i].draw(this.getMinX(), graphMinY, this.getMinZ());

            if (this._seriesSpace) series.position.z += ((this._allSeries[i].getSeries()*this._seriesSpace) + (this._allSeries[i].getSeries()*this._allSeries[i].getLength())) + (this._allSeries[i].getLength()/2);

            collectionObjects.add(series);
        }

        return collectionObjects;
    }

    public drawSeriesLabels() {
        const seriesLabelObjects = new Object3D();

        for (const i=0; i<this._seriesLabels.length; i++) {
            seriesLabelObjects.add(this._seriesLabels[i].draw());
        }

        return seriesLabelObjects;
    }

    public drawColumnLabels() {
        const columnLabelObjects = new Object3D();

        for (const i=0; i<this._columnLabels.length; i++) {
            columnLabelObjects.add(this._columnLabels[i].draw());
        }

        return columnLabelObjects;
    }
}