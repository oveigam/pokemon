export const logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message?: any, ...optionalParams: any[]) {
    if (import.meta.env.MODE === "development") {
      console.warn(message, ...optionalParams);
    }
  },
};
