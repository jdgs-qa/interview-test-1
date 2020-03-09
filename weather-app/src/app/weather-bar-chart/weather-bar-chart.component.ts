import { Component, OnInit } from "@angular/core";
import { getNearbyWeather } from "../open-weathermap-api.service";
import { WeatherData } from "../weather-table-component";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-weather-bar-chart",
  templateUrl: "./weather-bar-chart.component.html",
  styleUrls: ["./weather-bar-chart.component.sass"]
})
export class WeatherBarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
  ];

  data: number[];
  labels: string[];
  series: string[];
  constructor() {
    getNearbyWeather().then(
      (res: { body?: WeatherData[]; success: boolean; error?: string }) => {
        if (res.success) {
          this.data = res.body.map(item => {
            return item.main.temp;
          });
          this.labels = res.body.map(item => {
            return item.name;
          });
          this.series = ["Current Temperature"];
        }
      }
    );
  }

  ngOnInit(): void {}
}
