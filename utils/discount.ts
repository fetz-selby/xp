const calculateDiscountPercentage = (
  initialPrice: number,
  currentPrice: number
) => {
  if (initialPrice <= 0 || currentPrice < 0 || currentPrice > initialPrice) {
    throw new Error('Invalid prices provided')
  }
  const discountPercentage =
    ((initialPrice - currentPrice) / initialPrice) * 100
  return Math.ceil(discountPercentage)
}

export default calculateDiscountPercentage
