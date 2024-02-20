import { render } from '@testing-library/react'
import { test } from 'vitest'

import HomePage from '../app/(index)/page'

test('renders an async component', () => {
  render(() => HomePage())
})
