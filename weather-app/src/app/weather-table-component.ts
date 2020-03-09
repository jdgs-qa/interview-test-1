import { Component, ViewChild, OnInit } from "@angular/core";
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
  displayedColumns: string[] = [
    "name",
    "symbol",
    "main.temp",
    "main.pressure",
    "main.humidity",
    "clouds.all",
    "wind.speed"
  ];
  dataSource: MatTableDataSource<WeatherData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    getNearbyWeather()
      .then(
        (res: { body?: WeatherData[]; success: boolean; error?: string }) => {
          if (res.success) {
            this.dataSource = new MatTableDataSource(res.body);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "main.pressure":
                  return item.main.pressure;
                case "main.temp":
                  return item.main.temp;
                case "main.humidity":
                  return item.main.humidity;
                case "clouds.all":
                  return item.clouds.all;
                case "wind.speed":
                  return item.wind.speed;
                default:
                  return item[property];
              }
            };
            this.dataSource.sort = this.sort;
          }
        }
      )
      .catch(e => {
        console.warn(`Unable to fetch weather data from API. Error ${e}`);
      });
  }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
