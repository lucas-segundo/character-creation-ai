export interface AIContentGeneratorParams {
  texts: string[]
}

export interface AIContentGeneratorResult {
  texts: string[]
}

export interface AIContentGenerator {
  generate: (
    params: AIContentGeneratorParams,
  ) => Promise<AIContentGeneratorResult>
}
