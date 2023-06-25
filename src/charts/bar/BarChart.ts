import { 
    Color
} from 'three';

import { Chart } from "../Chart";
import { Bar } from './Bar';
import { SeriesLabel } from '../../labels/SeriesLabel';
import { CategoryLabel } from '../../labels/CategoryLabel';
import { BarSeries } from './BarSeries';

export class BarChart extends Chart {
    private _barWidth: number = 15; // the width of the bar
    private _barOpacity: number = 0.65; // how opaque the bars are
    private _showBarLabels: boolean = false; // global setting, should bar labels be visible
    private _barLabelSize: number = 6; // the font size for the series label
    private _barLabelColor: Color = new Color("#000000"); // the default color for the series label
    private _seriesSpace: number = 30; // the space between each series
    private _seriesLabelSize: number = 4; // the font size for the series label
    private _seriesLabelColor: Color = new Color("#000000"); // the default color for the series label
    private _categorySpace: number = 10; // the space between each category in a series
    private _categoryLabelSize: number = 4; // the font size for the col label
    private _categoryLabelColor: Color = new Color("#000000"); // the default color for the col label
    
    constructor(data, chartConfig) {
        super(chartConfig);
        
        // Allow the override using the chartConfig options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.barWidth !== undefined) this._barWidth = chartConfig.barWidth;

            if (chartConfig.barOpacity !== undefined) this._barOpacity = chartConfig.barOpacity;

            if (chartConfig.showBarLabels !== undefined) this._showBarLabels = chartConfig.showBarLabels;

            if (chartConfig.barLabelSize !== undefined) this._barLabelSize = chartConfig.barLabelSize;

            if (chartConfig.barLabelColor !== undefined) this._barLabelColor = new Color(chartConfig.barLabelColor);
            
            if (chartConfig.seriesSpace !== undefined) this._seriesSpace = chartConfig.seriesSpace;

            if (chartConfig.seriesLabels !== undefined) {
                if (chartConfig.seriesLabels.size !== undefined) this._seriesLabelSize = chartConfig.seriesLabels.size;

                if (chartConfig.seriesLabels.color !== undefined) this._seriesLabelColor = new Color(chartConfig.seriesLabels.color);
            }

            if (chartConfig.categorySpace !== undefined) this._categorySpace = chartConfig.categorySpace;

            if (chartConfig.categoryLabels !== undefined) {
                if (chartConfig.categoryLabels.size !== undefined) this._categoryLabelSize = chartConfig.categoryLabels.size;

                if (chartConfig.categoryLabels.color !== undefined) this._categoryLabelColor = new Color(chartConfig.categoryLabels.color);
            }
        }

        this.buildSeries(data);
    }

    private buildSeries(data): void {
        if (data) {
            for (let i=0; i<data.length; i++) {
                if (data[i].id == undefined) data[i].id = i.toString();

                if (data[i].color !== undefined) data[i].color = new Color(data[i].color);
                else data[i].color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                // Local bar settings for labels overwrite global one
                if (data[i].showBarLabels == undefined) data[i].showBarLabels = this._showBarLabels;

                const series = new BarSeries(i, data[i], this._categorySpace, this._barWidth);

                for (let j=0; j<data[i].values.length; j++) {
                    const bar = new Bar(j, 
                                    this._barWidth, 
                                    data[i].values[j], 
                                    this._categorySpace, 
                                    data[i].color, 
                                    this._barOpacity,
                                    data[i].showBarLabels, 
                                    this.font,
                                    this._barLabelSize, 
                                    this._barLabelColor);

                    series.addBar(bar);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].title) {
                    const seriesLabel = new SeriesLabel(i, this._seriesSpace, this._barWidth, this.font, this._seriesLabelSize, this._seriesLabelColor, data[i].title);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }

            for (let i=0; i<data.categoryLabels.values.length; i++) {
                const categoryLabel = new CategoryLabel(i, this._categorySpace, this._barWidth, this.font, this._categoryLabelSize, this._categoryLabelColor, data.categoryLabels.values[i]);

                this.seriesCollection.addCategoryLabel(categoryLabel);
            }
        }
    }
}