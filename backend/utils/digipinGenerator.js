// Example: PY = state code, PD = city code, 605001 = pincode, 001 = unique or building index
exports.generateDigiPINFromData = (city, state, postalCode, index = "001") => {
  const cityCode = city.substring(0, 2).toUpperCase();
  const stateCode = state.substring(0, 2).toUpperCase();
  return `${cityCode}${stateCode}-${stateCode}-${postalCode}-${index}`;
};
