import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-word-search-generator',
  imports: [],
  templateUrl: './wordSearchGenerator.component.html',
})

export class WordSearchGeneratorComponent {

  @ViewChild('sopaRef', { static: false }) sopaRef!: ElementRef;

  exportarPDF() {
    // Validar que hay una sopa generada
    if (this.grid().length === 0) {
      alert('Primero debes generar una sopa de letras');
      return;
    }

    // Reutilizar el mismo canvas que la imagen profesional
    const grid = this.grid();
    const words = this.words();

    // Configuraciones de diseño profesional (mismo que exportarImagen)
    const cellSize = 35;
    const borderWidth = 3;
    const fontSize = 18;
    const margin = 40;
    const titleHeight = 80;
    const wordsBoxHeight = 150;
    const decorativeMargin = 20;

    const gridWidth = grid[0].length * cellSize;
    const gridHeight = grid.length * cellSize;
    const canvasWidth = gridWidth + (margin * 2) + (decorativeMargin * 2);
    const canvasHeight = gridHeight + titleHeight + wordsBoxHeight + (margin * 3) + (decorativeMargin * 2);

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      alert('Error: No se pudo crear el contexto del canvas');
      return;
    }

    // Fondo con gradiente suave
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Marco decorativo principal
    ctx.strokeStyle = '#7a0785';
    ctx.lineWidth = 4;
    ctx.strokeRect(decorativeMargin, decorativeMargin, canvasWidth - (decorativeMargin * 2), canvasHeight - (decorativeMargin * 2));

    // Marco interior
    ctx.strokeStyle = '#b943c4';
    ctx.lineWidth = 2;
    ctx.strokeRect(decorativeMargin + 10, decorativeMargin + 10, canvasWidth - (decorativeMargin * 2) - 20, canvasHeight - (decorativeMargin * 2) - 20);

    // Título principal
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#630094';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SOPA DE LETRAS', canvasWidth / 2, decorativeMargin + margin + 25);

    // Subtítulo
    ctx.font = '18px Arial';
    ctx.fillStyle = '#630094';
    ctx.fillText('Encuentra las palabras ocultas', canvasWidth / 2, decorativeMargin + margin + 55);

    // Dibujar grilla (código simplificado)
    const gridStartX = margin + decorativeMargin;
    const gridStartY = decorativeMargin + titleHeight + margin;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(gridStartX - 5, gridStartY - 5, gridWidth + 10, gridHeight + 10);

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const cellX = gridStartX + (x * cellSize);
        const cellY = gridStartY + (y * cellSize);

