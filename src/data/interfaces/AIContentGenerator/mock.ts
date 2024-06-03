import { vi } from 'vitest'
import { AIContentGenerator } from '.'

export const mockAIContentGeneratorImplementation =
  (): AIContentGenerator.Implementation => ({
    generate: vi.fn(),
  })
