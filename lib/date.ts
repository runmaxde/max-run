import moment from "moment"

export const getRelativeDate = (date: string) => {
  const now = moment()

  if (now.diff(moment(date), "days", true) < 8) return moment(date).fromNow()
  if (now.year() === moment(date).year()) return moment(date).format("MMM D")
  return moment(date).format("MMM D, YYYY")
}