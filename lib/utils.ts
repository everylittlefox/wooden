export const toHHMMSS = (secs: number) => {
  const hours = Math.floor(secs / 3600)
  const minutes = Math.floor((secs - hours * 3600) / 60)
  const seconds = secs - hours * 3600 - minutes * 60
  const formatted = []

  if (hours < 10 && hours > 0) formatted.push('0' + hours)
  else formatted.push(hours)
  if (minutes < 10) formatted.push('0' + minutes)
  else formatted.push(minutes)
  if (seconds < 10) formatted.push('0' + seconds)
  else formatted.push(seconds)

  return formatted.filter(Boolean).join(':')
}
