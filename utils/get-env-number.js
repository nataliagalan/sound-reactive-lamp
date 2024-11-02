export function getEnvNumber(varName, defaultValue) {
  const value = Number(process.env[varName]);
  return isNaN(value) ? defaultValue : value;
}
