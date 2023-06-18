import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { ScatterSeries } from "./ScatterSeries";
import { ScatterPoint } from './ScatterPoint';

export class ScatterChart extends Chart {
    private pointSize: number = 6; // the space between each column in a row

    constructor(data, chartConfig) {
        super(chartConfig);

        if (chartConfig !== undefined) {
            if (chartConfig.pointSize !== undefined) this.pointSize = chartConfig.pointSize;
        }

        this.buildSeries(data);
    }

    private buildSeries(data): void {
        if (data) {
            for (var i=0; i<data.length; i++) {
                if (data[i].id == undefined) data[i].id = i.toString();

                if (data[i].color !== undefined) data[i].color = new Color(data[i].color);
                else data[i].color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                var series = new ScatterSeries(i, data[i]);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (var j=0; j<data[i].values.length; j++) {
                    var scatterPoint = new ScatterPoint(data[i].values[j].x, data[i].values[j].y, data[i].values[j].z, this.pointSize);

                    series.addScatterPoint(scatterPoint);
                }

                this.seriesCollection.addSeries(series);
            }
        }

    }
}