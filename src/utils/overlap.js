export const isOverlapping = (a, b) => {
  return (
    new Date(b.startTime) < new Date(a.endTime) &&
    new Date(b.endTime) > new Date(a.startTime)
  );
};
