export const fetchMock = (global as any).fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  }))
  