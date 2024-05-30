export interface ErrorNotifier {
  notify: (error: Error) => void
}