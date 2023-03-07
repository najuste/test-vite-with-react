export const fetchMock = (global as any).fetch = vi.fn(async () => await Promise.resolve({
  json: async () => await Promise.resolve({}),
  status: 200
}))
