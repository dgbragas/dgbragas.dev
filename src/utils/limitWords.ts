function limitWords(text: string, count: number): string {
  return text.split(' ').slice(0, count).join(' ') + '...';
}

export { limitWords };
