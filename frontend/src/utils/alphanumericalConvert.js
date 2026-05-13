export const alphaToNum = (alpha) => {
  const charCode = alpha.toUpperCase().charCodeAt(0);
  return charCode - 65; // 65 is the char code for 'A'
};
