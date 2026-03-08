# 🚀 MyClass360

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.8+-38B2AC?style=for-the-badge&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.0+-551A8B?style=for-the-badge&logo=daisyui)

---

## 📝 Descripción del Proyecto
**MyClass360** es una plataforma web educativa diseñada para modernizar la interacción en el aula. El proyecto centraliza herramientas de gestión y dinámicas de aprendizaje gamificado en una interfaz única, rápida y altamente visual.

Actualmente, el ecosistema incluye:
* **Módulo de Registro:** Sistema fluido para la gestión de usuarios o alumnos.
* **Zona de Juegos:** Incluye una **Sopa de Letras** interactiva diseñada para reforzar el vocabulario y la agilidad mental.
* **Diseño Responsive:** Optimizado específicamente para dispositivos móviles mediante una navegación intuitiva y componentes adaptables.

---

## 🛠️ Stack Tecnológico

* **Core:** [Angular 19](https://angular.dev/) (Uso de Standalone Components y Signals).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS).
* **Componentes:** [DaisyUI](https://daisyui.com/) (Plugins de componentes basados en Tailwind).
* **Iconografía:** HeroIcons (SVG).

---

## 🚀 Guía de Inicio Rápido

### Requisitos previos
* Node.js (Versión LTS recomendada).
* Angular CLI instalado globalmente: `npm install -g @angular/cli`.

### Instalación
1.  Clona el repositorio.
2.  Instala todas las dependencias:
    ```bash
    npm install
    ```

### Comandos de Ejecución
| Tarea | Comando | Descripción |
| :--- | :--- | :--- |
| **Desarrollo** | `ng serve -o` | Levanta el servidor local con recarga en vivo y abre el navegador. |
| **Despliegue** | `npm run deploy` | Ejecuta el script automatizado de subida al servidor. Incluye la build. |

---


## 🎨 Personalización Visual

El proyecto utiliza el sistema de temas de **DaisyUI**. Si deseas cambiar el esquema de colores global (por ejemplo, pasar de modo oscuro a claro), edita la propiedad `themes` en `tailwind.config.js`:

```javascript
daisyui: {
  themes: ["dark", "cupcake", "emerald"], // El primer tema es el predeterminado
},