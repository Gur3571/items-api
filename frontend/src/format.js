const formatter = new Intl.DateTimeFormat('en-CA', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

/**
 * Formats an ISO string into a localized Canadian date and time string.
 */

export function formatTimestamp(isoString) {
  return formatter.format(new Date(isoString))
}