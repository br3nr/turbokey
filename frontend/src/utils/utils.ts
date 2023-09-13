export function sleep(ms: number, callback: () => void) {
  setTimeout(callback, ms);
}
