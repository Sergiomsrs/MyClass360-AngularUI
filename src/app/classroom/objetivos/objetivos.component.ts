import { Component, signal } from '@angular/core';
import { Root } from '../interfaces/model';
import data from '../../../assets/data.json';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'objetivos',
  templateUrl: './objetivos.component.html',
})
export class ObjetivosComponent {
  contenido = signal<Root>(data as Root);
}
