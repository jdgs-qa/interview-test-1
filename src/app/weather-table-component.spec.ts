import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatTableHarness } from "@angular/material/table/testing";

import { WeatherTableComponent } from "./weather-table-component";
import { DemoMaterialModule } from "./material-module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("WeatherTableComponent", () => {
  let component: WeatherTableComponent;
  let fixture: ComponentFixture<WeatherTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherTableComponent],
      imports: [DemoMaterialModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it("should have correct headings and default to 5 rows", async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const expectedHeadings = [
      "City",
      "",
      "Temperature",
      "Pressure",
      "Humidity",
      "Cloud Cover",
      "Wind"
    ];
    const headerRows = await table.getHeaderRows();
    const bodyRowsDefault = await table.getRows();
    expect(await headerRows[0].getCellTextByIndex()).toEqual(expectedHeadings);
    expect(bodyRowsDefault.length).toEqual(5);

    // pagination test
    component.paginator.nextPage;
    const bodyRowsAfterPaginationForward = await table.getRows();
    expect(bodyRowsAfterPaginationForward).not.toEqual(bodyRowsDefault);

    // filter tests
    component.dataSource.filter = "Basford";
    const bodyRowsAfterFiltering = await table.getRows();
    expect(bodyRowsAfterFiltering.length).toBe(1);
    const rowContents = await bodyRowsAfterFiltering[0].getCellTextByIndex();
    expect(rowContents[0]).toBe("Basford");

    component.dataSource.filter = "Nottingham";
    const bodyRowsAfterFiltering2 = await table.getRows();
    expect(bodyRowsAfterFiltering2.length).toBe(2);
    const rowContents2 = await bodyRowsAfterFiltering2[0].getCellTextByIndex();
    const rowContents3 = await bodyRowsAfterFiltering2[1].getCellTextByIndex();
    expect(rowContents2[0]).toBe("Nottingham");
    expect(rowContents3[0]).toBe("City of Nottingham");

    component.dataSource.filter = "Derby";
    const bodyRowsAfterFiltering3 = await table.getRows();
    expect(bodyRowsAfterFiltering3.length).toBe(1);
    const rowContents4 = await bodyRowsAfterFiltering3[0].getCellTextByIndex();
    expect(rowContents4[0]).toBe("City of Derby");
  });
});
