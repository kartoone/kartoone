function downloadData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
}

// Function to fetch data and populate the table
async function fetchDataAndPopulateTable(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Assuming the data is in JSON format

      const tableBody = document.querySelector('#data-table tbody');
      tableBody.innerHTML = ''; // Clear existing rows

      data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><a href="details.html">${item.id}</a></td>
              <td>${item.speed}</td>
              <td>${item.result || '--'}</td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Call the function with the provided URL
const dataUrl = 'https://compute.samford.edu/zohauth/datajson';
fetchDataAndPopulateTable(dataUrl);
