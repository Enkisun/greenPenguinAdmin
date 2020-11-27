export const requiredField = value => {
  if (value) return undefined;
  return "Field is required";
}

export const isNumber = value => {
  if (parseFloat(Number(value)) !== NaN) return undefined;
  return "Value must be a number";
}