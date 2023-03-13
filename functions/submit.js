export async function handleRequest({request}) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    // Read the contents of the file
    const fileContent = await file.text();

    // Parse file content as JSON
    const jsonData = JSON.parse(fileContent);

    // Return JSON response
    const jsonResponse = JSON.stringify(jsonData, null, 2);
    return new Response(jsonResponse, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing file content', { status: 400 });
  }
}
