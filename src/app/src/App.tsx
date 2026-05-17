import { useEffect, useState } from 'react'
import './App.css'

type Greeting = {
  message: string
}

export default function App() {
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.json() as Promise<Greeting>
      })
      .then((greeting) => setApiMessage(greeting.message))
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <main className="app">
      <h1>Hello from WaR App</h1>
      <p className="status">
        {error && <>API error: {error}</>}
        {!error && apiMessage === null && <>Loading API…</>}
        {!error && apiMessage !== null && <>API: {apiMessage}</>}
      </p>
    </main>
  )
}
