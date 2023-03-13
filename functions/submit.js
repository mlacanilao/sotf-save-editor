/**
 * POST /submit
 */
export async function onRequestPost({request}) {
  // Check that the request method is POST
  if (request.method !== 'POST') {
    console.log('Request method is not POST')
    return new Response('Only POST requests are allowed', {status: 405})
  }

  // Get the FormData object from the request body
  const formData = await request.formData()
  console.log('FormData object:', formData)

  // Get the file from the FormData object using the name attribute of the file input field
  const file = formData.get('file')
  console.log('File:', file)

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
