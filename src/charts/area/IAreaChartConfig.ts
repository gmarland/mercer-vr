import { IChartConfig } from "../IChartConfig";

export interface IAreaChartConfig extends IChartConfig {
    areaWidth: number;
    
    seriesSpace: number;
    
    seriesLabelSize: number;

    seriesLabelColor: number;
    
    pointSpace: number;
}