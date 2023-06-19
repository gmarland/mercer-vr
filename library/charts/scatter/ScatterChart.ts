import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { ScatterSeries } from "./ScatterSeries";
import { ScatterPoint } from './ScatterPoint';
import { IScatterSeriesData } from './IScatterSeriesData';
import { IScatterConfig } from './IScatterConfig';

export class ScatterChart extends Chart {
    private pointSize: number = 6; // the space between each category in a row

    constructor(data: Array<IScatterSeriesData>, chartConfig?: IScatterConfig) {
        super(chartConfig);

        if (chartConfig) {
            if (chartConfig.pointSize) this.pointSize = chartConfig.pointSize;
        }

        this.buildSeries(data);
    }

    private buildSeries(data: Array<IScatterSeriesData>): void {
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color !== undefined) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new ScatterSeries(i, data[i], color);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (let j=0; j<data[i].values.length; j++) {
                    const scatterPoint = new ScatterPoint(data[i].values[j].x, data[i].values[j].y, data[i].values[j].z, this.pointSize);

                    series.addScatterPoint(scatterPoint);
                }

                this.seriesCollection.addSeries(series);
            }
        }

    }
}