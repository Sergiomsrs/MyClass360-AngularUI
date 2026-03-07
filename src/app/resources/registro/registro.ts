import { Component, signal, computed, effect } from '@angular/core'; // Añadimos computed y effect
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
})
export class Registro {
  alumnos = ['Leo', 'Sofía', 'Martín', 'Elena', 'Hugo'];

  // Signals del formulario
  alumnoSeleccionado = signal('');
  trabajoRealizado = signal('');
  progresoSeleccionado = signal('Iniciado');

  // Nueva Signal para la fecha (por defecto hoy en formato YYYY-MM-DD)
  fechaSeleccionada = signal(new Date().toISOString().split('T')[0]);

  // Diario principal con persistencia
  diario = signal<any[]>(this.cargarLocalStorage());

  constructor() {
    // Cada vez que 'diario' cambie, guardamos en LocalStorage automáticamente
    effect(() => {
      localStorage.setItem('diario_clase', JSON.stringify(this.diario()));
    });
  }

  // Filtrar el diario para mostrar solo lo de la fecha elegida
  diarioFiltrado = computed(() => {
    return this.diario().filter(item => {
      const fechaItem = new Date(item.fecha).toISOString().split('T')[0];
      return fechaItem === this.fechaSeleccionada();
    });
  });

  private cargarLocalStorage() {
    const datos = localStorage.getItem('diario_clase');
    return datos ? JSON.parse(datos) : [];
  }

  agregarEntrada() {
    if (!this.alumnoSeleccionado() || !this.trabajoRealizado()) return;

    // Creamos la fecha combinando el día elegido con la hora actual
    const ahora = new Date();
    const [year, month, day] = this.fechaSeleccionada().split('-').map(Number);
    const fechaRegistro = new Date(year, month - 1, day, ahora.getHours(), ahora.getMinutes());

    this.diario.update(actual => [{
      alumno: this.alumnoSeleccionado(),
      fecha: fechaRegistro,
      trabajo: this.trabajoRealizado(),
      progreso: this.progresoSeleccionado()
    }, ...actual]);

    this.trabajoRealizado.set('');
  }

  borrarEntrada(indexGlobal: any) {
    if (confirm('¿Seguro que quieres borrar esta nota?')) {
      this.diario.update(actual => actual.filter(item => item !== indexGlobal));
    }
  }
}