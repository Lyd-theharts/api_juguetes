import {Component, inject, OnInit, signal} from '@angular/core';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {JuguetesService} from '../../../services/juguetes-service';
import {Juguete} from '../../../common/juguetesInterface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {ModalJuguetes} from '../modal-juguetes/modal-juguetes';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-list-juguetes',
  imports: [
    FaIconComponent,
    NgbPagination,
    FormsModule
  ],
  templateUrl: './list-juguetes.html',
  styleUrl: './list-juguetes.css',
})
export class ListJuguetes implements OnInit {
  private readonly juguetesService: JuguetesService = inject(JuguetesService);
  private readonly modalService: NgbModal = inject(NgbModal);
  juguetes = signal<Juguete[]>([]);
  loaded = false;
  currentPage: number = 1 ;
  collectionSize = signal(0);
  searchNombre = '';
  isSearching = false;


  ngOnInit() {
    this.loadJuguetes();
  }

  private loadJuguetes() {
    this.isSearching =false;
    this.juguetesService.getDataJuguetesPaginado(this.currentPage).subscribe(
      {
        next: value => {
          this.juguetes.set(value.juguetes.juguetes);
          this.collectionSize.set(value.juguetes.info.total);
          this.loaded = true;

          console.log(this.juguetes());
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }

  newjuguete() {
    const modalRef = this.modalService.open(ModalJuguetes);
    modalRef.componentInstance.editar = false;

    modalRef.result.then((): void => {
      this.loadJuguetes();
    })
      .catch(error => {
        this.loadJuguetes();
        console.error(error);
      })
  }

  protected readonly faTrashCan = faTrashCan;

  removeJuguete(juguete: Juguete) {
    if (confirm('Are you sure you want to delete the juguete ' + juguete.nombre + '?')) {
      if (juguete._id) //porque el id es opcional, esta en la interface, entonces te pide que pongas si existe hacer esto:
        this.juguetesService.deleteJuguete(juguete._id).subscribe(
          {
            next: value => {
              alert(value.message); // "No no no, no puedes borrar :D"
              this.loadJuguetes();
              console.log(value.message);
            },
            error: error => {
              console.error(error);
            }
          }
        )
    }
  }

  loadJuguete(juguete: Juguete) {
    const modalRef = this.modalService.open(ModalJuguetes);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.juguete = juguete;

    modalRef.result.then((): void => {
      this.loadJuguetes();
    })
      .catch(error => {
        this.loadJuguetes();
        console.error(error);
      })
  }

  protected readonly faEdit = faEdit;

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadJuguetes();
  }

  buscarJuguetes() {
    const nombre = this.searchNombre.trim();
    if (nombre === ''){
      this.loadJuguetes();
      return;
    }
    this.loaded = false;
    this.isSearching = true;

    this.juguetesService.getDataPorNombre(nombre).subscribe(
      {
        next: value => {
          console.log('Resultado',value);
          // @ts-ignore
          this.juguetes.set(value);
          console.log(this.juguetes());
          this.loaded = true;
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }

  volverALista() {
    this.loadJuguetes();
    this.searchNombre = '';
  }
}
