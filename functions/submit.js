/**
 * POST /submit
 */
export async function onRequestPost(context) {
  // DEBUG
  console.log(`[DEBUG]: context = ${context}`)

  // Convert context to form data.
  let data = await context.request.formData();

  // DEBUG
  console.log(`[DEBUG]: data = ${data}`)

  // DEBUG
  console.log(`[DEBUG]: data.values() = ${data.values()}`)

  // Convert data string to JSON.
  let json = JSON.stringify([context.request.files[0]], null, 2);

  // DEBUG
  console.log(`[DEBUG]: json = ${json}`)

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
}
