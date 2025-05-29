export const generateColDefs = (rows) =>
  [
    ...new Set(
      (Array.isArray(rows) ? rows : []).map((row) => Object.keys(row)).flat()
    ),
  ].map((field) => ({ field }));
