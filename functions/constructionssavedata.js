addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const data = await request.json()

  // Do something with the data here

  return new Response(JSON.stringify({ message: 'Data received successfully' }))
}
