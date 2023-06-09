import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../Ipensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: IPensamento[] = []

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    })
  }

}
