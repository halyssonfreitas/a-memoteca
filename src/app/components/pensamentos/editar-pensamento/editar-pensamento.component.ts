import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../Ipensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from 'src/app/validators/minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  pensamento!: IPensamento
  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      id: [''],
      conteudo: [''],
      autoria: [''],
      modelo: [''],
      favorito: [false]
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe(pensamento=> {
      console.log(pensamento)
      this.pensamento = pensamento
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [
          pensamento?.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)/)
          ])
        ],
        autoria: [
          pensamento?.autoria,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            minusculoValidator
          ])
        ],
        modelo: [pensamento?.modelo],
        favorito: [false]
      })
    })
  }

  editarPensamento() {
    console.log(this.formulario.status)
    if(!this.formulario.valid)
      return
    this.pensamento.conteudo = this.formulario.get('conteudo')?.value
    this.pensamento.autoria = this.formulario.get('autoria')?.value
    this.pensamento.modelo = this.formulario.get('modelo')?.value
    this.service.editar(this.pensamento).subscribe(()=>{
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    return this.formulario?.valid ?
      'botao' : 'botao__desabilitado'
  }

}
