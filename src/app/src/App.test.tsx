import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Hello from WaR API' }),
      }),
    )
  })

  it('should_render_local_hello_message', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Hello from WaR App' })).toBeInTheDocument()
  })
})
