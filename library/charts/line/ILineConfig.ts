import { IChartConfig } from "../IChartConfig";

export interface ILineConfig extends IChartConfig {
    lineWidth?: number;

    rowSpace?: number;

    rowLabelSize?: number;

    rowLabelColor?: string;

    pointSpace?: number;
}