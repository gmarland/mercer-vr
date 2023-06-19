import { 
    Object3D
} from 'three';
import { Series } from './Series';

import { SeriesLabel } from '../labels/SeriesLabel';
import { CategoryLabel } from '../labels/CategoryLabel';

export class SeriesCollection {
    private _seriesSpace;

    private _allSeries: Array<Series>;

    private _seriesLabels: Array<SeriesLabel>;
    private _categoryLabels: Array<CategoryLabel>;
    
    constructor(seriesSpace) {
        this._seriesSpace = seriesSpace;

        this._allSeries = new Array<Series>();
        
        this._seriesLabels = new Array<SeriesLabel>();
        this._categoryLabels = new Array<CategoryLabel>();
    }

    // ----- Getters

    public get minX() {
        let min = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minX;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxX() {
        let max = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxX;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get minY() {
        let min = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minY;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxY() {
        let max = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxY;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get minZ() {
        let min = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minZ;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxZ() {
        let max = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxZ;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get width() {
        let maxWidth = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const seriesWidth = this._allSeries[i].width;

            if (seriesWidth > maxWidth) maxWidth = seriesWidth;
        }

        return maxWidth;
    }

    public get length() {
        if (this._seriesSpace) {
            let totalLength = 0;

            for (let i=0; i<this._allSeries.length; i++) {
                totalLength += this._allSeries[i].length;

                if (i != (this._allSeries.length-1)) totalLength += this._seriesSpace;
            }

            return totalLength;
        }
        else {
            let maxLength = 0;

            for (let i=0; i<this._allSeries.length; i++) {
                const seriesLength = this._allSeries[i].length;

                if (seriesLength > maxLength) maxLength = seriesLength;
            }

            return maxLength;
        }
    }

    // ----- Public Methods

    public addSeries(series: Series) {
        this._allSeries.push(series);
    }

    public addSeriesLabel(seriesLabel) {
        this._seriesLabels.push(seriesLabel);
    }

    public addCategoryLabel(categoryLabel) {
        this._categoryLabels.push(categoryLabel);
    }

    public drawAllSeries(graphMinY, graphMaxY) {
        const collectionObjects = new Object3D();

        for (let i=0; i<this._allSeries.length; i++) {
            const series = this._allSeries[i].draw(this.minX, graphMinY, this.minZ);

            if (this._seriesSpace) series.position.z += ((this._allSeries[i].index*this._seriesSpace) + (this._allSeries[i].index*this._allSeries[i].length)) + (this._allSeries[i].length/2);

            collectionObjects.add(series);
        }

        return collectionObjects;
    }

    public drawSeriesLabels() {
        const seriesLabelObjects = new Object3D();

        for (let i=0; i<this._seriesLabels.length; i++) {
            seriesLabelObjects.add(this._seriesLabels[i].draw());
        }

        return seriesLabelObjects;
    }

    public drawCategoryLabels() {
        const categoryLabelObjects = new Object3D();

        for (let i=0; i<this._categoryLabels.length; i++) {
            categoryLabelObjects.add(this._categoryLabels[i].draw());
        }

        return categoryLabelObjects;
    }
}