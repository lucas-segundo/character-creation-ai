import { ReactHotToastErrorNotifier } from '@/infra/reactHotToast/ErrorNotifier'
import { ErrorNotifier } from '@/presentation/interfaces/ErrorNotifier'

export const makeErrorNotifier = (): ErrorNotifier => {
  return new ReactHotToastErrorNotifier()
}
