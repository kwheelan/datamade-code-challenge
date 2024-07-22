/* The following wires the form submission to the API and then displays the results */

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
         displayAddress(data);
      })
      .catch(error => {
         console.log(`Unexpected Error : ${error}`);
      });
}

// function to display results from API
function displayAddress(data){

   if(data){

      // fill in address type span
      document.getElementById('parse-type').textContent = data.address_type;

      // find div and table inside
      var resultsDiv = document.getElementById('address-results');
      // var table = resultsDiv.querySelector('tbody');
      // // add a row for each address component
      // parsedAddress.array.forEach(addressComponent => {
      //    // create the row element and add it to the table
      //    var newRow = document.createElement('tr');
      //    table.appendChild(newRow);
      //    // create cells for the address part and the tag
      //    var addressPartCell = document.createElement('td');
      //    addressPartCell.textContent = addressComponent.tag;
      //    newRow.appendChild()
      //    var tagCell = document.createElement('td');

      // });

      // Make the results div visible
      resultsDiv.style.display = '';

   }

}

/* Action when page is loaded */
document.addEventListener('DOMContentLoaded', function () {
   // Attach the submit event to the form
   var form = document.querySelector('.form');
   form.addEventListener('submit', handleFormSubmit);
});