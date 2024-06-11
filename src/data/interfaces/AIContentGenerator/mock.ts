import { vi, Mocked } from 'vitest'
import { AIContentGenerator } from '.'

export const mockAIContentGeneratorImplementation =
  (): Mocked<AIContentGenerator> => ({
    generate: vi.fn(),
  })
