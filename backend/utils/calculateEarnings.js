exports.calculateEarnings = (baseRate, deliveries, bonusRate = 0) => {
  const amount = baseRate * deliveries;
  const bonus = deliveries >= 10 ? bonusRate * deliveries : 0;
  return {
    amount,
    bonus,
    netPayout: amount + bonus,
  };
};
