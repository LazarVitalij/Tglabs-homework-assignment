export const handleError = (
  error: unknown,
  setError: (error: string) => void
): void => {
  if (typeof error === 'string') {
    setError(error)
  } else {
    setError('Api not responding')
  }
}
