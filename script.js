let isMinimalMode = false;
let isCountdownMode = false;
let bathroomStudents = []; // Array de {name, startTime}
let dailyLog = []; // Array para el registro diario completo

function toggleMode() {
    const body = document.body;

    if (isMinimalMode) {
        body.classList.remove('minimal-mode');
    } else {
        body.classList.add('minimal-mode');
    }

    isMinimalMode = !isMinimalMode;
}

function toggleCountdownMode(event) {
    event.stopPropagation(); // Evitar que se active toggleMode
    isCountdownMode = !isCountdownMode;

    const titleElement = document.getElementById('title');

    if (isCountdownMode) {
        titleElement.textContent = 'Tiempo hasta el próximo cambio:';
    } else {
        titleElement.textContent = 'La hora actual es:';
    }

    updateTime(); // Actualizar inmediatamente
}

function updateTime() {
    const now = new Date();

    // Hora actual de Madrid
    const madridTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Madrid"}));

    if (isCountdownMode) {
        // Modo countdown
        const countdownInfo = getNextScheduleChange(madridTime);
        const countdownString = formatCountdown(countdownInfo.seconds);

        document.getElementById('current-time').textContent = countdownString;

        // Actualizar el mensaje de estado para mostrar el próximo cambio
        const exitMessage = document.getElementById('exit-message');
        exitMessage.textContent = `Próximo: ${countdownInfo.nextChange}`;
    } else {
        // Modo reloj normal
        const timeString = madridTime.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        document.getElementById('current-time').textContent = timeString;

        // Actualizar estado normal
        updateExitStatus(madridTime);
    }

    // Fecha actual (se muestra en ambos modos)
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Madrid'
    };

    const dateString = madridTime.toLocaleDateString('es-ES', dateOptions);
    const weekNumber = getWeekNumber(madridTime);

    document.getElementById('current-date').textContent =
        `${dateString.charAt(0).toUpperCase() + dateString.slice(1)}, Semana ${weekNumber}`;

    // Actualizar horas mundiales
    updateWorldTimes(now);
}

function updateExitStatus(madridTime) {
    const container = document.getElementById('container');
    const exitMessage = document.getElementById('exit-message');
    const body = document.body;

    if (!container || !exitMessage) {
        return;
    }

    const secondsOfDay =
        madridTime.getHours() * 3600 + madridTime.getMinutes() * 60 + madridTime.getSeconds();

    // Definición de horarios de clases
    const hora1Start = 7 * 3600 + 50 * 60;         // 07:50:00
    const hora1End = 8 * 3600 + 45 * 60;           // 08:45:00
    const hora2Start = 8 * 3600 + 45 * 60;         // 08:45:00
    const hora2End = 9 * 3600 + 40 * 60;           // 09:40:00
    const hora3Start = 9 * 3600 + 40 * 60;         // 09:40:00
    const hora3End = 10 * 3600 + 35 * 60;          // 10:35:00
    const recreoStart = 10 * 3600 + 35 * 60;       // 10:35:00
    const recreoEnd = 11 * 3600;                   // 11:00:00
    const hora4Start = 11 * 3600;                  // 11:00:00
    const hora4End = 11 * 3600 + 55 * 60;          // 11:55:00
    const hora5Start = 11 * 3600 + 55 * 60;        // 11:55:00
    const hora5End = 12 * 3600 + 50 * 60;          // 12:50:00
    const hora6Start = 12 * 3600 + 50 * 60;        // 12:50:00
    const hora6End = 13 * 3600 + 45 * 60;          // 13:45:00

    const lectivoStart = 7 * 3600 + 54 * 60 + 59; // 07:54:59
    const lectivoEnd = 13 * 3600 + 44 * 60 + 59;   // 13:44:59
    const finStart = 13 * 3600 + 45 * 60;          // 13:45:00
    const finEnd = 14 * 3600;                      // 14:00:00

    container.classList.remove('status-lectivo', 'status-fin', 'status-no-lectivo', 'status-hora', 'status-recreo');
    body.classList.remove('status-lectivo', 'status-fin', 'status-no-lectivo', 'status-hora', 'status-recreo');

    const day = madridTime.getDay();
    const isWeekday = day >= 1 && day <= 5;

    if (!isWeekday) {
        container.classList.add('status-no-lectivo');
        body.classList.add('status-no-lectivo');
        exitMessage.textContent = 'Horario no lectivo';
        return;
    }

    // Verificar horas específicas y recreo
    if (secondsOfDay >= hora1Start && secondsOfDay < hora1End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '1ª hora (7:50 - 8:45)';
    } else if (secondsOfDay >= hora2Start && secondsOfDay < hora2End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '2ª hora (8:45 - 9:40)';
    } else if (secondsOfDay >= hora3Start && secondsOfDay < hora3End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '3ª hora (9:40 - 10:35)';
    } else if (secondsOfDay >= recreoStart && secondsOfDay < recreoEnd) {
        container.classList.add('status-recreo');
        body.classList.add('status-recreo');
        exitMessage.textContent = 'Recreo (10:35 - 11:00)';
    } else if (secondsOfDay >= hora4Start && secondsOfDay < hora4End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '4ª hora (11:00 - 11:55)';
    } else if (secondsOfDay >= hora5Start && secondsOfDay < hora5End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '5ª hora (11:55 - 12:50)';
    } else if (secondsOfDay >= hora6Start && secondsOfDay < hora6End) {
        container.classList.add('status-hora');
        body.classList.add('status-hora');
        exitMessage.textContent = '6ª hora (12:50 - 13:45)';
    } else if (secondsOfDay >= lectivoStart && secondsOfDay <= lectivoEnd) {
        container.classList.add('status-lectivo');
        body.classList.add('status-lectivo');
        exitMessage.textContent = 'Horario lectivo';
    } else if (secondsOfDay >= finStart && secondsOfDay <= finEnd) {
        container.classList.add('status-fin');
        body.classList.add('status-fin');
        exitMessage.textContent = 'Fin del horario lectivo. Puedes abandonar el centro.';
    } else {
        container.classList.add('status-no-lectivo');
        body.classList.add('status-no-lectivo');
        exitMessage.textContent = 'Horario no lectivo';
    }
}

