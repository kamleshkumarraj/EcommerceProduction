export const getSearchParams = (location) => {
  const url = new URL(location)
  const searchParams = new URLSearchParams(url.searchParams)
  return searchParams;
}
