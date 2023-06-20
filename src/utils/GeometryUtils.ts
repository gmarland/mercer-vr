import { 
    Box3
} from 'three';

import { BoxSize } from '../data/BoxSize';

export class GeometryUtils {
    public static getBoxSize(objectArea: Box3): BoxSize {
        return new BoxSize(objectArea.max.x - objectArea.min.x, objectArea.max.y - objectArea.min.y, objectArea.max.z - objectArea.min.z);
    }
}