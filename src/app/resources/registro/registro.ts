import { Component, signal, computed, effect } from '@angular/core';
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
  estados = ['Iniciado', 'En proceso', 'Completado'];

  // Signals del formulario y filtros
  alumnoSeleccionado = signal('');
  trabajoRealizado = signal('');
  progresoSeleccionado = signal('Iniciado');
  fechaSeleccionada = signal(new Date().toISOString().split('T')[0]);
  filtroAlumno = signal('');

  // Fuente de datos única
  diario = signal<any[]>(this.cargarLocalStorage());

  constructor() {
    effect(() => {
      localStorage.setItem('diario_clase', JSON.stringify(this.diario()));
    });
  }

  // Filtrado reactivo por día
  diarioFiltrado = computed(() => {
    return this.diario().filter(item => {
      const fechaDoc = new Date(item.fecha).toISOString().split('T')[0];
      return fechaDoc === this.fechaSeleccionada();
    });
  });

  // Filtrado reactivo por alumno (Expediente)
  historialPorAlumno = computed(() => {
    const busqueda = this.filtroAlumno();
    if (!busqueda) return [];
    return this.diario().filter(item => item.alumno === busqueda);
  });

  private cargarLocalStorage() {
    const datos = localStorage.getItem('diario_clase');
    return datos ? JSON.parse(datos) : [];
  }

  agregarEntrada() {
    if (!this.alumnoSeleccionado() || !this.trabajoRealizado()) return;

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

  // Permite editar el progreso desde cualquier vista
  cambiarProgreso(item: any, nuevoEstado: string) {
    this.diario.update(actual => {
      const index = actual.findIndex(i => i === item);
      if (index !== -1) {
        actual[index].progreso = nuevoEstado;
      }
      return [...actual];
    });
  }

  borrarEntrada(itemABorrar: any) {
    if (confirm('¿Seguro que quieres borrar esta nota?')) {
      this.diario.update(actual => actual.filter(item => item !== itemABorrar));
    }
  }
}