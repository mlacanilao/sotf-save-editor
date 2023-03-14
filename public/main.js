// Get the file input and selected file name elements from the DOM
const fileInput = document.querySelector('#formFile');
const selectedFileName = document.querySelector('#selectedFileName');

// Add an event listener to the file input element
fileInput.addEventListener('change', () => {
  // Get the name of the selected file
  const fileName = fileInput.files[0].name;

  // Set the text content of the selected file name element to the selected file name
  selectedFileName.textContent = `Selected file: ${fileName}`;
});
