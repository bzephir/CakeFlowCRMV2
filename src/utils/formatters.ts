// Utility functions for formatting dates, times, currency, etc.

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Format a time string from 24-hour to 12-hour format
 * @param timeString - Time string in 24-hour format (HH:MM)
 * @returns Formatted time string (e.g., "2:00 PM")
 */
export const formatTime = (timeString: string) => {
  if (!timeString) return 'EMPTY_TIME_DEBUG';
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `DEBUG_TIME_${hour12}:${minutes} ${ampm}`;
};

/**
 * Format a number as currency
 * @param amount - Number to format
 * @returns Formatted currency string (e.g., "$450.00")
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};