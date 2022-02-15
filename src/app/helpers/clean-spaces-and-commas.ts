export const cleanWhiteSpacesAndCommas = (str: string) =>
  str.split(new RegExp(/\s*,*/)).join('');
