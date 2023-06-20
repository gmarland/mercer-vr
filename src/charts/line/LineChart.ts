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
    private lineWidth: number = 2.5; // the width of the lines on the graph
    private rowSpace: number = 30; // the space between each row
    private rowLabelSize: number = 4; // the font size for the row label
    private rowLabelColor: Color = 0x000000; // the default color for the row label
    private pointSpace: number = 5; // the space between each category in a row

    constructor(data: Array<ILineSeriesData>, chartConfig?: ILineConfig) {
        super(chartConfig);
        
        // Allow the override using the graphData options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.lineWidth !== undefined) this.lineWidth = chartConfig.lineWidth;
            
            if (chartConfig.rowSpace !== undefined) this.rowSpace = chartConfig.rowSpace;

            if (chartConfig.rowLabelSize !== undefined) this.rowLabelSize = chartConfig.rowLabelSize;

            if (chartConfig.rowLabelColor !== undefined) this.rowLabelColor = new Color(chartConfig.rowLabelColor);

            if (chartConfig.pointSpace !== undefined) this.pointSpace = chartConfig.pointSpace;
        }
    }

    private buildSeries(data: Array<ILineSeriesData>) {
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color !== undefined) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new LineSeries(i, data[i], color, this.pointSpace, this.lineWidth);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const linePoint = new LinePoint(data[i].values[j].x, data[i].values[j].y);

                    series.addLinePoint(linePoint);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].name) {
                    const rowLabel = new SeriesLabel(i, this.rowSpace, this.lineWidth, this.rowLabelSize, this.rowLabelColor, data[i].name);

                    this.seriesCollection.addSeriesLabel(rowLabel);
                }
            }
        }
    }
}