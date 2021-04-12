export const convertStringToBoolean = (str: string) => {
  switch (str) {
    case `false`:
      return false;
    case `true`:
      return true;

    default:
      return Boolean(str);
  }
};

export const convertDataToIco = (data: string) => {
  return new Intl.DateTimeFormat(`ja-JP`, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(data));
};
