import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { StorageService } from "src/app/shared/services/storage.service";
import { ClientType } from "src/app/shared/enums/client-type";
import { NAME_STORAGE_TYPE_USER } from "src/app/shared/const/globals";
import { StatisticsService } from "src/app/shared/services/statistics.service";
import * as moment from "moment";
@Component({
  selector: "app-initial",
  templateUrl: "./initial.component.html",
  styleUrls: ["./initial.component.scss"]
})
export class InitialComponent implements OnInit {
  public clientType: ClientType;

  public quotationOffert: number = 0;
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
    private storageService: StorageService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.getClientType();
    this.setCharts();
  }

  setCharts() {
    if (this.clientType === ClientType.client) {
      this.barChartLabels = [];
      this.barChartData = [{ data: [], label: "Cotizaciones" }];
      this.statisticsService
        .getStatisticsClientForDay()
        .subscribe(statistics => {
          const dataBar = [];
          statistics.forEach(x => {
            this.barChartLabels.push(
              moment(x.date).format("DD") +
                " de " +
                this.getMonthText(Number(moment(x.date).format("MM")))
            );
            dataBar.push(x.count);
            this.barChartData = [{ data: dataBar, label: "Cotizaciones" }];
          });
        });

      // this.statisticsService.getQuotationNotOffert().subscribe(x => {
      //   this.quotationOffert = x;
      // });
    } else if (this.clientType === ClientType.provider) {
      this.lineChartData = [
        {
          data: [],
          label: "Cotizaciones por dia"
        }
      ];
      this.lineChartLabels = [];

      this.statisticsService
        .getStatisticsProviderForDay()
        .subscribe(statistics => {
          const lineChartData = [];
          const lineChartLabels = [];
          statistics.forEach(x => {
            lineChartLabels.push(
              moment(x.date).format("DD") +
                " de " +
                this.getMonthText(Number(moment(x.date).format("MM")))
            );
            lineChartData.push(x.count);
          });
          this.lineChartLabels = lineChartLabels;
          this.lineChartData = [
            {
              data: lineChartData,
              label: "Cotizaciones por dia"
            }
          ];
        });

      this.statisticsService.getTop10ProductsOfferts().subscribe(statistics => {
        var pieChartLabels = [];
        var pieChartData = [];
        statistics.forEach(x => {
          pieChartLabels.push(x.name);
          pieChartData.push(x.count);
        });
        this.pieChartLabels = pieChartLabels;
        this.pieChartData = pieChartData;
      });
    }
  }

  /**
   *
   */
  getMonthText(month: number) {
    switch (month) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
    }
  }
  /**
   * Obtiene el tipo de cliente de la sesión
   */
  getClientType() {
    this.storageService.select(NAME_STORAGE_TYPE_USER).subscribe(type => {
      this.clientType = type != null ? type : ClientType.client;
    });
  }

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}]
    },
    annotation: {}
  };

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top"
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return value;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)"
      ]
    }
  ];

  // Bar chart

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];
}
