addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const formData = await request.formData()
    const file = formData.get('file')

    if (file) {
      const fileContents = await file.text()
      // do something with the file contents
    }

    return new Response('File uploaded successfully')
  }

  // handle other requests
  return new Response('Hello, world!')
}
