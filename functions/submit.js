/**
 * POST /submit
 */
export async function onRequestPost(context) {
  const { headers } = context.request;
  const contentType = headers.get('content-type') || '';

  // DEBUG
  console.log(`[DEBUG]: contentType = ${contentType}`)

  // DEBUG
  console.log(`[DEBUG]: context = ${context}`)

  // Convert context to form data.
  let data = await request.request.formData();

  // DEBUG
  console.log(`[DEBUG]: data = ${data}`)

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
