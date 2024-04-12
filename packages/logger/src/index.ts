/** Logs something in the console. */
export const logInfo = (...args: any[]) =>
  console.log("[" + new Date().toISOString() + "]", ...args);

export const double = (x: number) => x * 2;
