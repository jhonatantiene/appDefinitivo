import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {

  }

  dadosPessoa = {
    consumo: 0,
    peso: 0,
    totalAbeber: 0
  }

  graficoAnterior: any

  ngOnInit(): void {

  }

  async grafico() {

    if (this.dadosPessoa.peso > 0) {
      const data = [
        { aguaConsumida: this.dadosPessoa.consumo, count: this.dadosPessoa.consumo, msg: 'Agua consumida' },
        { aguaRestante: this.dadosPessoa.totalAbeber - this.dadosPessoa.consumo, count: this.dadosPessoa.totalAbeber - this.dadosPessoa.consumo, msg: 'Restante' },
      ];


      if (this.graficoAnterior) {
        this.graficoAnterior.destroy()
      }

      this.graficoAnterior = new Chart(
        document.getElementById('graficos') as HTMLCanvasElement,
        {
          type: 'pie',
          data: {
            labels: ['Cosumiu', 'Restante'],
            datasets: [
              {
                data: data.map(row => { return row.count })
              }
            ]
          }
        }
      )
    }
  }

  getDados(peso: number, aguaBebida: number) {
    this.dadosPessoa.peso = peso
    this.dadosPessoa.consumo = aguaBebida
    this.dadosPessoa.totalAbeber = peso * 35 / 1000
    this.grafico()
  }
}
