import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SendMessageInput } from '.'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('SendMessageInput', () => {
  it('should call onSend with right params', async () => {
    const mockedOnSend = vi.fn()
    render(<SendMessageInput onSend={mockedOnSend} />)

    const user = userEvent.setup()
    const text = faker.lorem.sentence()

    await user.type(screen.getByTestId('message-input'), text)
    await user.click(screen.getByTestId('send-button'))

    expect(mockedOnSend).toBeCalledWith({ text })
  })

  it('should clear input after send', async () => {
    const mockedOnSend = vi.fn()
    render(<SendMessageInput onSend={mockedOnSend} />)

    const user = userEvent.setup()
    const text = faker.lorem.sentence()

    await user.type(screen.getByTestId('message-input'), text)
    await user.click(screen.getByTestId('send-button'))

    expect(screen.getByTestId('message-input')).toHaveValue('')
  })
})
