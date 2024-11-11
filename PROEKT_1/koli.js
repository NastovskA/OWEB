// Функција за филтрирање на автомобилите
function filterCars() {
  // Земање на сите избрани вредности од филтрите
  const selectedBrand = document.getElementById('carBrand').value.toLowerCase();
  const selectedFuelType = document.getElementById('fuelType').value.toLowerCase();
  const selectedMileage = parseInt(document.getElementById('mileage').value) || Number.MAX_VALUE;
  const selectedTransmission = document.querySelector('input[name="transmission"]:checked')?.value?.toLowerCase();
  const priceFrom = parseFloat(document.getElementById('priceFrom').value) || 0;
  const priceTo = parseFloat(document.getElementById('priceTo').value) || Number.MAX_VALUE;
  
  const carBoxes = document.querySelectorAll('.boxes-container .box');
  let hasMatch = false;

  carBoxes.forEach(function(box) {
      const button = box.querySelector('.button-view');
      if (!button) return;

      // Извлекување на податоците од data атрибутите
      const carData = {
          brand: box.querySelector('h2').textContent.toLowerCase(),
          mileage: parseInt(button.getAttribute('data-mileage').replace(/,/g, '')),
          fuelType: button.getAttribute('data-fuel').toLowerCase(),
          transmission: button.getAttribute('data-transmission').toLowerCase(),
          price: parseFloat(button.getAttribute('date-price').replace(/[^0-9.]/g, ''))
      };

      // Проверка на сите услови
      const brandMatch = selectedBrand === 'all' || carData.brand.includes(selectedBrand);
      const fuelMatch = selectedFuelType === 'all' || carData.fuelType === selectedFuelType;
      const mileageMatch = selectedMileage === Number.MAX_VALUE || carData.mileage <= selectedMileage;
      const transmissionMatch = !selectedTransmission || carData.transmission.includes(selectedTransmission.toLowerCase());
      const priceMatch = carData.price >= priceFrom && carData.price <= priceTo;

      // Прикажување или криење на автомобилот според филтрите
      if (brandMatch && fuelMatch && mileageMatch && transmissionMatch && priceMatch) {
          box.style.display = 'block';
          hasMatch = true;
      } else {
          box.style.display = 'none';
      }
  });

  // Прикажување на пораката за нема резултати
  const noResultsMessage = document.getElementById('noResultsMessage');
  noResultsMessage.style.display = hasMatch ? 'none' : 'block';
  if (!hasMatch) {
      noResultsMessage.textContent = 'No cars available for the selected criteria.';
  }
}

// Event listener за Submit копчето
document.querySelector('.filter-buttons button[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault();
  filterCars();
});

// Event listener за Reset копчето
document.querySelector('.filter-buttons button[type="reset"]').addEventListener('click', function(event) {
  // Ресетирање на сите форми
  document.querySelectorAll('select').forEach(select => select.value = 'all');
  document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
  
  // Прикажување на сите автомобили
  const carBoxes = document.querySelectorAll('.boxes-container .box');
  carBoxes.forEach(box => box.style.display = 'block');
  
  // Криење на пораката за нема резултати
  document.getElementById('noResultsMessage').style.display = 'none';
});

// Останатиот код останува ист
function showPopup(event) {
  const button = event.target;
  const vehicleDetails = {
      mileage: button.getAttribute('data-mileage'),
      year: button.getAttribute('data-year'),
      fuelType: button.getAttribute('data-fuel'),
      transmission: button.getAttribute('data-transmission'),
      bodyType: button.getAttribute('data-body'),
      colour: button.getAttribute('data-colour'),
      doors: button.getAttribute('data-doors'),
      engineSize: button.getAttribute('data-engine'),
      co2Emissions: button.getAttribute('data-co2'),
      price: button.getAttribute('date-price')
  };
  
  const popupDetails = document.getElementById('popup-details');
  popupDetails.innerHTML = `
      <h3>Overview</h3>
      <p>Mileage: ${vehicleDetails.mileage}</p>
      <p>Year: ${vehicleDetails.year}</p>
      <p>Fuel type: ${vehicleDetails.fuelType}</p>
      <p>Transmission: ${vehicleDetails.transmission}</p>
      <p>Colour: ${vehicleDetails.colour}</p>
      <p>Doors: ${vehicleDetails.doors}</p>
      <p>Engine size: ${vehicleDetails.engineSize}</p>
      <p>CO₂ Emissions: ${vehicleDetails.co2Emissions}</p>
      <p>Price: ${vehicleDetails.price}</p>
      <div class="popup-buttons">
          <button class="btn test-drive">🚗 Book a Test Drive</button>
          <button class="btn reviews">⭐ Reviews</button>
      </div>
  `;

  document.querySelector('.popup-overlay').style.display = 'block';

  document.querySelectorAll('.test-drive').forEach(button => {
      button.addEventListener('click', () => {
          window.location.href = 'test-drive.html';
      });
  });

  document.querySelectorAll('.reviews').forEach(button => {
      button.addEventListener('click', () => {
          window.location.href = 'reviews.html';
      });
  });
}

// Додавање на event listeners за popup
document.querySelectorAll('.button-view').forEach(button => {
  button.addEventListener('click', showPopup);
});

document.querySelector('.close-popup').addEventListener('click', () => {
  document.querySelector('.popup-overlay').style.display = 'none';
});

document.querySelector('.popup-overlay').addEventListener('click', (e) => {
  if (e.target === document.querySelector('.popup-overlay')) {
      document.querySelector('.popup-overlay').style.display = 'none';
  }
});

// Like функционалност
document.querySelectorAll('.box .btn.like').forEach(function(button) {
  button.addEventListener('click', function() {
      let box = this.closest('.box');
      let likeIcon = box.querySelector('.like-icon');
      
      if (likeIcon.style.display === 'block') {
          likeIcon.style.display = 'none';
          this.textContent = 'Like';
      } else {
          likeIcon.style.display = 'block';
          this.textContent = 'Unlike';
      }
  });
});