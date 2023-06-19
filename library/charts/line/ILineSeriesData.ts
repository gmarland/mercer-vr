import { ISeriesData } from "../../data/series/ISeriesData";

import { Point } from "../../data/point/Point";

export interface ILineSeriesData extends ISeriesData {
    values: Array<Point>
}