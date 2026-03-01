export const validateRoom = (data) => {
  let errors = {}

  if (!data.wardID) {
    errors.wardID = 'Ward is required'
  }

  if (!data.roomNumber?.trim()) {
    errors.roomNumber = 'Room number is required'
  }

  if (!data.roomType) {
    errors.roomType = 'Room type is required'
  }

  return errors
}