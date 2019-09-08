


/**
 *
 * bar.js
 * simple, elegant bar chart library
 * 26.10.2017 - version 1.0
 * https://github.com/alperentalaslioglu/bar-js
 *
 * Copyright 2017 Alperen <alperen.talaslioglu@gmail.com>
 * Relased under the MIT License
 * https://github.com/alperentalaslioglu/bar-js/blob/master/LICENCE.md
 *
 */

'use strict';

function BarChart(targetId, width, height, data){
    // Base
    var chart = this;

    // Specify Configurations
    chart.configureChart(targetId, width, height, data);

    // Pre Operations
    chart.performPreOperations();

    // Draw Chart
    chart.drawChart();
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
  // Base
  var chart = this;

  // Global Canvas Specifications
  chart.setCanvasParameters(targetId, width, height, data);

  // Global Chart Specifications
  chart.setChartParameters();

};

BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
  // Base
  var chart = this;

  // Canvas Specifications come from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function () {
  // Base
  var chart = this;

  // Axis Configurations
  chart.axisRatio = 10; // in terms of percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = '#b1b1b1';
  chart.axisWidth = 0.75;

  // Label Configurations
  chart.fontRatio = 3; // in terms of percentage
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = '300';
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline Configurations
  chart.guidelineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performPreOperations = function () {
  // Base
  var chart = this;

  // Create Canvas
  chart.createCanvas();

  // Get data
  chart.handleData();

  // Prepare data
  chart.preapareData();

};

BarChart.prototype.createCanvas = function () {
  // Base
  var chart = this;

  // Create Canvas
  var canvas = document.createElement('canvas');
  canvas.id = chart.id + '-' + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append canvas to target container
  document.getElementById(chart.id).innerHTML = ''; // clean container
  document.getElementById(chart.id).appendChild(canvas); // add canvas to clean container

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');
};

BarChart.prototype.handleData = function (){
  // Base
  var chart = this;

  // Data sets
  chart.labels = [];
  chart.values = [];

  // Handle Data
  chart.data.forEach(function(item){
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.preapareData = function () {
  // Base
  var chart = this;

  // Global Variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // Axis Specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margins
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin // left and right margins

  // Label Specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function () {
  // Base
  var chart = this;

  // Vertical Axis
  chart.drawVerticalAxis();

  // Vertical Labels
  chart.drawVerticalLabels();

  // Horizontal Axis
  chart.drawHorizontalAxis();

  // Horizontal Labels
  chart.drawHorizontalLabels();

  // Horizontal Guidelines
  chart.drawHorizontalGuidelines();

  // Vertical Guidelines
  chart.drawVerticalGuidelines();

  // Bars
  chart.drawBars();

};

BarChart.prototype.drawVerticalAxis = function () {
  // Base
  var chart = this;

  // Vertical Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabels = function () {
  // Base
  var chart = this;

  // Text Specifications
  var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = 'right';
  chart.context.fillStyle = chart.fontColor;

  // Scale Values
  var scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

  // Draw labels
  for(var i = 0; i <= chart.itemsNum; i++){
    var labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
    var verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    var verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalAxis = function () {
  // Base
  var chart = this;

  // Horizontal Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
};

BarChart.prototype.drawHorizontalLabels = function () {
  // Base
  var chart = this;

  // Text Specifications
  var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = 'center';
  chart.context.textBaseline = 'top';
  chart.context.fillStyle = chart.fontColor;

  // Draw Labels
  for(var i = 0; i < chart.itemsNum; i++){
    var horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2;
    var horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio;

    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuidelines = function () {
  // Base
  var chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Scale Values
  var scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

  // Draw labels
  for(var i = 0; i <= chart.itemsNum; i++){
    // Starting point coordinates
    var horizontalGuidelineStartX = chart.horizontalMargin;
    var horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    // End point coordinates
    var horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth;
    var horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawVerticalGuidelines = function () {
  // Base
  var chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Draw Labels
  for(var i = 0; i <= chart.itemsNum; i++){
    // Starting point coordinates
    var verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizontalLabelFreq;
    var verticalGuidelineStartY = chart.height - chart.verticalMargin;

    // End point coordinates
    var verticalGuidelineEndX = chart.horizontalMargin + i * chart.horizontalLabelFreq;
    var verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();

  }
};

BarChart.prototype.drawBars = function () {
  // Base
  var chart = this;

  for(var i = 0; i < chart.itemsNum; i++){

    var color = chart.createRandomRGBColor();
    var fillOpacity = '0.3';
    var fillColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ', ' + fillOpacity +')';
    var borderColor = 'rgba('+ color.r + ', ' + color.g  + ', ' + color.b + ')';

    chart.context.beginPath();

    var barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio;
    var barY = chart.height - chart.verticalMargin;
    var barWidth = chart.horizontalLabelFreq - 2 * chart.horizontalLabelFreq / chart.axisRatio;
    var barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.createRandomRGBColor = function () {
  var red = getRandomInt(0, 257);
  var green = getRandomInt(0, 257);
  var blue = getRandomInt(0, 257);
  return {r: red, g: green, b: blue};
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
