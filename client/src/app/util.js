export const trimAndAddEllipsis = (str) => {
  const words = str.split(/\s+/);
  if (words.length > 9) {
    const trimmedWords = words.slice(0, 10);
    const trimmedString = trimmedWords.join(' ');
    return trimmedString + '...';
  }
  return str;
};
