// Get the file input element from the DOM
const fileInput = document.querySelector('#formFile');

// Add an event listener to the file input element
fileInput.addEventListener('change', () => {
  // Get the selected file
  const file = fileInput.files[0];

  // Create a file reader object
  const fileReader = new FileReader();

  // Set up an event listener to read the file as text and parse it as JSON
  fileReader.addEventListener('load', () => {
    try {
      // Get the contents of the file
      const fileContent = fileReader.result;

      // Parse the contents as JSON
      const jsonData = JSON.parse(fileContent);

      // Log the parsed JSON to the console
      console.log(`Parsed file content: ${jsonData}`);
    } catch (err) {
      console.error(`Error parsing file content: ${err}`);
    }
  });

  fileReader.readAsText(file);
});
