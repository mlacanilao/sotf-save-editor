// Get the file input element from the DOM
const fileInput = document.querySelector('#formFile');
const selectedFileName = document.querySelector('#selectedFileName');

// Add an event listener to the file input element
fileInput.addEventListener('change', () => {
  // Get the selected file
  const file = fileInput.files[0];
  console.log(`typeof file: ${typeof file}`);

  // Get the filename of the selected file
  const fileName = file.name;
  console.log(`Selected file: ${fileName}`);

  // Create a file reader object
  const fileReader = new FileReader();

  // Set up an event listener to read the file as text and parse it as JSON
  fileReader.addEventListener('load', () => {
    try {
      // Get the contents of the file
      const fileContent = fileReader.result;
      // DEBUG
      console.log(`typeof fileContent: ${typeof fileContent}`);
      console.log(`fileContent: ${fileContent}`);

      // Set the text content of the selected file name element to the selected file name
      // DEBUG
      selectedFileName.textContent = `Selected file: ${fileContent}`;

      // Parse the contents as JSON
      const jsonData = JSON.parse(fileContent);
      // DEBUG
      console.log(`typeof jsonData: ${typeof jsonData}`);
      console.log(`Parsed file content: ${jsonData}`);
    } catch (err) {
      console.error(`Error parsing file content: ${err}`);
    }
  });

  fileReader.readAsText(file);

});
