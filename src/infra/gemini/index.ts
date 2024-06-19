import { ChatSession, Content, GoogleGenerativeAI } from '@google/generative-ai'

interface Params {
  apiKey: string
  systemInstruction: string
  history?: Content[]
}

export const startGiminiChat = ({
  apiKey,
  systemInstruction,
  history,
}: Params): ChatSession => {
  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
  })

  const chat = model.startChat({
    history,
  })

  return chat
}
