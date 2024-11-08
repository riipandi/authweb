export default eventHandler((event) => {
  return { message: 'API Endpoint', path: event.path }
})
