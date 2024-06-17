import { Message } from '@/domain/entities/Message'
import { mockMessage } from '@/domain/entities/Message/mock'
import {
  CreateMessagesUseCase,
  CreateMessagesParams,
} from '@/domain/useCases/CreateMessages'

export const makeCreateMessagesUseCase = (): CreateMessagesUseCase => {
  class CreateMessagesUseCaseMocked implements CreateMessagesUseCase {
    async create(params: CreateMessagesParams): Promise<Message[]> {
      console.log('Create params', params)

      const responseMessages = [mockMessage(), mockMessage()]

      return responseMessages
    }
  }

  return new CreateMessagesUseCaseMocked()
}
