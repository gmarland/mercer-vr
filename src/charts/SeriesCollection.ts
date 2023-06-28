import { 
    Object3D
} from 'three';

import { Series } from './Series';

import { SeriesLabel } from '../labels/SeriesLabel';
import { CategoryLabel } from '../labels/CategoryLabel';

export class SeriesCollection {
    private _allSeries: Array<Series>;

    private _seriesLabels: Array<SeriesLabel>;
    private _categoryLabels: Array<CategoryLabel>;
    
    constructor() {
        this._allSeries = new Array<Series>();
        
        this._seriesLabels = new Array<SeriesLabel>();
        this._categoryLabels = new Array<CategoryLabel>();
    }

    // ----- Getters

    public get allSeries(): Array<Series> {
        return this._allSeries;
    }

    public get minX(): number {
        let min = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minX;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxX(): number {
        let max = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxX;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get minY(): number {
        let min = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minY;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxY(): number {
        let max = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxY;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get minZ(): number {
        let min = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const minValue = this._allSeries[i].minZ;

            if (minValue && ((min === null) || (minValue < min))) min = minValue;
        }

        return min;
    }

    public get maxZ(): number {
        let max = null;

        for (let i=0; i<this._allSeries.length; i++) {
            const maxValue = this._allSeries[i].maxZ;

            if (maxValue && ((max === null) || (maxValue > max))) max = maxValue;
        }

        return max;
    }

    public get width(): number {
        let maxWidth = 0;

        for (let i=0; i<this._allSeries.length; i++) {
            const seriesWidth = this._allSeries[i].width;

            if (seriesWidth > maxWidth) maxWidth = seriesWidth;
        }

        return maxWidth;
    }

    // ----- Public Methods

    public addSeries(series: Series): void {
        this._allSeries.push(series);
    }

    public addSeriesLabel(seriesLabel: SeriesLabel): void {
        this._seriesLabels.push(seriesLabel);
    }

    public addCategoryLabel(categoryLabel: CategoryLabel): void {
        this._categoryLabels.push(categoryLabel);
    }

    public drawAllSeries(width: number, height: number): Object3D {
        const minX = this.minX;
        const xScale = (this.maxX-this.minX)/width;

        const minY = this.minY;
        const yScale = (this.maxY-this.minY)/height;

        const minZ = this.minZ;

        const collectionObjects = new Object3D();

        for (let i=0; i<this._allSeries.length; i++) {
            const series = this._allSeries[i].draw(minX, xScale, minY, yScale, minZ, 1);

            collectionObjects.add(series);
        }

        return collectionObjects;
    }

    public drawSeriesLabels(): Object3D {
        const seriesLabelObjects = new Object3D();

        for (let i=0; i<this._seriesLabels.length; i++) {
            seriesLabelObjects.add(this._seriesLabels[i].draw());
        }

        return seriesLabelObjects;
    }

    public drawCategoryLabels(): Object3D {
        const categoryLabelObjects = new Object3D();

        for (let i=0; i<this._categoryLabels.length; i++) {
            categoryLabelObjects.add(this._categoryLabels[i].draw());
        }

        return categoryLabelObjects;
    }
}