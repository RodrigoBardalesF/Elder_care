import { useState, useEffect } from 'react'
import './Calendar.css'
import MyCalendar from './Calendar2';

// Eventos predefinidos (puedes moverlos a un archivo aparte)
const EVENTS = {
  '2026-05-10': ['Reunión con cliente', 'Code review'],
  '2026-05-15': ['Cumpleaños abuela'],
  '2026-05-20': ['Entrega de reporte'],
  '2026-05-25': ['Cita médica']
};

function Calendar() {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState(null); // Día seleccionado

  const year = current.getFullYear();
  const month = current.getMonth();

  // Calcular días del mes
  const firstDay = new Date(year, month, 1).getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Obtener eventos de un día específico
  const getEvents = (day) => {
    if (!day) return [];
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return EVENTS[key] || [];
  };

  // Seleccionar un día
  const selectDay = (day) => {
    if (!day) return;
    setSelected(new Date(year, month, day));
  };

  // Verificar si un día está seleccionado
  const isSelected = (day) => {
    return selected &&
      day === selected.getDate() &&
      month === selected.getMonth() &&
      year === selected.getFullYear();
  };

  // Verificar si es hoy
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
  };

  // Construir la cuadrícula del calendario
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  // Dividir en semanas (para tabla)
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthName = current.toLocaleString('es-MX', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrent(new Date(year, month - 1, 1))}>◀ Anterior</button>
        <h2>{monthName}</h2>
        <button onClick={() => setCurrent(new Date(year, month + 1, 1))}>Siguiente ▶</button>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIdx) => (
            <tr key={weekIdx}>
              {week.map((day, dayIdx) => {
                const eventsToday = getEvents(day);
                return (
                  <td
                    key={dayIdx}
                    className={`
                      calendar-cell 
                      ${day ? 'has-day' : 'empty'}
                      ${isSelected(day) ? 'selected' : ''}
                      ${isToday(day) ? 'today' : ''}
                    `}
                    onClick={() => selectDay(day)}
                  >
                    {day && (
                      <>
                        <span className="day-number">{day}</span>
                        <div className="events-list">
                          {eventsToday.map((event, idx) => (
                            <div key={idx} className="event-badge">{event}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="selected-info">
          <h3>Fecha seleccionada: {selected.toLocaleDateString('es-MX')}</h3>
          <p>Eventos: {getEvents(selected.getDate()).length > 0 
            ? getEvents(selected.getDate()).join(', ') 
            : 'No hay eventos programados'}
          </p>
        </div>
      )}


    </div>


  );
}

export default Calendar;

