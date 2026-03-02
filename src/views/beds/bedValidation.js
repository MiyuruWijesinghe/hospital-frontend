export const validateBed = (data) => {
  let errors = {}

  if (!data.roomID) {
    errors.roomID = 'Room is required'
  }

  if (!data.bedNumber?.trim()) {
    errors.bedNumber = 'Bed number is required'
  }

  if (!data.status) {
    errors.status = 'Status is required'
  }

  return errors
}