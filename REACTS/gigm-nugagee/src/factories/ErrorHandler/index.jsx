export const handleError = (error) => {
  let message;
  if (error.ShortDescription) {
    if ((error.Object === null) & (error.Object === false))
    message = error.ShortDescription;
  } else {
    message = error.ShortDescription;
  }
  return message;
};

