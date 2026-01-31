export const canTransition = (role, current, next) => {
  if (role === 'CLIENT' && next === 'CANCELLED') return true;
  if (role === 'VET' && next === 'CONFIRMED') return true;
  return false;
};
