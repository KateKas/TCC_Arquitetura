import { BarragemEntryModel } from './../../models/barragem-entry-model';
import { DashboardChartModel } from './../../models/dashboard-model';
import { DashSearchModel } from './../../models/dash-search-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {

  public dashSearchNumRotas: DashSearchModel = { idEmpresa: -1, dataInicio: new Date(), dataFim: new Date(), diasIntervalo: 1, dashboardItemType: 0 };
  public dashSearchPie: DashSearchModel = { idEmpresa: -1, dataInicio: new Date(), dataFim: new Date(), diasIntervalo: 1, dashboardItemType: 1 };
  public dashSearchColumn: DashSearchModel = { idEmpresa: -1, dataInicio: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 6)), dataFim: new Date(), diasIntervalo: 1, dashboardItemType: 2 };
  public pieChart: DashboardChartModel;
  public columnChart: DashboardChartModel;
  public numeroRotas: number;
  public diaAtual: String;
  public empresaId: number = -1;
  public dayDifference: number;
  public dataInicio;
  public dataFim = new Date();
  public barragensList: BarragemEntryModel[] = [];
  public barragem: BarragemEntryModel;

  today = new Date();
  minFinalDate = new Date();
  maxFinalDate = new Date();

  constructor() { }

  ngOnInit() {
    this.diaAtual = this.getDiaAtual();
    const barragens: BarragemEntryModel[] =[{idBarragem: 1, nomeBarragem: "Xingó"}, {idBarragem: 2, nomeBarragem: "Barão de Cocais"}, {idBarragem: 3, nomeBarragem: "Três Marias"}, {idBarragem: 4, nomeBarragem: "Tabatinga"}, {idBarragem: 5, nomeBarragem: "Machadinho"}]
    this.barragensList = barragens;
    const barragem: BarragemEntryModel = {idBarragem: 2, nomeBarragem: "Barão de Cocais"};
    this.barragem = barragem;
    this.numeroRotas = 3;
    const chartPieMock: DashboardChartModel = { title: "Movimentações da Barragem: Barão de Cocais", type: "ColumnChart", data: [["21/05", 377], ["22/05", 380], ["23/05", 346], ["24/05", 311], ["25/05", 378], ["26/05", 398], ["27/05", 190]], columnNames: ["Dia", "Tamanho Grão (mm): "], width: 400, height: 500 };
    const chartColumnMock: DashboardChartModel = { title: "Movimentações por Zona", type: "PieChart", data: [["Enroncamento Grosso", 17], ["Enroncamento Médio", 9], ["Argila Silto", 6], ["Areia P/Filtro", 1], ["Transição", 776], ["Tapede de Concreto", 0], ["Margem", 0], ["Borda Livre", 0], ["Montante", 0], ["Justante", 0], ["Anéis", 0]], columnNames: ["Status", "Porcentagem"], width: 400, height: 470 };
    this.columnChart = chartColumnMock;
    this.pieChart = chartPieMock;
  }

  getDiaAtual() {
    const date = new Date();
    const ano = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();

    let mesValor = '';
    let diaValor = '';

    mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
    diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

    return diaValor.toString().concat('-').concat(mesValor).concat('-').concat(ano.toString());
  }

  setDataInicio(event) {
    this.minFinalDate = new Date(new Date(event.value).getTime() + (1000 * 60 * 60 * 3));
    this.maxFinalDate = new Date(event.value);
    this.maxFinalDate.setDate(this.maxFinalDate.getDate() + 6);

    if (this.maxFinalDate.getTime() >= this.today.getTime()) {
      this.maxFinalDate = new Date(this.today);
      this.dataFim = new Date(this.today);
    }

  }

  setDataFim(event) {
    this.dataFim = new Date(new Date(event.value).getTime() + (1000 * 60 * 60 * 3));
  }

  getDayDifference(minFinalDate: Date, maxFinalDate: Date) {
    var x = maxFinalDate.getTime() - minFinalDate.getTime();
    var y = (1000 * 3600 * 24)
    return (x / y) + 1;
  }

  filtrar() {
    // this.dashSearchNumRotas.dataInicio = this.minFinalDate;
    // this.dashSearchPie.dataInicio = this.minFinalDate;
    this.dashSearchColumn.dataInicio = this.minFinalDate;

    // this.dashSearchNumRotas.dataFim = this.maxFinalDate.getDate;
    // this.dashSearchPie.dataFim = this.maxFinalDate;

    // colocar dataFim no maximo 6 dias depois da minFinalDate
    if (this.dataFim.getTime() > (this.minFinalDate.getTime() + (1000 * 60 * 60 * 24 * 6))) {
      this.dashSearchColumn.dataFim = new Date(this.minFinalDate.getTime() + (1000 * 60 * 60 * 24 * 6));
    } else {
      this.dashSearchColumn.dataFim = this.dataFim;
    }

    // this.dashSearchNumRotas.diasIntervalo = this.getDayDifference(this.minFinalDate, this.maxFinalDate);
    // this.dashSearchPie.diasIntervalo = this.getDayDifference(this.minFinalDate, this.maxFinalDate);
    this.dashSearchColumn.diasIntervalo = this.getDayDifference(this.minFinalDate, this.dataFim);

    const chartColumnMock: DashboardChartModel = { title: "Mineração Em Andamento", type: "PieChart", data: [["Pendente", 17], ["Aceita", 9], ["Coleta em Andamento", 6], ["Entrega em Andamento", 1], ["No Local da Entrega", 776], ["Entrege", 0], ["Problema durante Entrega", 0], ["Recusada", 0], ["Cancelada", 0], ["Finalizada", 0], ["Problema durante Coleta", 0]], columnNames: ["Status", "Porcentagem"], width: 400, height: 470 };
    this.columnChart = chartColumnMock;
  }

  ////////////////////////////////////////////////////////////

  pieChartOptions = {
    legend: { position: "in", alignment: "start", textStyle: { fontSize: 12 } },
    color: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#CCCCCC'],
    is3D: true,
    titleTextStyle: { color: '#673ab7', fontSize: 15, bold: true, fontName: 'Muli' }
  }

  columnChartOptions = {
    legend: { position: "none" },
    titleTextStyle: { color: '#673ab7', fontSize: 15, bold: true, fontName: 'Muli' },
    is3D: true
  };
}
