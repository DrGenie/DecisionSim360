/* script.js */

// Define the scenarios with their probabilities and payoffs
const scenarios = [
    {
        id: 1,
        description: "You are offered a gamble with a 50% chance to win $10 and a 50% chance to win nothing.",
        probability: 0.5,
        payoff: 10
    },
    {
        id: 2,
        description: "You are offered a gamble with a 50% chance to win $50 and a 50% chance to win nothing.",
        probability: 0.5,
        payoff: 50
    },
    {
        id: 3,
        description: "You are offered a gamble with a 50% chance to win $100 and a 50% chance to win nothing.",
        probability: 0.5,
        payoff: 100
    }
];

// Function to calculate expected utility (simplified as expected value here)
function calculateExpectedValue(probability, payoff) {
    return probability * payoff;
}

// Function to determine rational choice based on expected utility
function rationalChoice(expectedValue) {
    // Assuming that rational choice is to accept if expected value > 0
    return expectedValue > 0 ? 'accept' : 'reject';
}

// Handle form submission
document.getElementById('decisionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Collect user decisions
    const userDecisions = [];
    scenarios.forEach(scenario => {
        const decision = document.querySelector(`input[name="decision${scenario.id}"]:checked`).value;
        userDecisions.push(decision);
    });

    // Calculate rational decisions
    const rationalDecisions = scenarios.map(scenario => {
        const expectedValue = calculateExpectedValue(scenario.probability, scenario.payoff);
        return rationalChoice(expectedValue);
    });

    // Compare user decisions with rational decisions
    const comparisonData = scenarios.map((scenario, index) => {
        return {
            scenario: `Scenario ${scenario.id}`,
            description: scenario.description,
            userDecision: userDecisions[index],
            rationalDecision: rationalDecisions[index],
            aligned: userDecisions[index] === rationalDecisions[index]
        };
    });

    // Display comparison in the result section
    displayResults(comparisonData);
});

// Function to display results
function displayResults(data) {
    // Hide the form and show the result section
    document.getElementById('decisionForm').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');

    const comparisonDiv = document.getElementById('comparison');
    comparisonDiv.innerHTML = ''; // Clear previous content

    // Create a table to display results
    const table = document.createElement('table');

    // Create table header
    const headerRow = document.createElement('tr');
    ['Scenario', 'Description', 'Your Decision', 'Rational Decision', 'Aligned with Rational Choice'].forEach(text => {
        const th = document.createElement('th');
        th.innerText = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows
    data.forEach(item => {
        const row = document.createElement('tr');

        // Scenario
        const scenarioCell = document.createElement('td');
        scenarioCell.innerText = item.scenario;
        row.appendChild(scenarioCell);

        // Description
        const descCell = document.createElement('td');
        descCell.innerText = item.description;
        row.appendChild(descCell);

        // User Decision
        const userCell = document.createElement('td');
        userCell.innerText = capitalizeFirstLetter(item.userDecision);
        row.appendChild(userCell);

        // Rational Decision
        const rationalCell = document.createElement('td');
        rationalCell.innerText = capitalizeFirstLetter(item.rationalDecision);
        row.appendChild(rationalCell);

        // Alignment
        const alignedCell = document.createElement('td');
        alignedCell.innerText = item.aligned ? 'Yes' : 'No';
        alignedCell.style.color = item.aligned ? 'green' : 'red';
        row.appendChild(alignedCell);

        table.appendChild(row);
    });

    comparisonDiv.appendChild(table);
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to reset the form and results
function resetForm() {
    // Show the form and hide the result section
    document.getElementById('decisionForm').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    // Reset the form
    document.getElementById('decisionForm').reset();
}
// ... [Previous code remains unchanged]

// Define a utility function (e.g., exponential utility for risk aversion)
function utility(payoff) {
    const riskAversionCoefficient = 0.1; // Adjust this value to simulate different risk preferences
    return 1 - Math.exp(-riskAversionCoefficient * payoff);
}

// Function to calculate expected utility
function calculateExpectedUtility(probability, payoff) {
    return probability * utility(payoff) + (1 - probability) * utility(0);
}

// Function to determine rational choice based on expected utility
function rationalChoiceEU(expectedUtility) {
    // Assuming rational choice is to accept if expected utility > utility of sure outcome
    // Here, utility of sure outcome is utility(0) = 0 (since utility(0) = 1 - e^0 = 0)
    return expectedUtility > 0 ? 'accept' : 'reject';
}

// Update the calculation of rational decisions
const rationalDecisions = scenarios.map(scenario => {
    const expectedUtility = calculateExpectedUtility(scenario.probability, scenario.payoff);
    return rationalChoiceEU(expectedUtility);
});

// ... [Rest of the code remains unchanged]
