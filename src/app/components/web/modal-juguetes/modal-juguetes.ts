import {Component, inject, Input} from '@angular/core';
import {Juguete} from '../../../common/juguetesInterface';
import {JuguetesService} from '../../../services/juguetes-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormValidators} from '../../../Validators/FormValidators';

@Component({
  selector: 'app-modal-juguetes',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-juguetes.html',
  styleUrl: './modal-juguetes.css',
})
export class ModalJuguetes {
  @Input({required: true}) juguete!: Juguete;
  @Input({required: true}) editar!: boolean;

  activeModal: NgbActiveModal = inject(NgbActiveModal);
  private readonly juguetesService: JuguetesService = inject(JuguetesService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);


  formJuguete: FormGroup = this.formBuilder.group({ //formgroup es la respresentacion de un objeto en un formulario, y el formcontrol es la representacion del a variable en un formulario
    _id: [''],
    nombre: ['' , [Validators.required, FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenName(['sex','drug','drugs']),
      Validators.minLength(2) , Validators.maxLength(200)]],
    imagen: ['' , [Validators.required, Validators.minLength(10)],
      Validators.pattern(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)],
    categoria: ['' , [Validators.required, FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenName(['sex','drug','drugs']),
      Validators.minLength(2) , Validators.maxLength(200)]],
    edadMinima: [0 , [Validators.required, Validators.min(1) , Validators.max(18)]],
    precio: [0 , [Validators.required, Validators.min(0)]],
  })

  get nombre() {
    return this.formJuguete.get('nombre');
  }

  get imagen() {
    return this.formJuguete.get('imagen');
  }

  get categoria() {
    return this.formJuguete.get('categoria');
  }

  get edadMinima() {
    return this.formJuguete.get('edadMinima');
  }

  get precio() {
    return this.formJuguete.get('precio');
  }

  ngOnInit(): void {
    if (this.editar) {
      this.formJuguete.setValue(this.juguete)
    } else {
      this.formJuguete.reset();
    }
  }

  onSubmit(){
    if(this.editar){
      this.juguetesService.putJuguete(this.formJuguete.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value.message);
            this.activeModal.close(true);
          },
          error: error => {
            console.error(error);
          }
        }
      );
    }else {
      this.juguetesService.postJuguete(this.formJuguete.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value.message);
            this.activeModal.close(true);
          },
          error: error => {
            console.error(error);
          }
        }
      );
    }
  }

}
