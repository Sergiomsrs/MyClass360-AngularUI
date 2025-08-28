import { Component, inject, signal } from '@angular/core';
import { ArasaacServiceService } from '../../classroom/services/arasaacService.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { SearchInputComponent } from "../../classroom/components/search-input/search-input.component";

@Component({
  selector: 'pictograms-secuence',
  imports: [SearchInputComponent],
  templateUrl: './pictogramsSecuence.component.html',
})
export class PictogramsSecuenceComponent {

  arasaacService = inject(ArasaacServiceService);

  query = signal('')

  selectedIds = signal<number[]>([]);

  arasaacResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.arasaacService.searchByKeyWords(request.query)
    }
  })

  toggleSelection(id: number) {
    const current = this.selectedIds();
    if (current.includes(id)) {
      this.selectedIds.set(current.filter(x => x !== id));
    } else {
      this.selectedIds.set([...current, id]);
    }
  }

  isSelected(id: number) {
    return this.selectedIds().includes(id);
  }





}
