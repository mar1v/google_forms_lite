export function isRequired(val: string | string[] | undefined) {
  if (Array.isArray(val)) return val.length > 0 && val[0] !== "";
  return !!val;
}
