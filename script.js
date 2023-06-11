var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");

var form_1_cards = document.querySelectorAll(".form_1 .card");
var form_2_cards = document.querySelectorAll(".form_2 .card");

var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");

var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");

var form_2_progessbar = document.querySelector(".form_2_progessbar");
var form_3_progessbar = document.querySelector(".form_3_progessbar");

var order_card = document.querySelector(".order-card");
var done_page = document.querySelector(".ui-container");

var btn_done = document.querySelector(".btn_done");

var expert;
var service;

form_1_cards.forEach(function(card) {
    card.addEventListener("click", function() {
        var cardImage = $(this).find('.card-img-top').attr('src');
        var cardTitle = $(this).find('.card-title').text();

        expert = cardTitle;
    
        var orderItem = $('<li class="order-item"></li>');
        var itemImage = $('<img>').attr('src', cardImage);
        var itemTitle = $('<span>').text(cardTitle);
    
        var existingOrderItem = $('.order-items').find('.order-item');
        if (existingOrderItem.length > 0) {
          existingOrderItem.replaceWith(orderItem);
        } else {
          $('.order-items').append(orderItem);
        }
        
        orderItem.append(itemImage, itemTitle);
        form_1.style.display = "none";
        form_2.style.display = "block";
    
        form_2_btns.style.display = "flex";
    
        form_2_progessbar.classList.add("active");
    });
});

form_2_cards.forEach(function(card) {
    card.addEventListener("click", function() {
        var cardTitle = $(this).find('.card-title').text();
        var cardPrice = $(this).find('.card-price').text();

        service = cardTitle;
    
        var orderItem = $('<li class="service-item"></li>');
        var itemTitle = $('<span>').text(cardTitle);
        var itemPrice = $('<span>').text(cardPrice);
    
        var existingOrderItem = $('.order-items').find('.service-item');
        if (existingOrderItem.length > 0) {
          existingOrderItem.replaceWith(orderItem);
        } else {
          $('.order-items').append(orderItem);
        }
        
        orderItem.append(itemTitle, " ",itemPrice);
        $('#total').empty();
        $('#total').append("Total: ", cardPrice);
        form_2.style.display = "none";
        form_3.style.display = "block";
    
        form_2_btns.style.display = "none";
        form_3_btns.style.display = "flex";
    
        form_3_progessbar.classList.add("active");
    });
});


form_2_back_btn.addEventListener("click", function(){
	form_1.style.display = "block";
	form_2.style.display = "none";

	form_2_btns.style.display = "none";

	form_2_progessbar.classList.remove("active");
});

form_3_back_btn.addEventListener("click", function(){
	form_2.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_3_progessbar.classList.remove("active");
});

document.getElementById("date").addEventListener("input", updateOrderDate);
document.getElementById("time").addEventListener("input", updateOrderTime);

function updateOrderDate() {
    // Get the selected date and time
    var date = document.getElementById("date").value;

    var orderDate = $('<li class="date-item"></li>');
    var dateText = $('<span>').text(date);

    var existingOrderItem = $('.order-items').find('.date-item');
    if (existingOrderItem.length > 0) {
      existingOrderItem.replaceWith(orderDate);
    } else {
      $('.order-items').append(orderDate);
    }
    
    orderDate.append("Date: ", dateText);
}

function updateOrderTime() {
    // Get the selected date and time
    var time = document.getElementById("time").value;

    var orderTime = $('<li class="time-item"></li>');
    var timeText = $('<span>').text(time);

    var existingOrderItem = $('.order-items').find('.time-item');
    if (existingOrderItem.length > 0) {
      existingOrderItem.replaceWith(orderTime);
    } else {
      $('.order-items').append(orderTime);
    }

    if(parseInt(time.slice(0,3)) < 12){
        orderTime.append("Time: ",timeText, " AM");
    } else {
        orderTime.append("Time: ",timeText, " PM");
    }
}

btn_done.addEventListener("click", function(){
    // Declare the invalid-input class dynamically
    var invalidInputClass = "invalid-input";
    var invalidInputStyle = document.createElement("style");
    invalidInputStyle.innerHTML = "." + invalidInputClass + " { border: 1px solid red; }";
    document.head.appendChild(invalidInputStyle);

    // Get input elements
    var fullNameInput = document.getElementById("fullname");
    var emailInput = document.getElementById("email");
    var dateInput = document.getElementById("date");
    var timeInput = document.getElementById("time");
    var notesInput = document.getElementById("notes");

    // Remove previous invalid input highlighting
    fullNameInput.classList.remove(invalidInputClass);
    emailInput.classList.remove(invalidInputClass);
    dateInput.classList.remove(invalidInputClass);
    timeInput.classList.remove(invalidInputClass);

    // Get input values
    var fullName = fullNameInput.value.trim();
    var email = emailInput.value.trim();
    var date = dateInput.value.trim();
    var time = timeInput.value.trim();
    var notes = notesInput.value.trim();

    var missing = false;

    // Check if inputs are empty
    if (fullName === "") {
        fullNameInput.classList.add(invalidInputClass);
        missing = true;
    }
    if (email === "") {
      emailInput.classList.add(invalidInputClass);
      missing = true;
    }
    if (date === "") {
      dateInput.classList.add(invalidInputClass);
      missing = true;
    }
    if (time === "") {
      timeInput.classList.add(invalidInputClass);
      missing = true;
    }

    if(!missing){
        form_3.style.display = "none";
        form_3_btns.style.display = "none";
        order_card.style.display = "none";

        var order = document.createElement("p");
        var AMorPM;

        if(parseInt(time.slice(0,3)) < 12){
            AMorPM = "AM";
        } else {
            AMorPM = "PM";
        }

        order.innerHTML = "Full Name: " + fullName + "<br>Email: " + email + "<br>Expert: " + expert + "<br>Service: " 
        + service + "<br>Date: " + date + "<br>Time: " + time + " " + AMorPM + "<br>Appointment Notes: " + notes;

        done_page.appendChild(order);
        done_page.style.display = "block";

        document.querySelector(".btn-outline-dark").style.display = "block";
    }
})
