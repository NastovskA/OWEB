$(document).ready(function() {


        function filterCars() {

            const selectedBrand = $('#carBrand').val().toLowerCase(); 
            const selectedFuelType = $('#fuelType').val().toLowerCase(); 
            const selectedMileage = parseInt($('#mileage').val()) || Number.MAX_VALUE; 
            const selectedTransmission = $('input[name="transmission"]:checked').val()?.toLowerCase(); 
            const priceFrom = parseFloat($('#priceFrom').val()) || 0; 
            const priceTo = parseFloat($('#priceTo').val()) || Number.MAX_VALUE; 
    
            const $carBoxes = $('.boxes-container .box'); 
    
            $carBoxes.each(function() { 
                const $box = $(this); 
    
                const button = $box.find('.button-view')[0];  
                if (!button) return;
    
                const carData = {
                    brand: $box.find('h2').text().toLowerCase(),
                    mileage: parseInt(button.getAttribute('data-mileage').replace(/,/g, '')),
                    fuelType: button.getAttribute('data-fuel').toLowerCase(),
                    transmission: button.getAttribute('data-transmission').toLowerCase(),
                    price: parseFloat(button.getAttribute('date-price').replace(/[^0-9.]/g, ''))
                };
    

                const brandMatch = selectedBrand === 'all' || carData.brand.includes(selectedBrand);
                const fuelMatch = selectedFuelType === 'all' || carData.fuelType === selectedFuelType;
                const mileageMatch = selectedMileage === Number.MAX_VALUE || carData.mileage <= selectedMileage;
                const transmissionMatch = !selectedTransmission || carData.transmission.includes(selectedTransmission.toLowerCase());
                const priceMatch = carData.price >= priceFrom && carData.price <= priceTo;
    

                if (brandMatch && fuelMatch && mileageMatch && transmissionMatch && priceMatch) {
                    $box.show(); 
                    hasMatch = true;
                } else {
                    $box.hide(); 
                }
            });
    

            const $noResultsMessage = $('#noResultsMessage'); 
            $noResultsMessage.toggle(!hasMatch); 
            if (!hasMatch) {
                $noResultsMessage.text('No cars available for the selected criteria.'); 
            }
        }
    
        $('.filter-buttons button[type="submit"]').on('click', function(event) { 
            event.preventDefault();
            filterCars(); 
        });
    

        $('.filter-buttons button[type="reset"]').on('click', function(event) { 
            event.preventDefault();

            $('select').val('all'); 
            $('input[type="number"]').val(''); 
            $('input[type="radio"]').prop('checked', false); 
    

            $('.boxes-container .box').show(); 
    

            $('#noResultsMessage').hide(); 
        });
    

        function showPopup(event) {
            const button = $(event.target); 
            const vehicleDetails = {
                mileage: button.data('mileage'), 
                year: button.data('year'), 
                fuelType: button.data('fuel'), 
                transmission: button.data('transmission'), 
                bodyType: button.data('body'), 
                colour: button.data('colour'), 
                doors: button.data('doors'), 
                engineSize: button.data('engine'), 
                co2Emissions: button.data('co2'), 
                price: button.data('price') 
            };
    
            const $popupDetails = $('#popup-details'); 
            $popupDetails.html(`
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
            `);
    
            $('.popup-overlay').show(); 
    

            $('.test-drive').on('click', function() { 
                window.location.href = 'test-drive.html';
            });
    
            $('.reviews').on('click', function() { 
                window.location.href = 'reviews.html';
            });
        }
    

        $('.button-view').on('click', showPopup); 
    
        //ZATVARANJE NA POPUP NA KOPCE CLOSE
        $('.close-popup').on('click', function() { 
            $('.popup-overlay').hide(); 
        });
    
        //ZATVARANJE NA POPUP NA BILO KOJ DEL OD EKRANOT
        $('.popup-overlay').on('click', function(e) { 
            if ($(e.target).hasClass('popup-overlay')) { 
                $('.popup-overlay').hide(); 
            }
        });
    
        // Like funkcionalnost
        $('.box .btn.like').each(function() { 
            $(this).on('click', function() { 
                const $box = $(this).closest('.box'); 
                const $likeIcon = $box.find('.like-icon'); 
    
                if ($likeIcon.is(':visible')) { 
                    $likeIcon.hide(); 
                    $(this).text('Like'); 
                } else {
                    $likeIcon.show(); 
                    $(this).text('Unlike'); 
                }
            });
        });
    });