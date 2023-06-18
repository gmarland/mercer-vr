import { 
    Color
} from 'three';

import { Chart } from "../Chart";
import { Bar } from './Bar';
import { SeriesLabel } from '../../labels/SeriesLabel';
import { ColumnLabel } from '../../labels/ColumnLabel';
import { BarSeries } from './BarSeries';

export class BarChart extends Chart {
    private _barWidth = 15; // the width of the bar
    private _barOpacity = 0.65; // how opaque the bars are
    private _showBarLabels = false; // global setting, should bar labels be visible
    private _barLabelSize = 6; // the font size for the row label
    private _barLabelColor = 0x000000; // the default color for the row label
    private _rowSpace = 30; // the space between each row
    private _rowLabelSize = 4; // the font size for the row label
    private _rowLabelColor = 0x000000; // the default color for the row label
    private _columnSpace = 10; // the space between each column in a row
    private _columnLabelSize = 4; // the font size for the col label
    private _columnLabelColor = 0x000000; // the default color for the col label
    
    constructor(data, chartConfig) {
        super(chartConfig);
        
        // Allow the override using the chartConfig options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.barWidth !== undefined) this._barWidth = chartConfig.barWidth;

            if (chartConfig.barOpacity !== undefined) this._barOpacity = chartConfig.barOpacity;

            if (chartConfig.showBarLabels !== undefined) this._showBarLabels = chartConfig.showBarLabels;

            if (chartConfig.barLabelSize !== undefined) this._barLabelSize = chartConfig.barLabelSize;

            if (chartConfig.barLabelColor !== undefined) this._barLabelColor = new Color(chartConfig.barLabelColor);
            
            if (chartConfig.rowSpace !== undefined) this._rowSpace = chartConfig.rowSpace;

            if (chartConfig.rowLabels !== undefined) {
                if (chartConfig.rowLabels.size !== undefined) this._rowLabelSize = chartConfig.rowLabels.size;

                if (chartConfig.rowLabels.color !== undefined) this._rowLabelColor = new Color(chartConfig.rowLabels.color);
            }

            if (chartConfig.columnSpace !== undefined) this._columnSpace = chartConfig.columnSpace;

            if (chartConfig.columnLabels !== undefined) {
                if (chartConfig.columnLabels.size !== undefined) this._columnLabelSize = chartConfig.columnLabels.size;

                if (chartConfig.columnLabels.color !== undefined) this._columnLabelColor = new Color(chartConfig.columnLabels.color);
            }
        }

        this.buildSeries(data);
    }

    private buildSeries(data) {
        if (data) {
            for (let i=0; i<data.length; i++) {
                if (data[i].id == undefined) data[i].id = i.toString();

                if (data[i].color !== undefined) data[i].color = new Color(data[i].color);
                else data[i].color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                // Local bar settings for labels overwrite global one
                if (data[i].showBarLabels == undefined) data[i].showBarLabels = this._showBarLabels;

                const row = new BarSeries(i, data[i], this._columnSpace, this._barWidth);

                for (let j=0; j<data[i].values.length; j++) {
                    const bar = new Bar(j, 
                                    this._barWidth, 
                                    data[i].values[j], 
                                    this._columnSpace, 
                                    data[i].color, 
                                    this._barOpacity,
                                    data[i].showBarLabels, 
                                    this._barLabelSize, 
                                    this._barLabelColor);

                    row.addBar(bar);
                }

                this.seriesCollection.addSeries(row);

                if (data[i].title) {
                    const seriesLabel = new SeriesLabel(i, this._rowSpace, this._barWidth, this._rowLabelSize, this._rowLabelColor, data[i].title);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }

            for (let i=0; i<data.columnLabels.values.length; i++) {
                const columnLabel = new ColumnLabel(i, this._columnSpace, this._barWidth, this._columnLabelSize, this._columnLabelColor, data.columnLabels.values[i]);

                this.seriesCollection.addColumnLabel(columnLabel);
            }
        }
    }
}