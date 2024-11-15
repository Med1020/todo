<script>
export function formatDateTime() {
  const now = new Date()

  // Format date as dd/mm/yyyy
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = now.getFullYear()

  const formattedDate = `${day}/${month}/${year}`

  // Format time as hh:mm:ss
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  const formattedTime = `${hours}:${minutes}`

  return { date: formattedDate, time: formattedTime }
}
</script>
