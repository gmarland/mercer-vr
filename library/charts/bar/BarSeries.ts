import { 
    Object3D
} from 'three';
import { Series } from '../Series';
import { Bar } from './Bar';

export class BarSeries extends Series {
    private _bars: Array<Bar>;

    private _barWidth: number;

    private _categorySpace: number;

    private _barLabels: boolean;

    constructor(index: number, dataRow, categorySpace, width) {
        super(index, dataRow);

        this._bars = new Array<Bar>();

        this._barWidth = width;

        this._categorySpace = categorySpace;

        this._barLabels = dataRow.showBarLabels;
    }

// ----- Getters

    public get minX() {
        return 0;
    };

    public get maxX() {
        return 0;
    };

    public get minY() {
        let min = null;

        for (let i=0; i<this._bars.length; i++) {
            const dataValue = this._bars[i].getDataValue();

            if ((min === null) || (dataValue < min)) min = dataValue;
        }

        return min;
    };

    public get maxY() {
        let max = null;

        for (let i=0; i<this._bars.length; i++) {
            const dataValue = this._bars[i].getDataValue();

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
        let totalWidth = 0;

        for (let i=0; i<this._bars.length; i++) {
            totalWidth += this._barWidth;

            if (i != (this._bars.length-1)) totalWidth += this._categorySpace;
        }

        return totalWidth;
    };

    public get length() {
        let maxLength = 0;

        for (let i=0; i<this._bars.length; i++) {
            const barWidth = this._barWidth;

            if (barWidth > maxLength) maxLength = barWidth;
        }

        return maxLength;
    };

    public get height() {
        let maxHeight = 0;

        for (let i=0; i<this._bars.length; i++) {
            const height = this._bars[i].getHeight();

            if (height > maxHeight) maxHeight = height;
        }

        return maxHeight;
    };

// ----- Public Methods

    public addBar(bar) {
        this._bars.push(bar);
    }

    public draw(graphMinX, graphMinY, graphMinZ) {
        const barObjects = new Object3D();

        for (let i=0; i<this._bars.length; i++) {
            barObjects.add(this._bars[i].draw(graphMinY, this._barWidth));
        }

        return barObjects;
    }
}