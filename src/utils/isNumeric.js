export const isNumeric = (value) => {
  const fn1 = (string) => !Number.isNaN(string);

  const fn2 = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

  const fn3 = (string) => !Number.isNaN(Number(string));

  const fn4 = (string) => Number.isFinite(+string);

  const fn5 = (string) => string == Number.parseFloat(string);

  const conditions = [fn1, fn2, fn3, fn4, fn5].map((fn) => fn(value));

  return !conditions.some((condition) => !condition);
};
