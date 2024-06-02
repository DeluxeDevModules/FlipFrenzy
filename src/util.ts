export function commaify(n: number) {
  const s = n.toString();
  if (s.length <= 4) {
    return s;
  } else {
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
