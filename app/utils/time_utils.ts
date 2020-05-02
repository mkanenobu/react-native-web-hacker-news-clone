export const getDateFromEpochTime = (unixTime: number): Date => {
  const d = new Date(0);
  d.setUTCSeconds(unixTime);
  return d;
};
