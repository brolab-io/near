export const randomUniqueString = (length: number) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
