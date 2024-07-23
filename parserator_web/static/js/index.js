/* The following code wires the form submission to the API and then displays the results */

// Function to handle the form submission
function handleFormSubmit(event) {
   // prevent page reload
   event.preventDefault();

   // Get the value of the address input
   var address = document.getElementById('address').value;

   // Retrieve API result from given address
   parseAddress(address);

}

// Function to parse the address using API call
function parseAddress(address) {
   // API call using address parameter (url specified in urls.py)
   fetch('/api/parse?address=' + encodeURIComponent(address))
      .then(response => response.json())
      .then(data => {
         // If it fetched an address properly, display it on the page
         if (data.status == 'success'){
            displayAddress(data);
         } else {
            // if there was an error, display it
            displayError(data);
         }
      })
      .catch(error => {
         console.log(`Unexpected Error : ${error}`);
         // Display a general error message
         displayError({ message: 'Something went wrong. Please try again later.' });
      });
}

// function to display results from API
function displayAddress(data){

   if(data){

      // hide error section
      document.getElementById('error-results').style.display = 'none';

      // fill in address type on the page
      document.getElementById('parse-type').textContent = data.address_type;

      // find div and table inside
      var resultsDiv = document.getElementById('address-results');
      var table = resultsDiv.querySelector('tbody');

      // clear table body
      table.innerHTML = '';

      // get the names of all the address components
      var addressComps = Object.keys(data.address_components)

      // add a row for each address component
      addressComps.forEach(key => {
         // create the row element and add it to the table
         var newRow = document.createElement('tr');
         table.appendChild(newRow);
         // create a table cell for the address part name (ex. AddressNumber)
         var addressPartCell = document.createElement('td');
         addressPartCell.textContent = key;
         newRow.appendChild(addressPartCell);
         // create a table cell for the tag (ex. 123 for AddressNumber)
         var tagCell = document.createElement('td');
         tagCell.textContent = data.address_components[key];
         newRow.appendChild(tagCell);
      });

      // Make the results div visible
      resultsDiv.style.display = '';
   }
}

function displayError(data){

   // get error messsage and place inside appropriate span
   document.getElementById('error-message').textContent = data.message;

   // hide results section
   document.getElementById('address-results').style.display = 'none';

   // show error section
   document.getElementById('error-results').style.display = '';

}

/* Action when page is loaded */
document.addEventListener('DOMContentLoaded', function () {
   // Attach the submit event to the form
   var form = document.querySelector('.form');
   form.addEventListener('submit', handleFormSubmit);
});