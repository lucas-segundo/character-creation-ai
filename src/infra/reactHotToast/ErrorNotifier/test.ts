import { describe, expect, it, vi } from 'vitest';
import { ReactHotToastErrorNotifier } from '.';

import { toast } from 'react-hot-toast';

vi.mock('react-hot-toast');

describe('ErrorNotifier', () => {
  it('should call react hot toast with rights params', () => {
    const error = new Error('error message');
    const errorNotifier = new ReactHotToastErrorNotifier();
    const toastErrorSpy = vi.spyOn(toast, 'error');

    errorNotifier.notify(error);

    expect(toastErrorSpy).toHaveBeenCalledWith(error.message);
  });
});
