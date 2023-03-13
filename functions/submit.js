/**
 * POST /submit
 */
export async function onRequestPost({request}) {
  // Check that the request method is POST
  if (request.method !== 'POST') {
    console.log('Request method is not POST')
    return new Response('Only POST requests are allowed', {status: 405})
  }

  // Get the boundary string from the content type header
  const contentType = request.headers.get('Content-Type')
  const boundary = contentType.match(/boundary=([^;]+)/)[1]
  console.log('Boundary:', boundary)

  // Parse the MIME multipart blob
  const formData = await parseMultipart(request.body, boundary)
  console.log('FormData object:', formData)

  // Get the file from the FormData object using the name attribute of the file input field
  const file = formData.get('file')
  console.log('File:', file)
  console.log('File data type:', typeof file)

  // Check that a file was uploaded
  if (!file) {
    console.log('No file uploaded')
    return new Response('No file uploaded', {status: 400})
  }

  // Get the file contents as a Buffer
  const fileContents = await file.arrayBuffer()
  console.log('File contents:', fileContents)

  // Convert the file contents to a string
  const fileString = new TextDecoder().decode(fileContents)
  console.log('File contents as string:', fileString)

  // Parse the string into a JSON object
  const fileJson = JSON.parse(fileString)
  console.log('File contents as JSON object:', fileJson)

  // Log all the contents of the JSON object
  for (const [key, value] of Object.entries(fileJson)) {
    console.log(`${key}: ${value}`)
  }

  // Return the JSON response
  return new Response(JSON.stringify(fileJson), {status: 200, headers: {'Content-Type': 'application/json'}})
}

async function parseMultipart(body, boundary) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let result = {}
  let done = false
  let buffer = ''

  while (!done) {
    const {value, done: readerDone} = await reader.read()
    done = readerDone
    buffer += decoder.decode(value, {stream: !done})

    const parts = buffer.split(`--${boundary}`)
    buffer = parts.pop()
    for (const part of parts) {
      if (!part.startsWith('\r\n')) {
        continue
      }

      const contentStart = part.indexOf('\r\n\r\n') + 4
      const headers = part.slice(2, contentStart - 4)
      const content = part.slice(contentStart, -2)

      const nameMatch = headers.match(/name="([^"]+)"/)
      const filenameMatch = headers.match(/filename="([^"]+)"/)
      if (filenameMatch) {
        const filename = filenameMatch[1]
        const typeMatch = headers.match(/Content-Type: (.+)/)
        const type = typeMatch ? typeMatch[1] : 'application/octet-stream'
        result[nameMatch[1]] = new File([content], filename, {type})
      } else if (nameMatch) {
        result[nameMatch[1]] = content
      }
    }
  }

  return new FormData(result)
}
