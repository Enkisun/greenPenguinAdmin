export const requiredField = value => {
  if (value) return undefined;
  return "Field is required";
}

export const isNumber = value => {
  if (parseFloat(Number(value)) !== NaN) return undefined;
  return "Value must be a number";
}

export const isEmpty = value => {
  if (value.trim() !== '') return undefined;
  return "The required value cannot be empty"
}