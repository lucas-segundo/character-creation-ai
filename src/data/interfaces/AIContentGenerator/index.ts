export namespace AIContentGenerator {
  export interface Params {
    texts: string[]
  }

  export interface Response {
    texts: string[]
  }

  export interface Implementation {
    generate: (params: Params) => Promise<Response>
  }
}
