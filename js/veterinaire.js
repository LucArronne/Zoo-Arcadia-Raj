const accessToken = getToken();
const myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + accessToken);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

const fetchReports = async () => {
    try {
        const response = await fetch(apiUrl + "rapports", requestOptions);
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid response format");
        }
        return data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};
const displayReports = (reports) => {
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = ''; // Clear existing content

    reports.forEach(report => {
        const reportDiv = document.createElement('div');
        reportDiv.innerHTML = `
            <h2>ID: ${escapeHTML(report.id)}</h2>
            <p>State: ${escapeHTML(report.state)}</p>
            <p>Food: ${escapeHTML(report.food)}</p>
            <p>Quantity: ${escapeHTML(report.quantity)}</p>
            <p>Date: ${new Date(report.date).toLocaleDateString()}</p>
            <p>Details: ${escapeHTML(report.details || 'No details provided')}</p>
            <p>User ID: ${escapeHTML(report.user?.id)}</p>
            <p>User Email: ${escapeHTML(report.user?.email)}</p>
            <p>User Role: ${escapeHTML(report.user?.role?.name)}</p>

            <!-- Affichage des informations de l'animal -->
            <hr>
            <h6>Animal Information</h6>
            <p><strong>Name:</strong> ${escapeHTML(report.animal?.name)}</p>
            <p><strong>Race:</strong> ${escapeHTML(report.animal?.race?.name)}</p>
        `;
        reportContainer.appendChild(reportDiv);
    });
};

// Escape HTML
const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
};

// Fetch and display reports
fetchReports()
    .then(displayReports)
    .catch(error => console.error('Error:', error));
