export function toTitleCase(value: string): string {
  return value.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}
