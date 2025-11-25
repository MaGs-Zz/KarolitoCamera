import { Component, OnInit } from '@angular/core';
import { ApiPokeService } from '../service/api-poke.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  pokemons: any [] = [];

  constructor(
  private _apiPokeService: ApiPokeService,
  private router: Router
){}


  ngOnInit() {

    this._apiPokeService.getPokemon().subscribe((data: any) =>{
      
      this.pokemons = data.results.map((poke: any) => {
        const id = poke.url.split('/')[6]; // obtiene el ID desde la URL

        return {
          name: poke.name,
          id: id,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
      });

      console.log(this.pokemons);

    });
  }

  openDetail(id: number) {
  this.router.navigate(['/pokemon-detail', id]);
}


}
