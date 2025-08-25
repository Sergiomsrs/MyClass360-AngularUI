import { Component, signal } from '@angular/core';
import { Root } from '../../interfaces/model';
import data from '../../../../assets/data.json';



@Component({
  selector: 'app-orientaciones',
  imports: [],
  templateUrl: './orientaciones.component.html',
})
export class OrientacionesComponent {

  contenido = signal<Root>(data as Root);
}
