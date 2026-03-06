export const validateAdmission = (data) => {
  let errors = {}

  if (!data.patientId) {
    errors.patientId = 'Patient is required'
  }

  if (!data.bedId) {
    errors.bedId = 'Bed is required'
  }

  if (!data.reason) {
    errors.reason = 'Reason is required'
  }

  return errors
}