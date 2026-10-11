const pause = (milliseconds = 400) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const copyEvent = (event) => (event ? { ...event } : null);

let records = [
  { id: '1', title: 'Building products people trust', speaker: 'Maya Chen', track: 'Product', time: '09:00', attendance: 'Open' },
  { id: '2', title: 'Design systems that make room to grow', speaker: 'Jordan Lee', track: 'Design', time: '09:45', attendance: 'Open' },
  { id: '3', title: 'A clearer mental model for React rendering', speaker: 'Alex Rivera', track: 'Engineering', time: '10:30', attendance: 'Waitlist' },
  { id: '4', title: 'Feedback loops for high-trust teams', speaker: 'Priya Nair', track: 'Leadership', time: '11:15', attendance: 'Open' },
  { id: '5', title: 'Modeling state without the guesswork', speaker: 'Sam Okafor', track: 'Engineering', time: '13:00', attendance: 'Open' },
];

let failNextUpdate = false;

export async function listEvents() {
  await pause(550);
  return records.map(copyEvent);
}

export async function getEvent(eventId) {
  await pause(400);
  const event = records.find((record) => record.id === String(eventId));
  return copyEvent(event);
}

export async function updateEvent(eventId, changes) {
  await pause(650);

  if (failNextUpdate) {
    failNextUpdate = false;
    throw new Error('The mock server rejected this update. Retry to submit it again.');
  }

  const eventIndex = records.findIndex((record) => record.id === String(eventId));
  if (eventIndex === -1) {
    throw new Error(`Event ${eventId} no longer exists.`);
  }

  records[eventIndex] = { ...records[eventIndex], ...changes };
  return copyEvent(records[eventIndex]);
}

export function simulateNextUpdateFailure() {
  failNextUpdate = true;
}
