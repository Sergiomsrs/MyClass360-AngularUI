import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-word-search-generator',
  imports: [],
  templateUrl: './wordSearchGenerator.component.html',
})

export class WordSearchGeneratorComponent {

  solutions = signal<{ word: string, startX: number, startY: number, direction: string }[]>([]);

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
    // Inicializa el grid con celdas vacías
    const grid: string[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => '')
    );
    const solutions: { word: string, startX: number, startY: number, direction: string }[] = [];

    this.words().forEach((word) => {
      if (word.length <= size) {
        const result = this.placeWord(grid, word);
        if (result) {
          solutions.push({ word, ...result });
        }
      }
      // Si la palabra es demasiado larga, se ignora
    });

    // Rellenar los huecos vacíos con letras aleatorias
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] === '') {
          grid[y][x] = this.randomLetter();
        }
      }
    }

    this.grid.set(grid);
    this.solutions.set(solutions);
  }

  placeWord(grid: string[][], word: string): { startX: number, startY: number, direction: string } | null {
    const size = grid.length;
    const directions = [
      { x: 1, y: 0, name: 'horizontal' },
      { x: 0, y: 1, name: 'vertical' },
      { x: 1, y: 1, name: 'diagonal' },
    ];

    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;
    while (!placed && attempts < maxAttempts) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * size);
      const startY = Math.floor(Math.random() * size);

      if (
        startX + dir.x * word.length > size ||
        startY + dir.y * word.length > size
      )
        continue;

      // Verificar que todas las celdas estén vacías o contengan la misma letra
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[startY + i * dir.y][startX + i * dir.x];
        if (cell !== '' && cell !== word[i] && cell !== undefined) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) continue;

      // Colocar la palabra
      for (let i = 0; i < word.length; i++) {
        grid[startY + i * dir.y][startX + i * dir.x] = word[i];
      }
      placed = true;
      return { startX, startY, direction: dir.name };
    }
    // Si no se pudo colocar tras maxAttempts, se ignora la palabra
    return null;
  }

  randomLetter(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }



}
