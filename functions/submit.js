async function handleRequest(request) {
  if (request.method === 'POST') {
    const formData = await request.formData()
    const file = formData.get('file')
    if (file) {
      // do something with the file
      const fileContents = await file.text()
      console.log(fileContents)
    } else {
      // no file was uploaded
    }
  }

  // handle other requests
  return new Response('Hello, world!')
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
