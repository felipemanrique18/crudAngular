import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HereoModel } from '../models/heroe.model';
import { map,delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url="https://heroes-26caf-default-rtdb.firebaseio.com";
  constructor(private http:HttpClient) { }

  crearHeroe(heroe:HereoModel){
    return this.http.post(`${this.url}/heroes.json`,heroe)
      .pipe(
        map((resp:any)=>{
          heroe.id=resp.name;
          return heroe;
        })
      );
  }

  actulizarHeroe(heroe:HereoModel){
    const heroeTem={
      ...heroe
    };

    delete heroeTem.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTem);
  }
  
  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
        .pipe(
          map(this.crearArreglo),delay(0)
        );
  }

  private crearArreglo(heroesObs:object){
    const heroes:HereoModel[]=[];

    if(heroesObs===null){return []}

    Object.keys(heroesObs).forEach(key=>{
      const heroe:HereoModel=heroesObs[key];
      heroe.id=key;
      heroes.push(heroe);

    })
    return heroes;
  }
}
