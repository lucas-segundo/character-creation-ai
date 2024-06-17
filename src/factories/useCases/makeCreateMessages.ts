import { CreateMessagesImpl } from '@/data/useCases/CreateMessages'
import {
  CreateMessagesUseCase,
} from '@/domain/useCases/CreateMessages'
import { LocalStorageMessagesCreater } from '@/infra/localStorage/MessagesCreater'

export const makeCreateMessagesUseCase = (): CreateMessagesUseCase => {
  const localStorageMessagesCreater = new LocalStorageMessagesCreater()

  return new CreateMessagesImpl(localStorageMessagesCreater)
}
