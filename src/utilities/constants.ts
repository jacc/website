export const group = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 11,
      damping: 80,
      stiffness: 500,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 1,
      damping: 30,
      stiffness: 120,
    },
  },
};

export function humanizeList(list: string[]): string {
  if (list.length <= 1) {
    return list.join("");
  }
  const allButLast = list.slice(0, -1).join(", ");
  const lastItem = list[list.length - 1];
  return `${allButLast} and ${lastItem}`;
}
