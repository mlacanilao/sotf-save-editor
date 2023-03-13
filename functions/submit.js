export async function onRequestPost({request}) {
  try {
    // Read the contents of the file
    console.log(`Reading file contents...`);
    const fileContent = await request.arrayBuffer();
    console.log(`fileContent: ${fileContent}`);

    // Parse file content as JSON
    console.log(`Parsing file contents as JSON...`);
    const jsonData = JSON.parse(new TextDecoder().decode(fileContent));

    // Return JSON response
    const jsonResponse = JSON.stringify(jsonData, null, 2);
    console.log(`Returning JSON response: ${jsonResponse}`);
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
