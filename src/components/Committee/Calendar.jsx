import React from 'react'
import AppointmentSystem from 'react-appointment-system';

export default function Calendar() {
const parameters = {
    durationOptions: [15, 30, 45, 60, 90],
    startTime: 8,
    endTime: 16,
    days: 7,
    futureWeeks: 2,
    exceptions: [
      {
        days: [6,7],
        start: 10,
        end: 16
      },
      {
        date: new Date(2022, 9, 31),
        start: 12,
        end: 20
      },
    ]
  };

  const url = "your-server-url";

  const code = "your-custom-code1234";

  return (
    <div>
        <AppointmentSystem parameters={parameters} url={url} code={code}/>
    </div>
  );
}
