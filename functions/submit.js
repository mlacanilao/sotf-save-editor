/**
 * POST /submit
 */
export async function onRequestPost({ request }) {
  // Check that the request method is POST
  if (request.method !== 'POST') {
    return new Response('Only POST requests are allowed', {status: 405})
  }

  // Get the FormData object from the request body
  const formData = await request.formData()

  // Get the file from the FormData object using the name attribute of the file input field
  const file = formData.get('file')

  // Check that a file was uploaded
  if (!file) {
    return new Response('No file uploaded', {status: 400})
  }

  // Get the file contents as a Buffer
  const fileContents = await file.arrayBuffer()

  // Convert the file contents to a string
  const fileString = new TextDecoder().decode(fileContents)

  // Parse the string into a JSON object
  const fileJson = JSON.parse(fileString)

  // Create an HTML template with placeholders for the JSON data
  const htmlTemplate = `
    <html>
      <head>
        <title>File Upload</title>
      </head>
      <body>
        <h1>File Uploaded Successfully</h1>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Message:</strong> {{message}}</p>
      </body>
    </html>
  `

  // Replace the placeholders in the template with the JSON data
  const html = htmlTemplate
    .replace('{{name}}', fileJson.name)
    .replace('{{email}}', fileJson.email)
    .replace('{{message}}', fileJson.message)

  // Return the HTML response
  return new Response(html, {status: 200, headers: {'Content-Type': 'text/html'}})
}
