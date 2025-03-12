const formattedDate = (date: string) => {
  const parsedDate = new Date(date)
  return new Intl.DateTimeFormat('de-DE').format(parsedDate)
}

export default formattedDate
