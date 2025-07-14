export async function borrowBookAPI(bookId: string, userId: string) {
  const res = await fetch('/api/books/borrow', {
    method: 'POST',
    body: JSON.stringify({ bookId, userId }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

export async function returnBookAPI(bookId: string, userId: string) {
  const res = await fetch('/api/books/return', {
    method: 'POST',
    body: JSON.stringify({ bookId, userId }),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}
