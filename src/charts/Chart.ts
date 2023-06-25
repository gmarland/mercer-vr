import { 
    Mesh,
    BoxGeometry,
    MeshLambertMaterial,
    MeshBasicMaterial,
    DoubleSide,
    Object3D,
    LineBasicMaterial,
    Line,
    Box3,
    Color,
    BufferAttribute,
    BufferGeometry
} from 'three';

import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { SeriesCollection } from './SeriesCollection';

import { IChartConfig } from './IChartConfig';

import { NumberUtils } from '../utils/NumberUtils';
import { GeometryUtils } from '../utils/GeometryUtils';

export class Chart {
    private _chartObject: Object3D;

    private _seriesCollection: SeriesCollection;

    private _fontLocation: string = "fonts/helvetiker_regular.typeface.json";
    private _font: Font;

    // Details of the chart
    private _baseEdge: number = 10; // the distance around the charting area for the base
    private _baseThickness: number = 1; // the thickness of the chart base
    private _baseColor: Color = new Color("#ececec"); // the color for the base

    private _showMeasurementLines: boolean = true; // whether or not to show measurement lines
    private _numberOfMeasurementLines = 10;
    private _measurementLineColor: Color = new Color("#222222"); // the default color of the measurement lines
    private _measurementLabelSize: number = 5; // the font size for the measurement label
    private _measurementLabelColor: Color = new Color("#000000"); // the default color for the measurement label

    private _baseMesh: Mesh;
    private _measurementLines: Object3D = null;

    constructor(chartConfig?: IChartConfig) {
        this._chartObject = new Object3D();

        if (chartConfig) {    
            if (chartConfig.font) this._fontLocation = chartConfig.font;
            
            if (chartConfig.baseEdge !== undefined) this._baseEdge = chartConfig.baseEdge;

            if (chartConfig.baseThickness !== undefined) this._baseThickness = chartConfig.baseThickness;

            if (chartConfig.baseColor !== undefined) this._baseColor = new Color(chartConfig.baseColor);

            if (chartConfig.showMeasurementLines !== undefined) this._showMeasurementLines = chartConfig.showMeasurementLines;

            if (chartConfig.measurementLineColor !== undefined) this._measurementLineColor = new Color(chartConfig.measurementLineColor);

            if (chartConfig.measurementLabelSize !== undefined) this._measurementLabelSize = chartConfig.measurementLabelSize;

            if (chartConfig.measurementLabelColor !== undefined) this._measurementLabelColor = new Color(chartConfig.measurementLabelColor);
        }

        this.loadFont(this._fontLocation).then((font: Font) => {
            this._font = font;
        });
    }

    public get font(): Font {
        return this._font;
    }

    public draw(): void {
        const minValueY = this._seriesCollection.minY;
        const maxValueY = this._seriesCollection.maxY;
        const rangeStepY = NumberUtils.getRoundingInteger(minValueY, maxValueY);

        let minChartRangeY = (minValueY - minValueY %  rangeStepY);
        if (minChartRangeY != 0) minChartRangeY -= rangeStepY;

        const maxChartRangeY = (rangeStepY - maxValueY % rangeStepY) + maxValueY;

        const chartWidth = this._seriesCollection.width;
        const chartLength = this._seriesCollection.length;

        this._baseMesh = this.drawBase(chartWidth, chartLength, this._baseEdge, this._baseThickness, this._baseColor);
        
        if (this._showMeasurementLines) this._measurementLines = this.drawMeasurementsLines(chartWidth+(this._baseEdge*2), chartLength+(this._baseEdge*2), maxChartRangeY, this._numberOfMeasurementLines, this._measurementLineColor, this._measurementLabelSize, this._measurementLabelColor, minChartRangeY, maxChartRangeY);
        
        this._chartObject.add(this._baseMesh);
        if (this._measurementLines) this._chartObject.add(this._measurementLines);

        const rowCollectionObject = this._seriesCollection.drawAllSeries(minChartRangeY, maxChartRangeY);
        rowCollectionObject.position.x += this._baseEdge;
        rowCollectionObject.position.z += this._baseEdge;

        this._chartObject.add(rowCollectionObject);

        const rowLabelsCollectionObject = this._seriesCollection.drawSeriesLabels();
        rowLabelsCollectionObject.position.z += this._baseEdge;
        rowLabelsCollectionObject.position.x += (chartWidth+(this._baseEdge*2));

        this._chartObject.add(rowLabelsCollectionObject);

        const categoryLabelsCollectionObject = this._seriesCollection.drawCategoryLabels();
        categoryLabelsCollectionObject.position.z += (chartLength+(this._baseEdge*2));
        categoryLabelsCollectionObject.position.x += this._baseEdge;

        this._chartObject.add(categoryLabelsCollectionObject);

        const chartObjectArea = new Box3().setFromObject(this._chartObject);

        // position the object so it will view well
        const sizeX = chartObjectArea.max.x - chartObjectArea.min.x;
        const sizeY = chartObjectArea.max.y - chartObjectArea.min.y;
        const sizeZ = chartObjectArea.max.z - chartObjectArea.min.z;

        this._chartObject.position.x = ((sizeX/2)*-1);
        this._chartObject.position.y = ((sizeY/2)*-1);
        this._chartObject.position.z = ((sizeZ/2)*-1);
    }

