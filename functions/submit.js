/**
 * POST /submit
 */
export async function onRequestPost(event) {
  const { headers } = event.request;
  const contentType = headers.get('content-type') || '';

  // DEBUG
  console.log(`[DEBUG]: contentType = ${contentType}`)

  // DEBUG
  console.log(`[DEBUG]: event = ${event}`)

  // Convert context to form data.
  let data = await event.request.formData();

  // DEBUG
  console.log(`[DEBUG]: data = ${data}`)

  // Get files?
  let files = await event.request.files;

  // Length
  const numFiles = files.length;

  // DEBUG
  console.log(`[DEBUG]: numFiles = ${numFiles}`)

  // Get first file?
  let file = files[0]



  // Convert data string to JSON.
  let json = JSON.stringify([...data], null, 2);

  // DEBUG
  console.log(`[DEBUG]: json = ${json}`)

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  // try {
  //   // Get data from file upload.
  //   let data = await request.formData();
  //
  //   // DEBUG
  //   console.log(data)
  //
  //   // // Convert data to JSON string.
  //   // let json = JSON.stringify(data, null, 2);
  //   //
  //   // // DEBUG
  //   // console.log(json)
  //
  //   // return new Response(data, {
  //   //   headers: {
  //   //     'Content-Type': 'application/json;charset=utf-8'
  //   //   }
  //   // });
  // } catch (err) {
  //   return new Response('Error parsing JSON content', { status: 400 });
  // }
}
