import { Component, signal } from '@angular/core';
import { Root } from '../../interfaces/model';
import data from '../../../../assets/data.json';

@Component({
  selector: 'app-objetivos-unidades',
  imports: [],
  templateUrl: './objetivosUnidades.component.html',
})
export class ObjetivosUnidadesComponent {

  contenido = signal<Root>(data as Root);


}
