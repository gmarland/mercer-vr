import { 
    Mesh,
    BoxGeometry,
    MeshLambertMaterial,
    MeshBasicMaterial,
    DoubleSide,
    Object3D,
    Geometry,
    Vector3,
    LineBasicMaterial,
    Line,
    TextGeometry,
    Box3,
    Color
} from 'three';

import { SeriesCollection } from './SeriesCollection';

import { NumberUtils } from '../utils/numberUtils';

export class Chart {
    private _chartObject: Object3D;

    private _seriesCollection: SeriesCollection;

    // Details of the chart
    private _baseEdge: number = 10; // the distance around the charting area for the base
    private _baseThickness: number = 1; // the thickness of the chart base
    private _baseColor: Color = 0xececec; // the color for the base

    private _showMeasurementLines: boolean = true; // whether or not to show measurement lines
    private _numberOfMeasurementLines = 10;
    private _measurementLineColor: Color = 0x222222; // the default color of the measurement lines
    private _measurementLabelSize: number = 5; // the font size for the measurement label
    private _measurementLabelColor: Color = 0x000000; // the default color for the measurement label

    private _font;

    private _baseMesh: Mesh;
    private _measurementLines: Object3D = null;

    constructor(chartConfig?) {
        this._chartObject = new Object3D();

        if (chartConfig) {        
            if (chartConfig.baseEdge !== undefined) this._baseEdge = chartConfig.baseEdge;

            if (chartConfig.baseThickness !== undefined) this._baseThickness = chartConfig.baseThickness;

            if (chartConfig.baseColor !== undefined) this._baseColor = chartConfig.baseColor;

            if (chartConfig.showMeasurementLines !== undefined) this._showMeasurementLines = chartConfig.showMeasurementLines;

            if (chartConfig.measurementLineColor !== undefined) this._measurementLineColor = new Color(chartConfig.measurementLineColor);

            if (chartConfig.measurementLabelSize !== undefined) this._measurementLabelSize = chartConfig.measurementLabelSize;

            if (chartConfig.measurementLabelColor !== undefined) this._measurementLabelColor = new Color(chartConfig.measurementLabelColor);
        }
    }

    public draw(): void {
        const minValueY = this._seriesCollection.minY;
        const maxValueY = this._seriesCollection.maxY;
        const rangeStepY = NumberUtils.getRoundingInteger(minValueY, maxValueY);

        let minChartRangeY = (minValueY - minValueY %  rangeStepY);
        if (minChartRangeY != 0) minChartRangeY -= rangeStepY;

        var maxChartRangeY = (rangeStepY - maxValueY % rangeStepY) + maxValueY;

        const chartWidth = this._seriesCollection.width;
        const chartLength = this._seriesCollection.length;

        this._baseMesh = this.drawBase(chartWidth, chartLength, this._baseEdge, this._baseThickness, this._baseColor);
        
        if (this._showMeasurementLines) this._measurementLines = this.drawMeasurementsLines(chartWidth+(this._baseEdge*2), chartLength+(this._baseEdge*2), maxChartRangeY, this._numberOfMeasurementLines, this._measurementLineColor, this._measurementLabelSize, this._measurementLabelColor, minChartRangeY, maxChartRangeY);
        
        this._chartObject.add(this._baseMesh);
        if (this._measurementLines) this._chartObject.add(this._measurementLines);

        var rowCollectionObject = this._seriesCollection.drawRows(minChartRangeY, maxChartRangeY);
        rowCollectionObject.position.x += this._baseEdge;
        rowCollectionObject.position.z += this._baseEdge;

        this._chartObject.add(rowCollectionObject);

        var rowLabelsCollectionObject = this._seriesCollection.drawRowLabels();
        rowLabelsCollectionObject.position.z += this._baseEdge;
        rowLabelsCollectionObject.position.x += (chartWidth+(this._baseEdge*2));

        this._chartObject.add(rowLabelsCollectionObject);

        var columnLabelsCollectionObject = this._seriesCollection.drawColumnLabels();
        columnLabelsCollectionObject.position.z += (chartLength+(this._baseEdge*2));
        columnLabelsCollectionObject.position.x += this._baseEdge;

        this._chartObject.add(columnLabelsCollectionObject);

        var chartObjectArea = new Box3().setFromObject(this._chartObject);

        // position the object so it will view well
        this._chartObject.position.x = ((chartObjectArea.size().x/2)*-1);
        this._chartObject.position.y = ((chartObjectArea.size().y/2)*-1);
        this._chartObject.position.z = ((chartObjectArea.size().z/2)*-1);
    }

    public get seriesCollection(): SeriesCollection {
        return this._seriesCollection;
    }
    
    public set seriesCollection(value: SeriesCollection) {
        this._seriesCollection = value;
    }

    private drawBase(chartWidth, chartLength, baseEdge, baseThickness, baseColor): void {
        var baseWidth = chartWidth+(baseEdge*2),
            baseLength = chartLength+(baseEdge*2);

        var baseGeometry = new BoxGeometry(baseWidth, baseThickness, baseLength),
            baseMaterial = new MeshLambertMaterial({
                color: baseColor, 
                side: DoubleSide
            });

        var baseMesh = new Mesh(baseGeometry, baseMaterial);
        baseMesh.position.x = (baseWidth/2);
        baseMesh.position.y -= ((baseThickness/2)+0.1);
        baseMesh.position.z = (baseLength/2);

        return baseMesh;
    }

    private drawMeasurementsLines(chartWidth, chartLength, chartHeight, numberOfMeasurementLines, lineColor, labelSize, labelColor, minValue, maxValue): void {
        var measurementLineObject = new Object3D();

        var stepsEachLine = Math.ceil(chartHeight/numberOfMeasurementLines);

        for (var i=1; i<=numberOfMeasurementLines; i++) {
            var measureLineGeometry = new Geometry();
            measureLineGeometry.vertices.push(new Vector3((chartWidth/2)*-1, (stepsEachLine*i), (chartLength/2)));
            measureLineGeometry.vertices.push(new Vector3((chartWidth/2)*-1, (stepsEachLine*i), (chartLength/2)*-1));
            measureLineGeometry.vertices.push(new Vector3((chartWidth/2), (stepsEachLine*i), (chartLength/2)*-1));

            var measureLine = new Line(measureLineGeometry, new LineBasicMaterial({
                color: lineColor,
                side: DoubleSide
            }));

            measurementLineObject.add(measureLine);

            var textGeometry = new TextGeometry((minValue+Math.round((maxValue-minValue)/numberOfMeasurementLines)*i).toString(), {
                font: this._font,
                size: labelSize,
                height: .2
            });
            
            var textMesh = new Mesh(textGeometry, new MeshBasicMaterial({
                color: labelColor
            }));

            var textBoxArea = new Box3().setFromObject(textMesh);

            textMesh.position.x += ((chartWidth/2)+5);
            textMesh.position.y += ((stepsEachLine*i)-(textBoxArea.size().y/2));
            textMesh.position.z -= (chartLength/2);

            measurementLineObject.add(textMesh);
        }

        measurementLineObject.position.x = (chartWidth/2);
        measurementLineObject.position.z = (chartLength/2);

        return measurementLineObject;
    };
}