# Reloj Lectivo con Herramientas de Gestión de Aula

Herramienta web integral para centros educativos que combina un reloj sincronizado con el horario lectivo y múltiples funcionalidades de gestión de aula. La pantalla cambia de color automáticamente (verde, amarillo, rojo o gris) según la franja horaria y muestra información en tiempo real. Puedes verlo en funcionamiento en [repositorioinformatico.github.io/reloj-lectivo](https://repositorioinformatico.github.io/reloj-lectivo).

## Características principales

### 🕐 Reloj y visualización de horarios
- **Hora sincronizada de Madrid** con precisión de segundos
- **Códigos de color automáticos**:
  - 🟢 Verde: Horas de clase (1ª a 6ª hora)
  - 🟡 Amarillo: Recreo (10:35 - 11:00)
  - 🔴 Rojo: Fin del horario lectivo (13:45 - 14:00)
  - ⚫ Gris: Horario no lectivo (fuera de horario y fines de semana)
- **Horario detallado** que muestra la hora actual y su nombre:
  - 1ª hora: 07:50 - 08:45
  - 2ª hora: 08:45 - 09:40
  - 3ª hora: 09:40 - 10:35
  - Recreo: 10:35 - 11:00
  - 4ª hora: 11:00 - 11:55
  - 5ª hora: 11:55 - 12:50
  - 6ª hora: 12:50 - 13:45
- **Fecha completa** con día de la semana y número de semana del año
- **Horas mundiales** de 5 ciudades: Pekín, Tokio, Nueva York, Los Ángeles y Londres

### ⏱️ Modos de visualización
- **Modo normal/minimal**: Click en cualquier parte de la pantalla para alternar entre vista completa y vista ampliada (ideal para proyectores)
- **Modo cuenta atrás automática** (botón esquina inferior derecha): Muestra tiempo restante hasta el próximo cambio de horario (siguiente hora, recreo o fin de jornada). Calcula correctamente cambios entre días y fines de semana
- **Modo cuenta atrás personalizada** (botón esquina superior derecha): Permite establecer una hora límite específica con opciones predefinidas del horario o una hora personalizada

### 📝 Herramientas de gestión de aula

#### 🚻 Control de ausencias del aula
- **Registro de salidas**: Botón para registrar cuando un alumno sale del aula (ej: al baño)
- **Temporizador en vivo**: Muestra el tiempo transcurrido desde que cada alumno salió
- **Panel visible**: Lista de alumnos ausentes siempre visible en pantalla
- **Registro automático**: Al marcar el regreso, se guarda automáticamente la duración de la ausencia

#### ⚠️ Registro de negativos/incidencias
- **Opciones predefinidas** de motivos comunes:
  - Conversación reiterada que interrumpe la clase
  - Comportamiento disruptivo hacia los compañeros
  - Falta de respeto al docente
  - Desafío a la autoridad del profesor
  - Uso inadecuado de dispositivos electrónicos
  - Se duerme en clase
- **Motivo personalizado**: Opción para escribir cualquier otro motivo
- **Registro con timestamp**: Cada negativo queda registrado con fecha y hora exacta

#### 📊 Registro diario descargable
- **Generación automática** de archivo de texto (.txt) con todos los eventos del día
- **Incluye**:
  - Todos los negativos registrados con hora, alumno y motivo
  - Todas las ausencias del aula con hora de salida, regreso y duración
  - Timestamp de inicio de sesión
- **Formato de archivo**: `YYYYMMDD-registro-clase.txt`
- **Accesible** desde los modales de control de baño y negativos

#### 📌 Nota de actividad
- **Texto personalizable** que aparece sobre la indicación de hora
- **Click en el mensaje de hora** para editar la nota
- **Persistente**: Se guarda automáticamente en localStorage
- **Ideal para**: Indicar "EXAMEN", "Presentaciones", "Trabajo en grupo", etc.
- **Opciones**: Guardar, borrar o cancelar cambios

## Uso rápido

### Instalación
1. Clona el repositorio:
   ```bash
   git clone git@github.com:repositorioinformatico/reloj-lectivo.git
   cd reloj-lectivo
   ```
2. Abre `index.html` en tu navegador preferido.
3. **No requiere instalación** ni servidor - funciona directamente desde el navegador.

### Controles básicos
- **Click en pantalla**: Alternar entre modo normal y modo minimal/ampliado
- **Botón inferior derecho**: Activar/desactivar cuenta atrás automática
- **Botón superior derecho**: Configurar cuenta atrás personalizada
- **Botón inferior izquierdo**: Registrar alumno ausente del aula
- **Botón superior izquierdo**: Registrar negativo/incidencia
- **Click en el mensaje de hora**: Editar nota de actividad

### Flujo de trabajo típico
1. **Al comenzar la clase**: Abre la aplicación en el navegador (se registra automáticamente el inicio de sesión)
2. **Durante la clase**:
   - Registra ausencias cuando los alumnos salgan del aula (botón inferior izquierdo)
   - Registra negativos cuando sea necesario (botón superior izquierdo)
   - Añade una nota de actividad si quieres que sea visible (click en mensaje de hora)
3. **Al finalizar la clase**: Descarga el registro diario desde cualquier modal (botón 📥)

## Personalización

### Ajustar horarios
Edita los horarios en `script.js`, función `updateExitStatus` (líneas 108-121):
```javascript
const hora1Start = 7 * 3600 + 50 * 60;  // 07:50:00
const hora1End = 8 * 3600 + 45 * 60;    // 08:45:00
// ... etc
```

También actualiza los horarios en la función `getNextScheduleChange` (líneas 224-233) para la cuenta atrás automática.

### Modificar colores y estilos
Edita `styles.css` para cambiar:
- Colores de fondo para cada estado (`.status-hora`, `.status-recreo`, `.status-fin`, `.status-no-lectivo`)
- Tamaños de fuente y tipografía
- Posición y estilo de los botones de control

### Personalizar motivos de negativos
Edita el HTML en `index.html` (líneas 86-93) para modificar los botones predefinidos:
```html
<button class="negative-preset-btn" data-reason="Tu motivo aquí">Texto del botón</button>
```

## Casos de uso y beneficios

### Para docentes
- **Gestión visual del tiempo**: Los alumnos ven claramente cuánto tiempo queda de clase o hasta el recreo
- **Registro de incidencias**: Documentación automática de comportamientos disruptivos con timestamp
- **Control de ausencias**: Seguimiento preciso del tiempo que los alumnos pasan fuera del aula
- **Comunicación clara**: La nota de actividad permite que todos sepan qué se está haciendo sin interrupciones
- **Evidencias documentales**: El registro diario descargable sirve como evidencia para tutorías o reuniones con familias

### Para centros educativos
- **Proyección en aula**: El modo minimal es ideal para proyectar en pantallas grandes
- **Sincronización horaria**: Todos los dispositivos muestran la misma hora oficial
- **Sin costes**: Gratuito, open source y sin necesidad de servidor
- **Privacidad**: Todos los datos se almacenan localmente en el navegador, sin envío a servidores externos
- **Personalizable**: Fácil de adaptar a los horarios específicos de cada centro

### Para alumnos
- **Transparencia**: Ven claramente el tiempo que pasan fuera del aula
- **Autorregulación**: El temporizador visible fomenta que regresen pronto
- **Claridad**: Saben en todo momento qué hora es y cuánto falta para cambios de actividad

## Requisitos técnicos
No necesita dependencias ni servidor: basta con un navegador moderno con soporte para:
- `Intl.DateTimeFormat` (para formateo de fechas y zonas horarias)
- `requestAnimationFrame` (para actualización suave del reloj)
- `localStorage` (para persistencia de la nota de actividad)

**Navegadores compatibles**: Chrome, Firefox, Safari, Edge (versiones modernas)

## Tecnologías utilizadas
- **HTML5**: Estructura semántica y modales
- **CSS3**: Estilos responsive y transiciones suaves
- **JavaScript vanilla**: Sin dependencias externas, código ligero y rápido

## Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
