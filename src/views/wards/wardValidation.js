export const validateWard = (data) => {
  let errors = {}

  if (!data.name?.trim()) {
    errors.name = 'Ward name is required'
  }

  if (!data.floor) {
    errors.floor = 'Floor is required'
  } else if (parseInt(data.floor) <= 0) {
    errors.floor = 'Floor must be greater than 0'
  }

  return errors
}