import { ErrorNotifier } from '@/presentation/interfaces/ErrorNotifier';
import toast from 'react-hot-toast';

export class ReactHotToastErrorNotifier implements ErrorNotifier {
  notify(error: Error): void {
    toast.error(error.message);
  }
}
