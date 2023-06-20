import { IPoint } from "./IPoint";

export interface BarPoint extends IPoint {
    name: string;

    value: number;
}