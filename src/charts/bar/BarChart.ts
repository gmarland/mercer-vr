import { 
    Color, 
    Scene
} from 'three';

import { Chart } from "../Chart";
import { Bar } from './Bar';
import { SeriesLabel } from '../../labels/SeriesLabel';
import { CategoryLabel } from '../../labels/CategoryLabel';
import { BarSeries } from './BarSeries';

import { IBarConfig } from './IBarConfig';
import { IBarSeriesData } from './IBarSeriesData';

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
    
    constructor(scene: Scene, width: number, height: number, data: Array<IBarSeriesData>, chartConfig?: IBarConfig) {
        super(scene, width, height, chartConfig);
        
        // Allow the override using the chartConfig options if they exist
        if (chartConfig !== undefined) {
            if (chartConfig.barWidth !== undefined) this._barWidth = chartConfig.barWidth;

            if (chartConfig.barOpacity !== undefined) this._barOpacity = chartConfig.barOpacity;

            if (chartConfig.showBarLabels !== undefined) this._showBarLabels = chartConfig.showBarLabels;

            if (chartConfig.barLabelSize !== undefined) this._barLabelSize = chartConfig.barLabelSize;

            if (chartConfig.barLabelColor !== undefined) this._barLabelColor = new Color(chartConfig.barLabelColor);
            
            if (chartConfig.seriesSpace !== undefined) this._seriesSpace = chartConfig.seriesSpace;

            if (chartConfig.seriesLabelSize !== undefined) this._seriesLabelSize = chartConfig.seriesLabelSize;

            if (chartConfig.seriesLabelColor !== undefined) this._seriesLabelColor = new Color(chartConfig.seriesLabelColor);

            if (chartConfig.categorySpace !== undefined) this._categorySpace = chartConfig.categorySpace;

            if (chartConfig.categoryLabelSize !== undefined) this._categoryLabelSize = chartConfig.categoryLabelSize;

            if (chartConfig.categoryLabelColor !== undefined) this._categoryLabelColor = new Color(chartConfig.categoryLabelColor);
        }

        this.buildSeries(data);
    }

    private buildSeries(data: Array<IBarSeriesData>): void {
        if (data) {
            for (let i=0; i<data.length; i++) {
                let color;

                if (data[i].color !== undefined) color = new Color(data[i].color);
                else color = new Color("#"+Math.floor(Math.random()*16777215).toString(16));

                const series = new BarSeries(i, data[i], this._categorySpace, this._barWidth);

                for (let j=0; j<data[i].values.length; j++) {
                    const bar = new Bar(j, 
                                    this._barWidth, 
                                    data[i].values[j], 
                                    this._categorySpace, 
                                    color, 
                                    this._barOpacity,
                                    this._showBarLabels, 
                                    this.font,
                                    this._barLabelSize, 
                                    this._barLabelColor);

                    series.addBar(bar);
                }

                this.seriesCollection.addSeries(series);

                if (data[i].name) {
                    const seriesLabel = new SeriesLabel(i, this._seriesSpace, this._barWidth, this.font, this._seriesLabelSize, this._seriesLabelColor, data[i].name);

                    this.seriesCollection.addSeriesLabel(seriesLabel);
                }
            }
        }
    }
}