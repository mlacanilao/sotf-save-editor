// Set Dropzone options
Dropzone.options.myDropzone = {
  acceptedFiles: '.json',
  maxFiles: 1,
  init: function () {
    // Set up event listener for when file is added
    this.on('addedfile', function (file) {
      // Update file contents element
      document.getElementById('content').innerHTML = 'Added file: ' + file.name;
    });
  }
};

// Initialize Dropzone
var myDropzone = new Dropzone('#myDropzone');