        if ((x + y) % 2 === 0) {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(cellX, cellY, cellSize, cellSize);
        }

        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);

        const letter = grid[y][x];
        if (letter) {
          ctx.fillStyle = '#1f2937';
          ctx.fillText(letter, cellX + cellSize / 2, cellY + cellSize / 2);
        }
      }
    }

    // Caja de palabras
    const wordsBoxY = gridStartY + gridHeight + margin;
    const wordsBoxWidth = canvasWidth - (margin * 2) - (decorativeMargin * 2);

    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(margin + decorativeMargin, wordsBoxY, wordsBoxWidth, wordsBoxHeight - 20);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin + decorativeMargin, wordsBoxY, wordsBoxWidth, wordsBoxHeight - 20);

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#68009c';
    ctx.textAlign = 'center';
    ctx.fillText('PALABRAS A ENCONTRAR:', canvasWidth / 2, wordsBoxY + 25);

    // Palabras en columnas
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    const wordsPerColumn = Math.ceil(words.length / 3);
    const columnWidth = wordsBoxWidth / 3;

    words.forEach((word, index) => {
      const column = Math.floor(index / wordsPerColumn);
      const row = index % wordsPerColumn;
      const x = margin + decorativeMargin + 20 + (column * columnWidth);
      const y = wordsBoxY + 50 + (row * 25);

      ctx.fillStyle = '#68009c';
      ctx.fillRect(x, y - 3, 6, 6);
      ctx.fillStyle = '#374151';
      ctx.fillText(`${word}`, x + 15, y);
    });

    // Marca de agua
    ctx.font = '12px Arial';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText('MyClass360 - Generador de Sopa de Letras', canvasWidth - decorativeMargin - 10, canvasHeight - decorativeMargin - 25);

    // Generar PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = canvas.width / canvas.height;
    let pdfWidth = pageWidth - 40;
    let pdfHeight = pdfWidth / imgProps;

    if (pdfHeight > pageHeight - 40) {
      pdfHeight = pageHeight - 40;
      pdfWidth = pdfHeight * imgProps;
    }

    // Primera página: Sopa de letras
    pdf.addImage(imgData, 'PNG', (pageWidth - pdfWidth) / 2, 40, pdfWidth, pdfHeight);

    // Segunda página: Soluciones para el profesor
    pdf.addPage();
    this.agregarPaginaSoluciones(pdf, pageWidth, pageHeight);

    pdf.save('sopa-de-letras-con-soluciones.pdf');
  }

  agregarPaginaSoluciones(pdf: any, pageWidth: number, pageHeight: number) {
    const solutions = this.solutions();
    const grid = this.grid();
    const words = this.words();

    // Título de la página de soluciones
    pdf.setFontSize(24);
    pdf.setTextColor(30, 64, 175); // Azul
    pdf.text('SOLUCIONES - GUÍA DEL PROFESOR', pageWidth / 2, 60, { align: 'center' });

    // Subtítulo
    pdf.setFontSize(14);
    pdf.setTextColor(71, 85, 105); // Gris
    pdf.text('Esta página contiene las respuestas para el profesor', pageWidth / 2, 85, { align: 'center' });

    // Línea separadora
    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(2);
    pdf.line(40, 100, pageWidth - 40, 100);

    // Crear un canvas más pequeño para la grilla con soluciones
    const cellSize = 20;
    const gridWidth = grid[0].length * cellSize;
    const gridHeight = grid.length * cellSize;

    const solutionCanvas = document.createElement('canvas');
    solutionCanvas.width = gridWidth + 20;
    solutionCanvas.height = gridHeight + 20;
    const ctx = solutionCanvas.getContext('2d');

    if (ctx) {
      // Fondo blanco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, solutionCanvas.width, solutionCanvas.height);

      // Configurar texto
      ctx.font = `bold ${cellSize - 6}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;

      // Primero dibujar todas las letras en gris claro
      ctx.fillStyle = '#d1d5db';
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          const cellX = 10 + (x * cellSize);
          const cellY = 10 + (y * cellSize);

          ctx.strokeRect(cellX, cellY, cellSize, cellSize);
          const letter = grid[y][x];
          if (letter) {
            ctx.fillText(letter, cellX + cellSize / 2, cellY + cellSize / 2);
          }
        }
      }

      // Ahora resaltar las palabras encontradas
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

      solutions.forEach((solution, index) => {
        const color = colors[index % colors.length];
        ctx.fillStyle = color;

        // Resaltar cada letra de la palabra
        const { word, startX, startY, direction } = solution;
        let dx = 0, dy = 0;

        switch (direction) {
          case 'horizontal': dx = 1; dy = 0; break;
          case 'vertical': dx = 0; dy = 1; break;
          case 'diagonal': dx = 1; dy = 1; break;
        }

        for (let i = 0; i < word.length; i++) {
          const x = startX + (i * dx);
          const y = startY + (i * dy);
          const cellX = 10 + (x * cellSize);
          const cellY = 10 + (y * cellSize);

          // Círculo de fondo colorido
          ctx.beginPath();
          ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 2 - 2, 0, 2 * Math.PI);
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Letra en color
          ctx.fillText(word[i], cellX + cellSize / 2, cellY + cellSize / 2);
        }
      });

      // Agregar la grilla con soluciones al PDF
      const solutionImgData = solutionCanvas.toDataURL('image/png');
      const imgWidth = 300;
      const imgHeight = (gridHeight / gridWidth) * imgWidth;
      pdf.addImage(solutionImgData, 'PNG', (pageWidth - imgWidth) / 2, 130, imgWidth, imgHeight);
    }

    // Tabla de soluciones - Optimizada para una sola página
    let yPosition = 130 + (gridHeight / grid[0].length) * 300 + 30; // Reducir espacio

    pdf.setFontSize(14); // Reducir tamaño de título
    pdf.setTextColor(30, 64, 175);
    pdf.text('LISTA DE SOLUCIONES:', 40, yPosition);

    yPosition += 20; // Reducir espacio

    // Encabezados de tabla
    pdf.setFontSize(10); // Reducir tamaño
    pdf.setTextColor(0, 0, 0);
    pdf.text('PALABRA', 50, yPosition);
    pdf.text('POSICIÓN INICIAL', 200, yPosition);
    pdf.text('DIRECCIÓN', 350, yPosition);

    // Línea bajo encabezados
    pdf.setDrawColor(200, 200, 200);
    pdf.line(40, yPosition + 3, pageWidth - 40, yPosition + 3);

    yPosition += 15; // Reducir espacio

    // Datos de soluciones - Sin crear páginas extras
    pdf.setFontSize(9); // Reducir tamaño para que quepa más
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

    // Limitar a las primeras soluciones que quepan en la página
    const maxSolutions = Math.min(solutions.length, Math.floor((pageHeight - yPosition - 50) / 14));

    for (let i = 0; i < maxSolutions; i++) {
      const solution = solutions[i];
      const color = colors[i % colors.length];

      // Color de la palabra
      const rgbColor = this.hexToRgb(color);
      if (rgbColor) {
        pdf.setTextColor(rgbColor.r, rgbColor.g, rgbColor.b);
      }

      pdf.text(solution.word, 50, yPosition);

      pdf.setTextColor(0, 0, 0);
      pdf.text(`(${solution.startX + 1}, ${solution.startY + 1})`, 200, yPosition);
      pdf.text(solution.direction.toUpperCase(), 350, yPosition);

      yPosition += 14; // Reducir espacio entre líneas
    }

    // Nota al pie
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('MyClass360 - Generador de Sopa de Letras con Soluciones', pageWidth / 2, pageHeight - 30, { align: 'center' });
  }

  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  exportarImagen() {
    // Validar que hay una sopa generada
    if (this.grid().length === 0) {
      alert('Primero debes generar una sopa de letras');
      return;
    }
    this.generarImagenConCanvas();
  }

  generarImagenConCanvas() {
    const grid = this.grid();
    const words = this.words();

    // Configuraciones de diseño profesional
    const cellSize = 35;
    const borderWidth = 3;
    const fontSize = 18;
    const margin = 40;
    const titleHeight = 80;
    const wordsBoxHeight = 150;
    const decorativeMargin = 20;

    // Calcular dimensiones del canvas
    const gridWidth = grid[0].length * cellSize;
    const gridHeight = grid.length * cellSize;
    const canvasWidth = gridWidth + (margin * 2) + (decorativeMargin * 2);
    const canvasHeight = gridHeight + titleHeight + wordsBoxHeight + (margin * 3) + (decorativeMargin * 2);

    // Crear canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      alert('Error: No se pudo crear el contexto del canvas');
      return;
    }

    // Fondo con gradiente suave
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Marco decorativo principal
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.strokeRect(decorativeMargin, decorativeMargin, canvasWidth - (decorativeMargin * 2), canvasHeight - (decorativeMargin * 2));

    // Marco interior
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(decorativeMargin + 10, decorativeMargin + 10, canvasWidth - (decorativeMargin * 2) - 20, canvasHeight - (decorativeMargin * 2) - 20);

    // Título principal
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#1e40af';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SOPA DE LETRAS', canvasWidth / 2, decorativeMargin + margin + 25);

    // Subtítulo
    ctx.font = '18px Arial';
    ctx.fillStyle = '#475569';
    ctx.fillText('Encuentra las palabras ocultas en la grilla', canvasWidth / 2, decorativeMargin + margin + 55);

    // Posición inicial de la grilla
    const gridStartX = margin + decorativeMargin;
    const gridStartY = decorativeMargin + titleHeight + margin;

    // Fondo de la grilla con sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(gridStartX + 3, gridStartY + 3, gridWidth + 10, gridHeight + 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(gridStartX - 5, gridStartY - 5, gridWidth + 10, gridHeight + 10);

    // Configurar para dibujar la grilla
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1f2937';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;

    // Dibujar la grilla y las letras
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const cellX = gridStartX + (x * cellSize);
        const cellY = gridStartY + (y * cellSize);

        // Fondo alternado para mejor legibilidad
        if ((x + y) % 2 === 0) {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(cellX, cellY, cellSize, cellSize);
        }

        // Dibujar el borde de la celda
        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);

        // Dibujar la letra
        const letter = grid[y][x];
        if (letter) {
          ctx.fillStyle = '#1f2937';
          ctx.fillText(
            letter,
            cellX + cellSize / 2,
            cellY + cellSize / 2
          );
        }
      }
    }

    // Caja de palabras a buscar
    const wordsBoxY = gridStartY + gridHeight + margin;
    const wordsBoxWidth = canvasWidth - (margin * 2) - (decorativeMargin * 2);

    // Fondo de la caja de palabras
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(margin + decorativeMargin, wordsBoxY, wordsBoxWidth, wordsBoxHeight - 20);

    // Marco de la caja de palabras
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin + decorativeMargin, wordsBoxY, wordsBoxWidth, wordsBoxHeight - 20);

    // Título de las palabras
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#1e40af';
    ctx.textAlign = 'center';
    ctx.fillText('PALABRAS A ENCONTRAR:', canvasWidth / 2, wordsBoxY + 25);

    // Dibujar las palabras en columnas
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'left';

    const wordsPerColumn = Math.ceil(words.length / 3);
    const columnWidth = wordsBoxWidth / 3;

    words.forEach((word, index) => {
      const column = Math.floor(index / wordsPerColumn);
      const row = index % wordsPerColumn;
      const x = margin + decorativeMargin + 20 + (column * columnWidth);
      const y = wordsBoxY + 50 + (row * 25);

      // Bullet point
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, y - 3, 6, 6);

      // Palabra
      ctx.fillStyle = '#374151';
      ctx.fillText(`${word}`, x + 15, y);
    });

    // Información del profesor en la esquina
    ctx.font = '12px Arial';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText('MyClass360 - Generador de Sopa de Letras', canvasWidth - decorativeMargin - 10, canvasHeight - decorativeMargin - 25);

    // Convertir a blob y descargar
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sopa-de-letras-profesional.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert('Error al crear la imagen');
      }
    }, 'image/png');
  } solutions = signal<{ word: string, startX: number, startY: number, direction: string }[]>([]);

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
    this.words.set(arr.slice(0, 6));
  }

  generateGrid() {
    const size = 12;
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
