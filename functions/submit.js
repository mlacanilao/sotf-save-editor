/**
 * POST /submit
 */
export async function onRequestPost(event) {
  // DEBUG
  console.log(`[DEBUG]: event = ${event}`)

  // Convert context to form data.
  let data = await event.request.formData();

  // DEBUG
  console.log(`[DEBUG]: data = ${data}`)

  // DEBUG
  console.log(`[DEBUG]: data.values() = ${data.values()}`)

  // Get files?
  let file = data.get('file')

  // DEBUG
  console.log(`[DEBUG]: file = ${file}`)

  // Read file.
  const reader = new FileReaderSync();

  reader.readAsDataURL(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  // Convert data string to JSON.
  let json = JSON.stringify([...data], null, 2);

  // DEBUG
  console.log(`[DEBUG]: json = ${json}`)

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
}
