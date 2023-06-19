import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { SeriesCollection } from "../SeriesCollection";

import { IAreaSeriesData } from './IAreaSeriesData';

import { AreaSeries } from "./AreaSeries";
import { AreaPoint } from "./AreaPoint";

import { SeriesLabel } from '../../labels/SeriesLabel';

export class AreaChart extends Chart {
    private areaWidth: number = 4; // the width of the area graph
    private rowSpace: number = 30; // the space between each row
    private rowLabelSize: number = 4; // the font size for the row label
    private rowLabelColor: number = 0x000000; // the default color for the row label
    private pointSpace: number = 5; // the space between each category in a row

    constructor(data: Array<IAreaSeriesData>, chartConfig) {
        super(chartConfig);

        // Allow the override using the graphData options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.areaWidth !== undefined) this.areaWidth = chartConfig.areaWidth;
            
            if (chartConfig.rowSpace !== undefined) this.rowSpace = chartConfig.rowSpace;

            if (chartConfig.rowLabels !== undefined) {
                if (chartConfig.rowLabels.size !== undefined) this.rowLabelSize = chartConfig.rowLabels.size;

                if (chartConfig.rowLabels.color !== undefined) this.rowLabelColor = new Color(chartConfig.rowLabels.color);
            }

            if (chartConfig.pointSpace !== undefined) this.pointSpace = chartConfig.pointSpace;
        }

        this.buildSeries(data);
    }
     
    private buildSeries(data: Array<IAreaSeriesData>): void {
        this.seriesCollection = new SeriesCollection(this.rowSpace);

        // check that we've have some data passed in
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new AreaSeries(i, data[i], color, this.pointSpace, this.areaWidth);

                data[i].values.sort(function(a, b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const areaPoint = new AreaPoint(data[i].values[j].x, data[i].values[j].y);

                    series.addAreaPoint(areaPoint);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].name) {
                    const seriesLabel = new SeriesLabel(i, this.rowSpace, this.areaWidth, this.rowLabelSize, this.rowLabelColor, data[i].name);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }
        }
    }
}