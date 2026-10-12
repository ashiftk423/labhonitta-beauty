/** True when `i` is the active slide or one step either side of it (wrapping). */
export function isNear(i: number, active: number, count: number) {
  if (count <= 3) return true;
  const d = Math.abs(i - active);
  return d <= 1 || d === count - 1;
}
