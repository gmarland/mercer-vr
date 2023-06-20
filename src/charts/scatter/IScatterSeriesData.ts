import { ISeriesData } from "../../data/series/ISeriesData";

import { ThreeDPoint } from "../../data/point/ThreeDPoint";

export interface IScatterSeriesData extends ISeriesData {
    values: Array<ThreeDPoint>
}