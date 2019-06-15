import { useEffect, useState } from 'react'

let id = 0

function generateId () {
  return id++
}

export default function useId () {
  const [id, setId] = useState(null)
  useEffect(() => setId(generateId()), [])
  return id
}
