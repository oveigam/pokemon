import { isAfter, isBefore, isEqual, isValid } from "date-fns";

export const isValidDate = (val: unknown): val is Date => isValid(val);

export const isBetweenDates = (value: Date, [min, max]: [Date, Date]) => {
  return (
    (isAfter(value, min) || isEqual(value, min)) && (isBefore(value, max) || isEqual(value, max))
  );
};
