export async function onRequestPost({request}) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log(`File name: ${file.name}`);

    // Read the contents of the file
    const fileContent = await file.text();
    console.log(`File content: ${fileContent}`);

    // Parse file content as JSON
    const jsonData = JSON.parse(fileContent);
    console.log(`JSON data: ${JSON.stringify(jsonData, null, 2)}`);

    // Return JSON response
    const jsonResponse = JSON.stringify(jsonData, null, 2);
    console.log(`JSON response: ${jsonResponse}`);

    return new Response(jsonResponse, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return new Response('Error parsing file content', { status: 400 });
  }
}
