// Helper function to reverse a Buffer
export function reverseBuffer(buffer: Buffer): Buffer {
  return Buffer.from(buffer).reverse();
}

// Function to convert date-time string to UTC timestamp
export function dateTimeToTimestamp(dateTimeStr: string): number {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  // const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const date = new Date(year, month - 1, day, hours, minutes);
  const timestamp = Math.floor(date.getTime() / 1000);
  return timestamp;
}
