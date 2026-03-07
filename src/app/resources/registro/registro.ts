import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para el pipe de fecha

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
})
export class Registro {
  alumnos = ['Leo', 'Sofía', 'Martín', 'Elena', 'Hugo'];

  // Signals para el formulario
  alumnoSeleccionado = signal('');
  trabajoRealizado = signal('');
  progresoSeleccionado = signal('Iniciado');

  // El diario de clase
  diario = signal<any[]>([]);

  agregarEntrada() {
    if (!this.alumnoSeleccionado() || !this.trabajoRealizado()) return;

    this.diario.update(actual => [{
      alumno: this.alumnoSeleccionado(),
      fecha: new Date(),
      trabajo: this.trabajoRealizado(),
      progreso: this.progresoSeleccionado()
    }, ...actual]);

    this.trabajoRealizado.set('');
  }
}