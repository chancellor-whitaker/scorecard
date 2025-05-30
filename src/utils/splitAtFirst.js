export function splitAtFirst(str, char) {
  const index = str.indexOf(char);
  if (index === -1) {
    return [str]; // Character not found, return original string in an array
  }
  return [str.substring(0, index), str.substring(index + 1)];
}
