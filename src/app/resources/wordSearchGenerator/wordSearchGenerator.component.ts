import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-word-search-generator',
  imports: [],
  templateUrl: './wordSearchGenerator.component.html',
})
export class WordSearchGeneratorComponent {

  words = signal<string[]>([]);
  grid = signal<string[][]>([]);

  // Getter para usar con @for
  get gridValue() {
    return this.grid();
  }

  setWords(value: string) {
    const arr = value
      .split(',')
      .map((w) => w.trim().toUpperCase())
      .filter((w) => w.length > 0);
    this.words.set(arr.slice(0, 8)); // solo las primeras 3 palabras
  }

  generateGrid() {
    const size = 20;
    const grid: string[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => this.randomLetter())
    );

    this.words().forEach((word) => {
      if (word.length <= size) {
        this.placeWord(grid, word);
      }
      // Si la palabra es demasiado larga, se ignora
    });

    this.grid.set(grid);
  }

  placeWord(grid: string[][], word: string) {
    const size = grid.length;
    const directions = [
      { x: 1, y: 0 }, // horizontal
      { x: 0, y: 1 }, // vertical
      { x: 1, y: 1 }, // diagonal
    ];

    let placed = false;
    while (!placed) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * size);
      const startY = Math.floor(Math.random() * size);

      if (
        startX + dir.x * word.length > size ||
        startY + dir.y * word.length > size
      )
        continue;

      for (let i = 0; i < word.length; i++) {
        grid[startY + i * dir.y][startX + i * dir.x] = word[i];
      }
      placed = true;
    }
  }

  randomLetter(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }



}
