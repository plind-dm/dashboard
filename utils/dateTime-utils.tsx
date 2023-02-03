export const formatDate = (timestamp: number): string => {
  const dateTime = new Date(timestamp * 1000)
  return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString()
}
