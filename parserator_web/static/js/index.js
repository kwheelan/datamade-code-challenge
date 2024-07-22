/* The following wires the form submission to the API and then displays the results */

// Function to handle the form submission
function handleFormSubmit(event) {
   // prevent page reload
   event.preventDefault();

   // Get the value of the address input
   var address = document.getElementById('address').value;

   // Retrieve API result from given address
   var parsedAddress = parseAddress(address);

   // display results on the page
   var displayAddress(parsedAddress);
}

// Function to parse the address using API call
function parseAddress(address) {
   // API call using address parameter (url specified in urls.py)
   fetch('/api/parse?address=' + encodeURIComponent(address))
      .then(response => response.json())
      .then(data => {
         return data;
      })
      .catch(error => {
         console.log(`Unexpected Error : ${error}`);
         return;
      });
}

/* Action when page is loaded */
document.addEventListener('DOMContentLoaded', function () {
   // Attach the submit event to the form
   var form = document.querySelector('.form');
   form.addEventListener('submit', handleFormSubmit);
});