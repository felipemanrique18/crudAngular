import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HereoModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes:HereoModel[]=[];
  cargando=false;
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.heroesService.getHeroes().subscribe(resp=>{
      this.cargando=false;
      console.log(resp);
      this.heroes=resp;
    })
  }

  borrarHeroe(heroe:HereoModel,i:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar este heroe?',
      text: "Seguro que deseas eliminar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si,Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Eliminaste el heroe con exito.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu heroe esta a salvo:)',
          'error'
        )
      }
    })
    
  }

}
