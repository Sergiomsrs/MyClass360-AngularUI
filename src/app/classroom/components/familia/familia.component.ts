import { Component, signal } from '@angular/core';
import { Root } from '../../interfaces/model';
import data from '../../../../assets/data.json';
@Component({
  selector: 'app-familia',
  imports: [],
  templateUrl: './familia.component.html',
})
export class FamiliaComponent {

  contenido = signal<Root>(data as Root);


}