function updateWorldTimes(baseTime) {
    const cities = [
        { name: 'Pekín', timezone: 'Asia/Shanghai' },
        { name: 'Tokio', timezone: 'Asia/Tokyo' },
        { name: 'Nueva York', timezone: 'America/New_York' },
        { name: 'Los Ángeles', timezone: 'America/Los_Angeles' },
        { name: 'Londres', timezone: 'Europe/London' }
    ];

    const cityElements = document.querySelectorAll('.city-time');

    cities.forEach((city, index) => {
        if (cityElements[index]) {
            const cityTime = new Date(baseTime.toLocaleString("en-US", {timeZone: city.timezone}));
            const timeString = cityTime.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            cityElements[index].querySelector('.city-hour').textContent = timeString;
        }
    });
}

function getWeekNumber(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
}

function getNextScheduleChange(madridTime) {
    const secondsOfDay =
        madridTime.getHours() * 3600 + madridTime.getMinutes() * 60 + madridTime.getSeconds();

    const day = madridTime.getDay();
    const isWeekday = day >= 1 && day <= 5;

    // Definición de horarios (igual que en updateExitStatus)
    const scheduleChanges = [
        { time: 7 * 3600 + 50 * 60, name: '1ª hora' },           // 07:50:00
        { time: 8 * 3600 + 45 * 60, name: '2ª hora' },           // 08:45:00
        { time: 9 * 3600 + 40 * 60, name: '3ª hora' },           // 09:40:00
        { time: 10 * 3600 + 35 * 60, name: 'Recreo' },           // 10:35:00
        { time: 11 * 3600, name: '4ª hora' },                    // 11:00:00
        { time: 11 * 3600 + 55 * 60, name: '5ª hora' },          // 11:55:00
        { time: 12 * 3600 + 50 * 60, name: '6ª hora' },          // 12:50:00
        { time: 13 * 3600 + 45 * 60, name: 'Fin del horario' }   // 13:45:00
    ];

    if (!isWeekday) {
        // Si es fin de semana, calcular hasta el próximo lunes a las 7:50
        const daysUntilMonday = day === 0 ? 1 : 8 - day; // Si es domingo (0), 1 día; si es sábado (6), 2 días
        const nextMonday = new Date(madridTime);
        nextMonday.setDate(madridTime.getDate() + daysUntilMonday);
        nextMonday.setHours(7, 50, 0, 0);

        const secondsUntilMonday = Math.floor((nextMonday - madridTime) / 1000);
        return {
            seconds: secondsUntilMonday,
            nextChange: 'Inicio del horario lectivo (Lunes 7:50)'
        };
    }

    // Buscar el próximo cambio en el día actual
    for (let i = 0; i < scheduleChanges.length; i++) {
        if (secondsOfDay < scheduleChanges[i].time) {
            const secondsUntilChange = scheduleChanges[i].time - secondsOfDay;
            return {
                seconds: secondsUntilChange,
                nextChange: scheduleChanges[i].name
            };
        }
    }

    // Si ya pasaron todos los cambios de hoy, calcular hasta mañana (o lunes si es viernes)
    const tomorrow = new Date(madridTime);
    const isLastDayOfWeek = day === 5; // Viernes

    if (isLastDayOfWeek) {
        // Hasta el lunes
        tomorrow.setDate(madridTime.getDate() + 3);
    } else {
        // Hasta mañana
        tomorrow.setDate(madridTime.getDate() + 1);
    }

    tomorrow.setHours(7, 50, 0, 0);
    const secondsUntilTomorrow = Math.floor((tomorrow - madridTime) / 1000);

    const nextDayName = isLastDayOfWeek ? 'Lunes' : 'Mañana';
    return {
        seconds: secondsUntilTomorrow,
        nextChange: `Inicio del horario lectivo (${nextDayName} 7:50)`
    };
}

