// Add an event listener to the form with id "gender-form".
// When the form is submitted, the function is triggered.
document.getElementById("gender-form").addEventListener("submit", function(e) {
    
    // Prevent the form from submitting the usual way (reloading the page).
    e.preventDefault();
    
    // Get the value of the input field with id "name-input" and store it in a variable.
    const name = document.getElementById("name-input").value;

    // Send a request to the Genderize API, inserting the name into the API URL.
    fetch(`https://api.genderize.io?name=${name}`)
        
        // When a response is received, convert it to a JSON object.
        .then(response => response.json())
        
        // Once the JSON data is ready, process it.
        .then(data => {
            // Find the HTML element with id "result" where we'll display the output.
            const resultDiv = document.getElementById("result");
            
            // If the API returns a gender prediction, show it with the name and probability.
            if (data.gender) {
                resultDiv.innerHTML = `<p>The predicted gender for <strong>${name}</strong> is: <strong>${data.gender}</strong> with a probability of ${data.probability * 100}%.</p>`;
            } 
            // If no gender is predicted, show a "could not predict" message.
            else {
                resultDiv.innerHTML = `<p>Sorry, we could not predict the gender for <strong>${name}</strong>.</p>`;
            }
        })
        
        // If there's an error in the request, log the error and show a user-friendly message.
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("result").innerHTML = `<p>There was an error processing your request. Please try again later.</p>`;
        });
});
