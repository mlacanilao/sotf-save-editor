export async function onRequestPost({request}) {
  try {
    // Get the request body as an ArrayBuffer
    const body = await request.arrayBuffer();
    console.log(`body: ${body}`);

    // Convert the ArrayBuffer to a Uint8Array
    const uint8Array = new Uint8Array(body);
    console.log(`uint8Array: ${uint8Array}`);

    // Convert the Uint8Array to a string using TextDecoder
    const decoder = new TextDecoder();
    const string = decoder.decode(uint8Array);
    console.log(`string: ${string}`);

    // Parse the string as JSON
    const jsonData = JSON.parse(string);

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
