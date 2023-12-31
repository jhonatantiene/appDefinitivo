import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private crud: CrudService) { }

  consumo: FormGroup = new FormGroup({
    aguaConsumida: new FormControl('', Validators.required),
    aguaRestante: new FormControl('', Validators.required),
  })

  dadosPessoa: { consumo: any, peso: any, totalAbeber: Number } = {
    consumo: '',
    peso: '',
    totalAbeber: 0
  }

  graficoAnterior: any
  graficoExiste: boolean = false

  notificação = LocalNotifications.schedule({
    notifications: [
      {
        title: 'Minha notificação',
        body: 'Beba água',
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) }
      }
    ]
  })

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
                hoverOffset: 0
              }
            ]
          }
        }
      )
    } else {
      this.pesoMenorQue0(true)
    }
  }

  getDados(peso: number, aguaBebida: number) {
    this.dadosPessoa.peso = peso
    this.dadosPessoa.consumo = aguaBebida
    this.dadosPessoa.totalAbeber = peso * 35 / 1000
    this.dadosPessoa.peso.toLocaleString().replace(',', '.')
    this.dadosPessoa.consumo.toLocaleString().replace(',', '.')
    this.grafico()
  }

  cadastro() {
    this.crud.newUser().subscribe(r => {
      console.log(r)
    })
  }

  mensagemErro = false

  pesoMenorQue0(ToastOpen: boolean) {
    this.mensagemErro = ToastOpen
  }
}
