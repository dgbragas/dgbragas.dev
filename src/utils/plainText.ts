function plainText(str: string) {
  return str.replace(/<[^>]+>/g, '');
}

export { plainText };
