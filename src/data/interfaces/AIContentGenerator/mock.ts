import { vi, Mocked } from 'vitest'
import { AIContentGenerator } from '.'

export const mockAIContentGeneratorImplementation =
  (): Mocked<AIContentGenerator.Implementation> => ({
    generate: vi.fn(),
  })
