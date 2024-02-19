document.addEventListener('DOMContentLoaded', function() {
  var formData = {
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    garageSpaces: '',
    yearBuilt: '',
    patiosPorches: '',
    lotSize: '',
    houseSize: '',
    numStories: '',
  };

  // Assuming your form has the class 'custom-form', not an ID.
  // Make sure your input elements have the correct 'name' attributes.
  var form = document.querySelector('.custom-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    calculatePrice();
  });

  function calculatePrice() {
    // Collect values from the form
    formData.zipCode = form.querySelector('[name="zipCode"]').value;
    formData.bedrooms = form.querySelector('[name="bedrooms"]').value;
    formData.bathrooms = form.querySelector('[name="bathrooms"]').value;
    formData.garageSpaces = form.querySelector('[name="garageSpaces"]').value;
    formData.yearBuilt = form.querySelector('[name="yearBuilt"]').value;
    formData.patiosPorches = form.querySelector('[name="patiosPorches"]').value;
    formData.lotSize = form.querySelector('[name="lotSize"]').value;
    formData.houseSize = form.querySelector('[name="houseSize"]').value;
    formData.numStories = form.querySelector('[name="numStories"]').value;

    let totalPrice = 300000; 

    totalPrice += parseInt(formData.bedrooms || 0) * 50000;
    totalPrice += parseInt(formData.bathrooms || 0) * 30000;
    totalPrice += parseInt(formData.garageSpaces || 0) * 20000;
    totalPrice += Math.max(0, 2000 - parseInt(formData.yearBuilt || 0)) * 2000;
    totalPrice += parseInt(formData.patiosPorches || 0) * 10000;
    totalPrice += (parseInt(formData.lotSize || 0) / 100) * 5000;
    totalPrice += (parseInt(formData.houseSize || 0) / 100) * 10000;
    totalPrice += Math.max(0, parseInt(formData.numStories || 0) - 1) * 30000;
    totalPrice = Math.min(totalPrice, 1200000);

    displayResult(`Estimated Price: $${totalPrice.toFixed(2)}`);
  }

  function displayResult(resultText) {
    // Ensure there's an element with the ID 'resultContainer' in your HTML to display the result
    var resultContainer = document.getElementById('resultContainer');
    resultContainer.textContent = resultText;
  }
});
