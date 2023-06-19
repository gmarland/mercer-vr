import { IPoint } from "../point/IPoint";

export interface ISeriesData {
    name: string;

    data: Array<IPoint>;
}