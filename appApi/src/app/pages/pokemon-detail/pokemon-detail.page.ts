import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiPokeService } from 'src/app/service/api-poke.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

  pokemon: any = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiPokeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.api.getPokemonById(Number(id)).subscribe((data: any) => {
      this.pokemon = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t: any) => t.type.name),
        stats: data.stats.map((s: any) => ({
          name: s.stat.name,
          base: s.base_stat
        }))
      };
    });
  }

}
