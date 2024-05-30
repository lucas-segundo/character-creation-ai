import { vi } from "vitest";
import { ErrorNotifier } from ".";

export const mockErrorNotifier = (): ErrorNotifier => ({
  notify: vi.fn()
})