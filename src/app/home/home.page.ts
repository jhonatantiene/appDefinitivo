import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {

  }
  dadosPessoa: { consumo: any, peso: any, totalAbeber: any } = {
    consumo: '',
    peso: '',
    totalAbeber: ''
  }

  graficoAnterior: any
  graficoExiste: boolean = false


  ngOnInit(): void {

  }

  async grafico() {

    this.graficoExiste = true
    if (Number(this.dadosPessoa.peso) > 0) {
      const data = [
        { count: this.dadosPessoa.consumo, msg: 'Agua consumida' },
        { count: Number(this.dadosPessoa.totalAbeber) - Number(this.dadosPessoa.consumo) < 0 ? 0 : Number(this.dadosPessoa.totalAbeber) - Number(this.dadosPessoa.consumo), msg: 'Restante' },
        { count: this.dadosPessoa.totalAbeber < this.dadosPessoa.consumo ? Math.abs(Number(this.dadosPessoa.totalAbeber) - Number(this.dadosPessoa.consumo)) : 0, msg: 'Ultrapassou' }
      ];

      if (this.graficoAnterior) {
        this.graficoAnterior.destroy()
      }

      this.graficoAnterior = new Chart(
        document.getElementById('graficos') as HTMLCanvasElement,
        {
          type: 'pie',
          data: {
            labels: ['Cosumiu', 'Restante', 'Ultrapassou'],
            datasets: [
              {
                data: data.map(row => { return row.count }),
              }
            ]
          }
        }
      )
    } else {
      this.digitadoErro(true)
    }
  }

  getDados(peso: number, aguaBebida: number) {
    this.dadosPessoa.peso = Number(this.dadosPessoa.peso)
    this.dadosPessoa.peso = peso
    this.dadosPessoa.consumo = aguaBebida
    this.dadosPessoa.totalAbeber = peso * 35 / 1000
    this.dadosPessoa.peso.toLocaleString().replace(',', '.')
    this.dadosPessoa.consumo.toLocaleString().replace(',', '.')
    this.grafico()
  }

  mensagemErro = false

  digitadoErro(ToastOpen: boolean) {
    this.mensagemErro = ToastOpen
  }
}
