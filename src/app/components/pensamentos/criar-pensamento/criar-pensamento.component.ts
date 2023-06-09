import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../Ipensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)/)
        ])
      ],
      autoria: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      modelo: ['modelo1']
    })
  }

  criarPensamento() {
    console.log(this.formulario.status)
    if(!this.formulario.valid)
      return
    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    alert("Ação cancelada!")
  }

  habilitarBotao(): string {
    return this.formulario.valid ?
      'botao' : 'botao__desabilitado'
  }

}
