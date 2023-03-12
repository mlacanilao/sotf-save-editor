/**
 * POST /submit
 */
export async function onRequestPost(request) {
  try {
    // Get data from file upload.
    let data = await request.formData();

    // DEBUG
    console.log(data)

    // // Convert data to JSON string.
    // let json = JSON.stringify(data, null, 2);
    //
    // // DEBUG
    // console.log(json)

    return new Response(json, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
