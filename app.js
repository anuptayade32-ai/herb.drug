async function analyzeInteractions() {
    const herbQuery = document.getElementById('herbInput').value.trim().toLowerCase();
    const modernQuery = document.getElementById('modernInput').value.trim().toLowerCase();
    const resultsSection = document.getElementById('resultsSection');

    if (!herbQuery || !modernQuery) {
        alert("Please enter both a herb and a modern drug.");
        return;
    }

    try {
        // Fetch your local CSV file
        const response = await fetch('interactions.csv');
        const csvData = await response.text();
        
        // Simple CSV Parsing
        const rows = csvData.split('\n').map(row => row.split(','));
        
        // Finding the interaction (Header assumed: Herb, Modern, Effect, Severity)
        const match = rows.find(row => 
            row[0]?.toLowerCase().includes(herbQuery) && 
            row[1]?.toLowerCase().includes(modernQuery)
        );

        resultsSection.classList.remove('hidden');
        displayResult(match);

    } catch (error) {
        console.error("Error fetching the CSV:", error);
        alert("Could not load interactions.csv. Make sure the file exists in your repository.");
    }
}

function displayResult(match) {
    const title = document.getElementById('resultTitle');
    const badge = document.getElementById('severityBadge');
    const text = document.getElementById('interactionText');

    if (match) {
        title.innerText = "Interaction Detected";
        text.innerText = match[2]; // The Effect column
        badge.innerText = match[3]; // The Severity column
        
        // Color coding based on severity
        const severity = match[3].toLowerCase();
        badge.style.backgroundColor = severity.includes('high') ? '#d9534f' : '#f0ad4e';
    } else {
        title.innerText = "No Known Interaction";
        text.innerText = "No specific interactions were found for this pair in our current database.";
        badge.innerText = "Low Risk / Unknown";
        badge.style.backgroundColor = "#5cb85c";
    }
}
