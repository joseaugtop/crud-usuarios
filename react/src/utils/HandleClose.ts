export const HandleClose = (event: any, onClose: () => void) => {
  if (event.target.id === "wrapper") onClose()
}
