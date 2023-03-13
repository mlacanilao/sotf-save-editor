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
  // Create a reader for the request body
  const reader = body.getReader()

  // Create a decoder for the request body
  const decoder = new TextDecoder()

  // Create an object to store the parsed results
  let result = {}

  // Initialize the done flag to false
  let done = false

  // Initialize the buffer string to an empty string
  let buffer = ''

  // Loop through the request body until done is true
  while (!done) {
    // Read the next chunk of data from the request body
    const {value, done: readerDone} = await reader.read()

    // Update the done flag
    done = readerDone

    // Decode the chunk of data and add it to the buffer
    buffer += decoder.decode(value, {stream: !done})

    // Split the buffer into parts using the boundary string
    const parts = buffer.split(`--${boundary}`)

    // Remove the last part from the buffer and save it for the next loop iteration
    buffer = parts.pop()

    // Loop through each part in the parts array
    for (const part of parts) {
      // Check if the part starts with the expected separator
      if (!part.startsWith('\r\n')) {
        continue
      }

      // Find the start of the content and extract the headers
      const contentStart = part.indexOf('\r\n\r\n') + 4
      const headers = part.slice(2, contentStart - 4)

      // Extract the content from the part
      const content = part.slice(contentStart, -2)

      // Extract the name and filename (if present) from the headers
      const nameMatch = headers.match(/name="([^"]+)"/)
      const filenameMatch = headers.match(/filename="([^"]+)"/)

      // If the part contains a file, create a new File object and add it to the result object
      if (filenameMatch) {
        const filename = filenameMatch[1]
        const typeMatch = headers.match(/Content-Type: (.+)/)
        const type = typeMatch ? typeMatch[1] : 'application/octet-stream'
        result[nameMatch[1]] = new File([content], filename, {type})
      }
      // If the part contains a non-file field, add its content to the result object
      else if (nameMatch) {
        result[nameMatch[1]] = content
      }
    }
  }

  // Convert the result object into a FormData object and return it
  return new FormData(result)
}

