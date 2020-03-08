import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { getNearbyWeather } from "./open-weathermap-api.service";

export interface WeatherData {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  dt: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}

enum UNITS {
  metric = "metric",
  imperial = "imperial",
  default = ""
}

@Component({
  selector: "weather-table-component",
  styleUrls: ["weather-table-component.css"],
  templateUrl: "weather-table-component.html"
})
export class WeatherTableComponent implements OnInit {
  displayedColumns: string[] = ["city", "symbol", "temp", "pressure", "humid"];
  dataSource: MatTableDataSource<WeatherData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    getNearbyWeather().then(
      (res: { body?: WeatherData[]; success: boolean; error?: string }) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource(res.body);
        }
      }
    );
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
