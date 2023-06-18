import { 
    Color
} from 'three';

import { Chart } from "../Chart";

import { SeriesCollection } from "../SeriesCollection";

import { AreaPoint } from "./AreaPoint";

export class AreaChart extends Chart {
    private areaWidth: number = 4; // the width of the area graph
    private rowSpace: number = 30; // the space between each row
    private rowLabelSize: number = 4; // the font size for the row label
    private rowLabelColor: number = 0x000000; // the default color for the row label
    private pointSpace: number = 5; // the space between each column in a row

    constructor(data, chartConfig) {
        super(chartConfig);

        this.seriesCollection = new SeriesCollection(this.rowSpace);

        // check that we've have some data passed in
        if (data) {
            for (var i=0; i<data.length; i++) {
                if (data[i].id == undefined) data[i].id = i.toString();

                if (data[i].color !== undefined) data[i].color = new Color(data[i].color);
                else data[i].color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                var row = new AreaSeries(i, data[i], pointSpace, areaWidth);

                data[i].values.sort(function(a,b) {
                    return a.x > b.x ? 1 : a.x < b.x ? -1 : 0;
                });

                for (var j=0; j<data[i].values.length; j++) {
                    var areaPoint = new AreaPoint(data[i].values[j].x, data[i].values[j].y);

                    row.addAreaPoint(areaPoint);
                }

                rowCollection.addRow(row);

                if (data[i].title) {
                    var rowLabel = new RowLabel(i, rowSpace, areaWidth, rowLabelSize, rowLabelColor, data[i].title);

                    rowCollection.addRowLabel(rowLabel);
                }
            }
        }
    }
}