export const trimAndAddEllipsis = (str) => {
  const words = str.split(/\s+/);
  if (words.length > 9) {
    const trimmedWords = words.slice(0, 10);
    const trimmedString = trimmedWords.join(' ');
    return trimmedString + '...';
  }
  return str;
};

export function formatPrice(price) {
  // Get the user's locale from the browser
  const userLocale = navigator.language || 'en-US';

  // Format the price value using the user's locale and currency
  const formattedPrice = Number(price).toLocaleString(userLocale, {
    style: 'currency',
    currency: 'INR',
  });

  return formattedPrice;
}

export function calculate(value) {
  if (Number(value * 80) / 50 >= 100) return 100;
  else return Math.floor(Number(value * 80) / 50);
}