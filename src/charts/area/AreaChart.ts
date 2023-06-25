import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { SeriesCollection } from "../SeriesCollection";

import { IAreaChartConfig } from './IAreaChartConfig';
import { IAreaSeriesData } from './IAreaSeriesData';

import { AreaSeries } from "./AreaSeries";
import { AreaPoint } from "./AreaPoint";

import { SeriesLabel } from '../../labels/SeriesLabel';

export class AreaChart extends Chart {
    private _areaWidth: number = 4; // the width of the area graph
    private _seriesSpace: number = 30; // the space between each row
    private _seriesLabelSize: number = 4; // the font size for the row label
    private _seriesLabelColor: Color = new Color("#000000"); // the default color for the row label
    private _pointSpace: number = 5; // the space between each category in a row

    constructor(data: Array<IAreaSeriesData>, chartConfig: IAreaChartConfig) {
        super(chartConfig);

        // Allow the override using the graphData options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.areaWidth !== undefined) this._areaWidth = chartConfig.areaWidth;
            
            if (chartConfig.seriesSpace !== undefined) this._seriesSpace = chartConfig.seriesSpace;

            if (chartConfig.seriesLabelSize !== undefined) this._seriesLabelSize = chartConfig.seriesLabelSize;

            if (chartConfig.seriesLabelColor !== undefined) this._seriesLabelColor = new Color(chartConfig.seriesLabelColor);

            if (chartConfig.pointSpace !== undefined) this._pointSpace = chartConfig.pointSpace;
        }

        this.buildSeries(data);
    }
     
    private buildSeries(data: Array<IAreaSeriesData>): void {
        this.seriesCollection = new SeriesCollection(this._seriesSpace);

        // check that we've have some data passed in
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new AreaSeries(i, data[i], color, this._pointSpace, this._areaWidth);

                data[i].values.sort(function(a, b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const areaPoint = new AreaPoint(data[i].values[j].x, data[i].values[j].y);

                    series.addAreaPoint(areaPoint);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].name) {
                    const seriesLabel = new SeriesLabel(i, this._seriesSpace, this._areaWidth, this.font, this._seriesLabelSize, this._seriesLabelColor, data[i].name);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }
        }
    }
}