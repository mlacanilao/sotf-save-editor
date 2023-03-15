// Get the file input element from the DOM
const fileInput = document.querySelector('#formFile');
const selectedContent = document.querySelector('#content');

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
    // Initialize JSON data
    let jsonData;

    try {
      // Get the contents of the file
      let fileContent = fileReader.result;

      // Remove backslashes
      fileContent = fileContent.replace(/\\/g, '');

      // Remove excess double quotes
      fileContent = fileContent.replace('"{', '{');
      fileContent = fileContent.replace('"}}', '}}');
      console.log(`typeof fileContent: ${typeof fileContent}`);
      console.log(`fileContent: ${fileContent}`);

      // Parse the contents as JSON
      jsonData = JSON.parse(fileContent);
      console.log(`typeof jsonData: ${typeof jsonData}`);
      console.log(`jsonData: ${jsonData}`);
    } catch (err) {
      console.error(`Error parsing file content: ${err}`);
    }

    // Initialize dynamic html
    let html = '';

    if (fileName === 'ConstructionsSaveData.json') {
      // Get the structures array from the JSON
      const structures = jsonData.Data.Constructions.Structures;

      // Loop through the structures and create HTML for each one
      structures.forEach(structure => {
        if (structure && structure.length > 0 && structure[0].Position && structure[0].TypeID) {
          // Get position
          const position = structure[0].Position;
          console.log(`position: ${position}`);

          // Get Type ID
          const typeID = structure[0].TypeID;
          console.log(`typeID: ${typeID}`);

          html += `<div class="mb-3">
            <div class="input-group">
              <span class="input-group-text">Type ID</span>
              <input type="text" class="form-control" id="typeID" value="${typeID}">
            </div>
          </div>`;
          html += `<div class="mb-3">
            <div class="input-group">
              <span class="input-group-text">Position</span>
              <span class="input-group-text">X</span>
              <input type="text" class="form-control" id="position" value="${position.x}">
              <span class="input-group-text">Y</span>
              <input type="text" class="form-control" id="position" value="${position.y}">
              <span class="input-group-text">Z</span>
              <input type="text" class="form-control" id="position" value="${position.z}">
            </div>
          </div>`;
          html += '<hr/>';
        }
      });
    } else if (fileName === 'PlayerInventorySaveData.json') {
      // Get the ItemBlocks array from the JSON
      const itemBlocks = jsonObj.Data.PlayerInventory.ItemInstanceManagerData.ItemBlocks;

      // Loop through the item blocks and create HTML for each one
      itemBlocks.forEach(itemBlock => {
        if (itemBlock && itemBlock.length > 0 && itemBlock[0].ItemId && itemBlock[0].TotalCount) {
          // Get Item ID
          const itemId = itemBlock.ItemId;
          console.log(`itemId: ${itemId}`);

          // Get total count
          const totalCount = itemBlock.TotalCount;
          console.log(`totalCount: ${totalCount}`);

          html += `<div class="mb-3">
            <div class="input-group">
              <span class="input-group-text">Item ID</span>
              <input type="text" class="form-control" id="itemId" value="${itemId}">
            </div>
          </div>`;
          html += `<div class="mb-3">
            <div class="input-group">
              <span class="input-group-text">Total Count</span>
              <input type="text" class="form-control" id="totalCount" value="${totalCount}">
            </div>
          </div>`;
          html += '<hr/>';
        }
      });
    }

    // DEBUG
    console.log(`html: ${html}`);

    // Add the HTML to the page
    selectedContent.innerHTML = html;
  });

  fileReader.readAsText(file);
});
