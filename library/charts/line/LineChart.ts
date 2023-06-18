import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { SeriesCollection } from "../SeriesCollection";

import { LineSeries } from "./LineSeries";
import { LinePoint } from "./LinePoint";

import { SeriesLabel } from '../../labels/SeriesLabel';

export class LineChart extends Chart {
    private lineWidth: number = 2.5; // the width of the lines on the graph
    private rowSpace: number = 30; // the space between each row
    private rowLabelSize: number = 4; // the font size for the row label
    private rowLabelColor: Color = 0x000000; // the default color for the row label
    private pointSpace: number = 5; // the space between each category in a row

    constructor(data, chartConfig) {
        super(chartConfig);
        
        // Allow the override using the graphData options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.lineWidth !== undefined) this.lineWidth = chartConfig.lineWidth;
            
            if (chartConfig.rowSpace !== undefined) this.rowSpace = chartConfig.rowSpace;

            if (chartConfig.rowLabels !== undefined) {
                if (chartConfig.rowLabels.size !== undefined) this.rowLabelSize = chartConfig.rowLabels.size;

                if (chartConfig.rowLabels.color !== undefined) this.rowLabelColor = new Color(chartConfig.rowLabels.color);
            }

            if (chartConfig.pointSpace !== undefined) this.pointSpace = chartConfig.pointSpace;
        }
    }

    private buildSeries(data) {
        if (data) {
            for (let i=0; i<data.length; i++) {
                if (data[i].id == undefined) data[i].id = i.toString();

                if (data[i].color !== undefined) data[i].color = new Color(data[i].color);
                else data[i].color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new LineSeries(i, data[i], this.pointSpace, this.lineWidth);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const linePoint = new LinePoint(data[i].values[j].x, data[i].values[j].y);

                    series.addLinePoint(linePoint);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].title) {
                    const rowLabel = new SeriesLabel(i, this.rowSpace, this.lineWidth, this.rowLabelSize, this.rowLabelColor, data[i].title);

                    this.seriesCollection.addSeriesLabel(rowLabel);
                }
            }
        }
    }
}