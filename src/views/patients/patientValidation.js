export const validatePatient = (data) => {
  let errors = {}

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!data.gender) {
    errors.gender = 'Gender is required'
  }

  if (!data.dob) {
    errors.dob = 'Date of birth is required'
  }

  return errors
}