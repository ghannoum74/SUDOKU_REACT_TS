export const validateInput = (value: string): boolean => {
  return (value !== "" && value.charCodeAt(0) < 49) || value.charCodeAt(0) > 57;
};
