import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MessageContent } from '.'
import { mockMessage } from '@/domain/entities/Message/mock'
import { Message, MessageSenderEnum } from '@/domain/entities/Message'

describe('MessageContent', () => {
  it('should render with bot icon', async () => {
    const message: Message = {...mockMessage(), sender: MessageSenderEnum.BOT}
    render(<MessageContent message={message} />)

    expect(screen.getByTestId('bot-icon')).toBeDefined()
  })

  it('should render with user icon', async () => {
    const message: Message = {...mockMessage(), sender: MessageSenderEnum.USER}
    render(<MessageContent message={message} />)

    expect(screen.getByTestId('user-icon')).toBeDefined()
  })

  it('should render with system icon', async () => {
    const message: Message = {...mockMessage(), sender: MessageSenderEnum.SYSTEM}
    render(<MessageContent message={message} />)

    expect(screen.getByTestId('system-icon')).toBeDefined()
  })

  it('should render with default icon', async () => {
    const message: Message = {...mockMessage(), sender: 5 as MessageSenderEnum}
    render(<MessageContent message={message} />)

    expect(screen.getByTestId('default-icon')).toBeDefined()
  })
})