import { faker } from '@faker-js/faker'
import { mockMessage } from '../Message/mock'
import { Chat } from '.'

export const mockChat = (): Chat => ({
  id: faker.string.uuid(),
  messages: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
    mockMessage(),
  ),
})
