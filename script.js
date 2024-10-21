function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
}

// Fetch data from the given URL
fetch('https://compute.samford.edu/zohauth/clients/datajson')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach(item => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const speedCell = document.createElement('td');
        const resultCell = document.createElement('td');
        const datetimeCell = document.createElement('td');

        idCell.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
        speedCell.textContent = item.speed || '--';
        resultCell.textContent = item.result || '--';
        datetimeCell.textContent = item.datetime || '--';

        row.appendChild(idCell);
        row.appendChild(speedCell);
        row.appendChild(resultCell);
        row.appendChild(datetimeCell);
        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

// // Function to fetch data and populate the table
// async function fetchDataAndPopulateTable(url) {
//   try {
//       const response = await fetch(url);
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       const data = await response.json(); // Assuming the data is in JSON format

//       const tableBody = document.querySelector('#data-table tbody');
//       tableBody.innerHTML = ''; // Clear existing rows

//       data.forEach(item => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//               <td><a href="details.html">${item.id}</a></td>
//               <td>${item.speed}</td>
//               <td>${item.result || '--'}</td>
//               <td>${item.datetime || '--'}</td>
//           `;
//           tableBody.appendChild(row);
//       });
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// }

// // Call the function with the provided URL
// const dataUrl = 'https://compute.samford.edu/zohauth/clients/datajson';
// fetchDataAndPopulateTable(dataUrl);
