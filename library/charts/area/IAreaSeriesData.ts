import { ISeriesData } from "../../data/series/ISeriesData";

import { Point } from "../../data/point/Point";

export interface IAreaSeriesData extends ISeriesData {
    values: Array<Point>
}