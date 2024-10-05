import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) => {
  const {
    public: { API_BASE_URL },
  } = useRuntimeConfig()

  return useFetch(url, {
    ...options,
    baseURL: `${API_BASE_URL}`,
  })
}
