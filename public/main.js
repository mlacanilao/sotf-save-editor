// Get Item IDs JSON file
import itemIDsFile from '../data/itemIDs.json' assert {type: 'json'};

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

      // Start the table
      html +=
        `<table class="table">
          <thead>
            <tr>
              <th scope="col">Type ID</th>
              <th scope="col">Position X</th>
              <th scope="col">Position Y</th>
              <th scope="col">Position Z</th>
            </tr>
          </thead>
          <tbody>`;

      // Loop through the structures and create HTML for each one
      structures.forEach(structure => {
        if (structure && structure.length > 0 && structure[0].Position && structure[0].TypeID) {
          // Get position
          const position = structure[0].Position;
          console.log(`position: ${position}`);

          // Get Type ID
          const typeID = structure[0].TypeID;
          console.log(`typeID: ${typeID}`);

          html +=
            `<tr>
               <td class="text-muted" id="typeID">${typeID}</td>
               <td id="position">${position.x}</td>
               <td id="position">${position.y}</td>
               <td id="position">${position.z}</td>
             </tr>`;
        }
      });

      // Close the table
      html +=
        `</tbody>
         </table>`;
    } else if (fileName === 'PlayerInventorySaveData.json') {
      // Get the ItemBlocks array from the JSON
      const itemBlocks = jsonData.Data.PlayerInventory.ItemInstanceManagerData.ItemBlocks;

      // Start the table
      html +=
        `<input type="text" id="searchInput" class="form-control mb-3 bg-dark text-white" placeholder="Search by Item Name">
         <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              <th scope="col">Item Name</th>
              <th scope="col">Total Count</th>
            </tr>
          </thead>
          <tbody>`;

      // Loop through the itemIDsFile and create HTML for each one
      itemIDsFile.forEach(itemData => {
        // Get Item ID
        const itemId = itemData.itemId;
        console.log(`itemId: ${itemId}`);

        // Get item names
        const itemName = itemData.name;
        console.log(`itemName: ${itemName}`);

        // Find the corresponding itemBlock
        const itemBlock = itemBlocks.find(block => block.ItemId === parseInt(itemId, 10));

        // Get total count if the itemBlock is found, otherwise set it to 0
        const totalCount = itemBlock ? itemBlock.TotalCount : 0;

        html +=
          `<tr>
             <td class="text-white" id="itemId-${itemId}">${itemId}</td>
             <td class="text-white" id="itemName-${itemId}">${itemName}</td>
             <td>
               <div class="input-group">
                 <input type="text" class="form-control bg-dark text-white" id="totalCount-${itemId}" value="${totalCount}">
                 <button class="btn btn-outline-light" type="button" id="maxButton-${itemId}">Max</button>
               </div>
             </td>
           </tr>`;
      });

      // Close the table
      html +=
        `</tbody>
         </table>`;
    }

    // DEBUG
    console.log(`html: ${html}`);

    // Add the HTML to the page
    selectedContent.innerHTML = html;

    // Add event listeners to the "Max" buttons
    itemIDsFile.forEach(itemData => {
      const itemId = itemData.itemId;
      const maxButton = document.getElementById(`maxButton-${itemId}`);
      const totalCountInput = document.getElementById(`totalCount-${itemId}`);

      maxButton.addEventListener('click', () => {
        totalCountInput.value = itemData.max;
      });
    });

    // Table filter/search
    // Get the search input element by its ID
    const searchInput = document.getElementById('searchInput');
    // Get the table body element (assuming there's only one table in the page)
    const tableBody = document.querySelector('table tbody');

    // Add an event listener to the search input for the 'input' event, which is triggered whenever the user types in the input field
    searchInput.addEventListener('input', () => {
      // Get the search input value and convert it to uppercase for case-insensitive search
      const filter = searchInput.value.toUpperCase();

      // Loop through all the rows in the table body
      tableBody.querySelectorAll('tr').forEach(row => {
        // Find the item name cell in the current row by selecting the 'td' element with an ID starting with "itemName-"
        const itemNameCell = row.querySelector('td[id^="itemName-"]');
        // Get the text content of the item name cell
        const itemName = itemNameCell.textContent || itemNameCell.innerText;

        // Check if the item name contains the search input value (case-insensitive)
        if (itemName.toUpperCase().indexOf(filter) > -1) {
          // If the item name matches the search input, display the row
          row.style.display = '';
        } else {
          // If the item name does not match the search input, hide the row
          row.style.display = 'none';
        }
      });
    });
  });

  fileReader.readAsText(file);
});
