import { IPoint } from "../point/IPoint";

export interface ISeriesData {
    name: string;
    
    color?: string

    values: Array<IPoint>;
}