function formatCountdown(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Formato HH:MM:SS
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Inicializar y actualizar cada segundo
updateTime();
setInterval(updateTime, 1000);


// Prevenir la selección de texto al hacer clic
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Añadir cursor pointer a todo el container
document.getElementById('container').style.cursor = 'pointer';

// ===== FUNCIONALIDAD DE CONTROL DE BAÑO =====

function toggleBathroomControl(event) {
    event.stopPropagation(); // Evitar que se active toggleMode
    showBathroomModal();
}

function showBathroomModal() {
    const modal = document.getElementById('bathroom-modal');
    const input = document.getElementById('bathroom-name-input');

    modal.style.display = 'flex';
    input.value = '';

    // Focus en el input después de un pequeño delay
    setTimeout(() => input.focus(), 100);
}

function hideBathroomModal() {
    const modal = document.getElementById('bathroom-modal');
    modal.style.display = 'none';
}

function addStudentToBathroom() {
    const input = document.getElementById('bathroom-name-input');
    const studentName = input.value.trim();

    if (studentName === '') {
        alert('Por favor, ingresa un nombre');
        return;
    }

    // Verificar si el alumno ya está registrado
    const existingStudent = bathroomStudents.find(s => s.name === studentName);
    if (existingStudent) {
        alert('Este alumno ya está registrado en el baño');
        return;
    }

    // Agregar nuevo alumno
    bathroomStudents.push({
        name: studentName,
        startTime: new Date()
    });

    updateBathroomDisplay();
    hideBathroomModal();
}

function removeStudentFromBathroom(studentName) {
    const confirmed = confirm(`¿Marcar el regreso de ${studentName}?`);

    if (confirmed) {
        // Encontrar el estudiante para registrar la ausencia
        const student = bathroomStudents.find(s => s.name === studentName);

        if (student) {
            const endTime = new Date();
            const duration = Math.floor((endTime - student.startTime) / 1000); // duración en segundos

            const startTimeString = student.startTime.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const endTimeString = endTime.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            // Registrar la ausencia en el log diario
            dailyLog.push({
                type: 'ausencia',
                timestamp: student.startTime,
                endTimestamp: endTime,
                studentName: studentName,
                startTimeString: startTimeString,
                endTimeString: endTimeString,
                duration: duration
            });
        }

        bathroomStudents = bathroomStudents.filter(s => s.name !== studentName);
        updateBathroomDisplay();
    }
}

function updateBathroomDisplay() {
    const display = document.getElementById('bathroom-display');

    if (bathroomStudents.length === 0) {
        display.classList.add('empty');
        display.innerHTML = '';
        return;
    }

    display.classList.remove('empty');

    // Actualizar el tiempo transcurrido para cada alumno
    const now = new Date();
    let html = '<div class="bathroom-title">Ausentes de clase</div>';

    bathroomStudents.forEach(student => {
        const elapsedSeconds = Math.floor((now - student.startTime) / 1000);
        const timeString = formatElapsedTime(elapsedSeconds);

        html += `
            <div class="bathroom-student" onclick="removeStudentFromBathroom('${student.name}')">
                <span class="bathroom-student-name">${student.name}</span>
                <span class="bathroom-student-time">${timeString}</span>
            </div>
        `;
    });

    display.innerHTML = html;
}

function formatElapsedTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${String(minutes).padStart(2, '0')}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
    } else {
        return `${seconds}s`;
    }
}

// Event listeners para el modal
document.getElementById('bathroom-confirm-btn').addEventListener('click', addStudentToBathroom);
document.getElementById('bathroom-cancel-btn').addEventListener('click', hideBathroomModal);

// Permitir confirmar con Enter
document.getElementById('bathroom-name-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addStudentToBathroom();
    }
});

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('bathroom-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        hideBathroomModal();
    }
});

