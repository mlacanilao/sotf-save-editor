export async function onRequestPost({request}) {
  try {
    const arrayBuffer = await request.arrayBuffer();

    // Convert the ArrayBuffer to a string
    const fileContent = new TextDecoder().decode(arrayBuffer);

    // Parse file content as JSON
    const jsonData = JSON.parse(fileContent);

    // Return JSON response
    const jsonResponse = JSON.stringify(jsonData, null, 2);

    console.log(`Received file content: ${fileContent}`);
    console.log(`Parsed JSON data: ${jsonData}`);
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
