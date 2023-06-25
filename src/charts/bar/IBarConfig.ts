import { Color } from "three";

import { IChartConfig } from "../IChartConfig";

export interface IBarConfig extends IChartConfig {
    barWidth: number;
    
    barOpacity: number;
    
    showBarLabels: boolean;
    
    barLabelSize: number;
    
    barLabelColor: Color;
    
    seriesSpace: number;
    
    seriesLabelSize: number;
    
    seriesLabelColor: Color;
    
    categorySpace: number;
    
    categoryLabelSize: number;
    
    categoryLabelColor: Color;
}