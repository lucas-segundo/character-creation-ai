import {
  MessagesCreater,
  MessagesCreaterParams,
} from '@/data/interfaces/MessagesCreater'
import { Message } from '@/domain/entities/Message'

export class LocalStorageMessagesCreater implements MessagesCreater {
  create(params: MessagesCreaterParams): Promise<Message[]> {
    return new Promise((resolve) => {
      resolve(this.createMessages(params))
    })
  }

  private createMessages(params: MessagesCreaterParams) {
    const messagesWithID = params.messages.map((message) => ({
      ...message,
      id: Date.now().toString(),
    }))

    const currentMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    const newMessages = [...currentMessages, ...messagesWithID]
    localStorage.setItem('messages', JSON.stringify(newMessages))

    return messagesWithID
  }
}
