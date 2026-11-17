/**
 * Formats a numerical amount into Egyptian Pounds (EGP)
 * @param {number} amount
 * @returns {string} e.g. "45 EGP" or "1,250 EGP"
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 EGP';
  }
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  return `${formatted} EGP`;
};

export default formatPrice;
