import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HereoModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe= new HereoModel();
  constructor(private heroesService:HeroesService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id!=='nuevo'){
      this.heroesService.getHeroe(id)
        .subscribe((resp:HereoModel)=>{
          this.heroe=resp;
          this.heroe.id=id;
          console.log(resp);
        })
    }
  }

  guardar(form:NgForm){

    if(form.invalid){
      return console.log('formulario no valido');
    }

    Swal.fire({
      title: 'Espera!',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick:false
    });
    Swal.showLoading();
    
    let peticion:Observable<any>;
    if(this.heroe.id){
      peticion=this.heroesService.actulizarHeroe(this.heroe);
    }else{
      peticion=this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });

  }



}
