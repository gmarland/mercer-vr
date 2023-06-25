import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { LineSeries } from "./LineSeries";
import { LinePoint } from "./LinePoint";

import { SeriesLabel } from '../../labels/SeriesLabel';
import { ILineSeriesData } from './ILineSeriesData';
import { ILineConfig } from './ILineConfig';

export class LineChart extends Chart {
    private _lineWidth: number = 2.5; // the width of the lines on the graph
    private _seriesSpace: number = 30; // the space between each series
    private _seriesLabelSize: number = 4; // the font size for the series label
    private _seriesLabelColor: Color = new Color("#000000"); // the default color for the series label
    private _pointSpace: number = 5; // the space between each category in a series

    constructor(data: Array<ILineSeriesData>, chartConfig?: ILineConfig) {
        super(chartConfig);
        
        // Allow the override using the graphData options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.lineWidth !== undefined) this._lineWidth = chartConfig.lineWidth;
            
            if (chartConfig.seriesSpace !== undefined) this._seriesSpace = chartConfig.seriesSpace;

            if (chartConfig.seriesLabelSize !== undefined) this._seriesLabelSize = chartConfig.seriesLabelSize;

            if (chartConfig.seriesLabelColor !== undefined) this._seriesLabelColor = new Color(chartConfig.seriesLabelColor);

            if (chartConfig.pointSpace !== undefined) this._pointSpace = chartConfig.pointSpace;
        }

        this.buildSeries(data);
    }

    private buildSeries(data: Array<ILineSeriesData>): void {
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color !== undefined) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new LineSeries(i, data[i], color, this._pointSpace, this._lineWidth);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const linePoint = new LinePoint(data[i].values[j].x, data[i].values[j].y);

                    series.addLinePoint(linePoint);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].name) {
                    const seriesLabel = new SeriesLabel(i, this._seriesSpace, this._lineWidth, this.font, this._seriesLabelSize, this._seriesLabelColor, data[i].name);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }
        }
    }
}