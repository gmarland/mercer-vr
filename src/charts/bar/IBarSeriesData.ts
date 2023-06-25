import { BarPoint } from "../../data/point/BarPoint";

import { ISeriesData } from "../../data/series/ISeriesData";

export interface IBarSeriesData extends ISeriesData {
    values: Array<BarPoint>
}