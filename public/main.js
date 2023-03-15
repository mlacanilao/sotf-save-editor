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
      // selectedFileName.textContent = `Selected file: ${fileContent}`;

      // Parse the contents as JSON
      const jsonData = JSON.parse(fileContent);
      // DEBUG
      console.log(`typeof jsonData: ${typeof jsonData}`);
      console.log(`Parsed file content: ${jsonData}`);

      if (fileName === 'ConstructionsSaveData.json') {
        // Get the structures array from the JSON
        const structures = jsonData.Data.Constructions.Structures;

        // Loop through the structures and create HTML for each one
        let html = '';
        structures.forEach(structure => {
          if (structure) {
            const position = structure.Position;
            const typeID = structure.TypeID;
            html += `<div>Type ID: ${typeID}</div>`;
            html += `<div>Position: (${position.x}, ${position.y}, ${position.z})</div>`;
            html += '<hr/>';
          }
        });

        // Add the HTML to the page
        selectedFileName.textContent = html;
      }
    } catch (err) {
      console.error(`Error parsing file content: ${err}`);
    }
  });

  fileReader.readAsText(file);

});
