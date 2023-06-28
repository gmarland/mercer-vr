import { IChartConfig } from "../IChartConfig";

export interface ILineConfig extends IChartConfig {
    lineWidth?: number;

    seriesSpace?: number;

    seriesLabelSize?: number;

    seriesLabelColor?: string;
}