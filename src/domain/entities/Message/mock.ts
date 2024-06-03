import { faker } from '@faker-js/faker'
import { Message } from '.'

interface Params {
  sender?: Message['sender']
}

export const mockMessage = (params?: Params): Message => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentences(),
  chatID: faker.string.uuid(),
  sender:
    params?.sender ||
    (faker.number.int({
      min: 0,
      max: 2,
    }) as Message['sender']),
})
