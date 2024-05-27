import { faker } from '@faker-js/faker';

export const mockMessage = () => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  userID: faker.string.uuid(),
  chatID: faker.string.uuid(),
});