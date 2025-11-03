# 🎲 Ruleta de Notas 🎲

Una aplicación web de ruleta interactiva para simular la obtención de notas de cierre.

## ✨ Características

- 🎯 **16 segmentos**: 8 opciones de texto (notas) + 8 opciones con imágenes (emojis)
- 🎨 **Diseño moderno**: Interfaz colorida y atractiva
- 🎪 **Animaciones suaves**: Efectos de transición fade-in y animación de giro
- 📱 **Responsive**: Funciona en móviles y tablets
- ⚡ **Tecnología pura**: Solo HTML, CSS y JavaScript (sin frameworks)

## 🎮 Cómo Jugar

1. **Pantalla de Bienvenida**: Lee las instrucciones y haz clic en "Comenzar"
2. **Pantalla de Juego**: Haz clic en el botón "GIRAR" para girar la ruleta
3. **Resultado**: Descubre tu nota de cierre:
   - 🔴 **Notas 3-6**: Desaprobado (fondo rojo)
   - 🟢 **Notas 7-9**: Aprobado (fondo verde)
   - ⭐ **Nota 10**: Aprobado Sobresaliente (fondo verde espectacular con efecto especial)

## 🚀 Deploy en Vercel

1. Asegúrate de tener todos los archivos en tu repositorio
2. Ve a [Vercel](https://vercel.com)
3. Conecta tu repositorio
4. Configura el proyecto como sitio estático
5. ¡Deploy automático! 🎉

**Nota**: Para Vercel, asegúrate de que el archivo principal sea `index.html` en la raíz del proyecto.

## 🛠️ Desarrollo Local

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## 📦 Tecnologías

- HTML5
- CSS3 (con animaciones y gradientes)
- JavaScript Vanilla (ES6+)
- Canvas API para dibujar la ruleta

## 🎯 Mecánica del Juego

- **Ruleta circular** con 16 segmentos iguales
- **Animación de giro** con efecto de desaceleración suave
- **Sistema de colores**:
  - Rojo para notas desaprobadas (3-6)
  - Verde para notas aprobadas (7-9)
  - Verde dorado para nota sobresaliente (10)
- **Transiciones**: Efecto fade-in en todas las pantallas y resultados
- **Cambio de fondo**: El fondo cambia de color según el resultado

¡Disfruta girando la ruleta! 🎊
