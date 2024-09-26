document.getElementById("gender-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name-input").value;

    // Fetch data from the Genderize.io API
    fetch(`https://api.genderize.io?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data.gender) {
                resultDiv.innerHTML = `<p>The predicted gender for <strong>${name}</strong> is: <strong>${data.gender}</strong> with a probability of ${data.probability * 100}%.</p>`;
            } else {
                resultDiv.innerHTML = `<p>Sorry, we could not predict the gender for <strong>${name}</strong>.</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("result").innerHTML = `<p>There was an error processing your request. Please try again later.</p>`;
        });
});

