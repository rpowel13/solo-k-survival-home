
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

export const formatChange = (change: number) => {
  const prefix = change > 0 ? '+' : '';
  return `${prefix}${change.toFixed(2)}`;
};

export const formatChangePercentage = (percentage: number) => {
  const prefix = percentage > 0 ? '+' : '';
  return `${prefix}${percentage.toFixed(2)}%`;
};

export const getChangeColor = (change: number) => {
  return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
};