// Actualizar la visualización de baño cada segundo
setInterval(updateBathroomDisplay, 1000);

// ===== FUNCIONALIDAD DE REGISTRO DE NEGATIVOS =====

function toggleNegativesControl(event) {
    event.stopPropagation(); // Evitar que se active toggleMode
    showNegativesModal();
}

function showNegativesModal() {
    const modal = document.getElementById('negatives-modal');
    const nameInput = document.getElementById('negatives-name-input');
    const reasonInput = document.getElementById('negatives-reason-input');

    modal.style.display = 'flex';
    nameInput.value = '';
    reasonInput.value = '';

    // Focus en el input después de un pequeño delay
    setTimeout(() => nameInput.focus(), 100);
}

function hideNegativesModal() {
    const modal = document.getElementById('negatives-modal');
    modal.style.display = 'none';
}

function addNegativeRecord() {
    const nameInput = document.getElementById('negatives-name-input');
    const reasonInput = document.getElementById('negatives-reason-input');
    const studentName = nameInput.value.trim();
    const reason = reasonInput.value.trim();

    if (studentName === '') {
        alert('Por favor, ingresa el nombre del alumno');
        return;
    }

    if (reason === '') {
        alert('Por favor, ingresa el motivo del negativo');
        return;
    }

    // Registrar el negativo en el log diario
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const dateString = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    dailyLog.push({
        type: 'negativo',
        timestamp: now,
        studentName: studentName,
        reason: reason,
        timeString: timeString,
        dateString: dateString
    });

    hideNegativesModal();

    // Feedback visual
    alert(`Negativo registrado para ${studentName}`);
}

// Event listeners para el modal de negativos
document.getElementById('negatives-confirm-btn').addEventListener('click', addNegativeRecord);
document.getElementById('negatives-cancel-btn').addEventListener('click', hideNegativesModal);

// Permitir confirmar con Enter en el campo de motivo
document.getElementById('negatives-reason-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        addNegativeRecord();
    }
});

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('negatives-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        hideNegativesModal();
    }
});

// ===== REGISTRO DIARIO Y DESCARGA =====

// Función para generar el contenido del registro diario
function generateDailyLogContent() {
    if (dailyLog.length === 0) {
        return null; // No hay nada que descargar
    }

    const now = new Date();
    const dateString = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    let content = `REGISTRO DIARIO DE CLASE\n`;
    content += `Fecha: ${dateString}\n`;
    content += `Generado: ${now.toLocaleTimeString('es-ES')}\n`;
    content += `${'='.repeat(60)}\n\n`;

    // Ordenar eventos por timestamp
    const sortedLog = [...dailyLog].sort((a, b) => a.timestamp - b.timestamp);

    sortedLog.forEach((entry, index) => {
        if (entry.type === 'negativo') {
            content += `[${entry.timeString}] NEGATIVO\n`;
            content += `  Alumno: ${entry.studentName}\n`;
            content += `  Motivo: ${entry.reason}\n`;
            content += `\n`;
        } else if (entry.type === 'ausencia') {
            const duration = formatDuration(entry.duration);
            content += `[${entry.startTimeString} - ${entry.endTimeString}] AUSENCIA DEL AULA\n`;
            content += `  Alumno: ${entry.studentName}\n`;
            content += `  Duración: ${duration}\n`;
            content += `\n`;
        }
    });

    content += `${'='.repeat(60)}\n`;
    content += `Total de registros: ${dailyLog.length}\n`;

    return content;
}

// Función para formatear duración
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Función para descargar el registro
function downloadDailyLog() {
    const content = generateDailyLogContent();

    if (!content) {
        return false; // No hay contenido para descargar
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const filename = `${year}${month}${day}-registro-clase.txt`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
}

// Evento para preguntar antes de cerrar la página
window.addEventListener('beforeunload', function(e) {
    if (dailyLog.length > 0) {
        // Mostrar confirmación del navegador
        e.preventDefault();
        e.returnValue = '';

        // Intentar descargar (algunos navegadores permiten esto)
        // Nota: La mayoría de navegadores modernos no permiten mostrar un mensaje personalizado
        // ni ejecutar descargas en beforeunload, pero preguntarán si quiere salir
        setTimeout(() => {
            if (confirm('¿Deseas descargar el registro de la clase antes de cerrar?')) {
                downloadDailyLog();
            }
        }, 0);
    }
});

// Agregar registro de inicio de sesión
window.addEventListener('load', function() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const dateString = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    dailyLog.push({
        type: 'sistema',
        timestamp: now,
        message: 'Inicio de sesión',
        timeString: timeString,
        dateString: dateString
    });
});
