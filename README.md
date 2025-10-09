# Reloj Lectivo

Reloj web para centros educativos que muestra la hora oficial de Madrid y pinta toda la pantalla en verde, rojo o gris según si es horario lectivo, salida del centro o tiempo no lectivo. Puedes verlo en funcionamiento en [repositorioinformatico.github.io/reloj-lectivo](https://repositorioinformatico.github.io/reloj-lectivo).

## Características
- Mensajes y colores automáticos en función del día de la semana y la franja horaria.
- Fondo a pantalla completa sincronizado con el estado (lectivo, fin, no lectivo).
- Información adicional de fecha formateada y horas en otras ciudades.
- Modo ampliado con un clic para proyectores o pantallas grandes.

## Uso rápido
1. Clona el repositorio:
   ```bash
   git clone git@github.com:repositorioinformatico/reloj-lectivo.git
   cd reloj-lectivo
   ```
2. Abre `index.html` en tu navegador preferido.
3. Haz clic en cualquier punto para alternar entre el modo normal y el modo ampliado.

## Personalización
- Ajusta los horarios y textos en `script.js` (`updateExitStatus`).
- Modifica colores y tamaños tipográficos en `styles.css`.

## Requisitos
No necesita dependencias ni servidor: basta con un navegador moderno con soporte para `Intl.DateTimeFormat` y `requestAnimationFrame`.

## Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
