import { faker } from '@faker-js/faker';
import { Message } from '.';

export const mockMessage = (): Message => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  chatID: faker.string.uuid(),
  sender: faker.number.int({
    min: 0,
    max: 2,
  }) as Message['sender'],
});