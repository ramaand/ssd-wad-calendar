// Create an array for years from 2020 to 2023
export const years = Array.from({ length: 4 }, (_, index) => ({
  value: 2020 + index,
  label: (2020 + index).toString(),
}));

// Create an array for months from January to December
export const months = Array.from({ length: 12 }, (_, index) => ({
  value: index,
  label: new Date(0, index).toLocaleString('en-US', { month: 'long' }),
}));

// Create an array for days from Sunday to Saturday
export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