    public get seriesCollection(): SeriesCollection {
        return this._seriesCollection;
    }
    
    public set seriesCollection(value: SeriesCollection) {
        this._seriesCollection = value;
    }

    private drawBase(chartWidth: number, chartLength: number, baseEdge: number, baseThickness: number, baseColor: Color): Mesh {
        const baseWidth = chartWidth+(baseEdge*2),
            baseLength = chartLength+(baseEdge*2);

        const baseGeometry = new BoxGeometry(baseWidth, baseThickness, baseLength),
            baseMaterial = new MeshLambertMaterial({
                color: baseColor, 
                side: DoubleSide
            });

        const baseMesh = new Mesh(baseGeometry, baseMaterial);
        baseMesh.position.x = (baseWidth/2);
        baseMesh.position.y -= ((baseThickness/2)+0.1);
        baseMesh.position.z = (baseLength/2);

        return baseMesh;
    }

    private drawMeasurementsLines(chartWidth: number, 
        chartLength: number, chartHeight: number, numberOfMeasurementLines: number, lineColor: Color, labelSize: number, labelColor: Color, minValue: number, maxValue: number): Object3D {
        const measurementLineObject = new Object3D();

        const stepsEachLine = Math.ceil(chartHeight/numberOfMeasurementLines);

        for (let i=1; i<=numberOfMeasurementLines; i++) {
            const measureLineGeometry = new BufferGeometry();

            measureLineGeometry.setAttribute( 'position', new BufferAttribute(new Float32Array([
                (chartWidth/2)*-1, 
                (stepsEachLine*i), 
                (chartLength/2),
                (chartWidth/2)*-1, 
                (stepsEachLine*i), 
                (chartLength/2)*-1,
                (chartWidth/2), 
                (stepsEachLine*i), 
                (chartLength/2)*-1
            ]), 3));

            const measureLine = new Line(measureLineGeometry, new LineBasicMaterial({
                color: lineColor,
                side: DoubleSide
            }));

            measurementLineObject.add(measureLine);

            const textGeometry = new TextGeometry((minValue+Math.round((maxValue-minValue)/numberOfMeasurementLines)*i).toString(), {
                font: this._font,
                size: labelSize,
                height: .2
            });
            
            const textMesh = new Mesh(textGeometry, new MeshBasicMaterial({
                color: labelColor
            }));

            const textBoxArea = new Box3().setFromObject(textMesh);
            const textBoxBox = GeometryUtils.getBoxSize(textBoxArea);

            textMesh.position.x += ((chartWidth/2)+5);
            textMesh.position.y += ((stepsEachLine*i)-(textBoxBox.y/2));
            textMesh.position.z -= (chartLength/2);

            measurementLineObject.add(textMesh);
        }

        measurementLineObject.position.x = (chartWidth/2);
        measurementLineObject.position.z = (chartLength/2);

        return measurementLineObject;
    };

    
    private async loadFont(fontLocation: string): Promise<Font> {
        return new Promise((resolve) => {
            const loader = new FontLoader();
            
            loader.load(fontLocation, (response: Font) => {
                resolve(response);
            });
        });
    };
}