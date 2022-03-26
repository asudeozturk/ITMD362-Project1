'use strict';

var summary = document.querySelector('#summary');
var smHeader = document.querySelector('#summary-header');
var smItems = document.querySelector('#summary-items');
var smFooter = document.querySelector('#summary-footer');
var showButton = document.querySelector('#show-btn');

if(window.innerWidth < 800){
  closeSummary();
  smHeader.classList.add('js');
  smItems.classList.add('js');
  smFooter.classList.add('js');
}

showButton.addEventListener('click', function(event) {
  if(showButton.innerText === "Show")
    openSummary();   
  else
    closeSummary();
});

window.addEventListener('resize', function(event) {
  if(window.innerWidth >=800) {
    openSummary();
    smHeader.classList.remove('js');
    smItems.classList.remove('js');
    smFooter.classList.remove('js');
  }
  else if(window.innerWidth < 800 && !smHeader.classList.contains("js")) {
    closeSummary();
    smHeader.classList.add('js');
    smItems.classList.add('js');
    smFooter.classList.add('js');
  }
  
});

function openSummary() {
  showButton.innerText = "Hide";
    smHeader.setAttribute('aria-hidden', 'false');
    smItems.setAttribute('aria-hidden', 'false');
    smFooter.setAttribute('aria-hidden', 'false');
    smHeader.removeAttribute('disabled');
    smItems.removeAttribute('disabled');
    smFooter.removeAttribute('disabled');
}
function closeSummary() {
  showButton.innerText = "Show";
  smHeader.setAttribute('aria-hidden', 'true');
  smItems.setAttribute('aria-hidden', 'true');
  smFooter.setAttribute('aria-hidden', 'true');
  smFooter.setAttribute('aria-hidden', 'true');
  smHeader.setAttribute('disabled', 'disabled');
  smItems.setAttribute('disabled', 'disabled');
  smFooter.setAttribute('disabled', 'disabled');
}
var formPersonal = document.querySelector('form[name=personal-info]');
var formDelivery = document.querySelector('form[name=delivery-info]');
var formPayment = document.querySelector('form[name=payment]');
var reviewPage = document.querySelector('#review-page');

if(formPersonal) {
  getFormData(formPersonal.name);
  formPersonal.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault(); 
    if(checkInputPersonal()){
      saveData(targetElement.name); 
      window.location.href = targetElement.action;
    }
  });
}
if(formDelivery) {
  getFormData(formDelivery.name);
  handlePrice();
  handleGiftOption();
  renderDeliveryData();
  formDelivery.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault();
    if(checkInputDelivery()){
      saveData(targetElement.name); 
      window.location.href = targetElement.action;
    }
  });

}
if(formPayment) {
  getFormData(formPayment.name);
  handleBillingOption();
  formPayment.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault();
    if(checkInputPayment()){
      saveData(targetElement.name);
      window.location.href = targetElement.action;
    }
  });
}
if(reviewPage){
  showAllData();
}

function saveData(form) {
  var data = getLocalStorage(form);
  var allInputs= document.forms[form].elements;
  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value !== "") {
      if(allInputs[i].name==="billing-option" ||
        allInputs[i].name==="delivery-option" ) {
        if(allInputs[i].checked)
          data[allInputs[i].name] = allInputs[i].value;
      }
      else 
        data[allInputs[i].name] = allInputs[i].value;
    }
  }

  saveJsonData(form, data); 
}

function getLocalStorage(form) {
  var formJs = readJsonData(form);
  if(Object.keys(formJs).length === 0) {
    saveJsonData(form, formJs);
  }
  return formJs;
}

function saveJsonData(form, formJs) {
  localStorage.setItem(form, JSON.stringify(formJs));
}

function readJsonData(form) {
  var formJson = localStorage.getItem(form);
  var formJs = {};

  if(formJson) {
    try {
      formJs = JSON.parse(formJson);
    }
    catch(error) {
      console.error(e);
      formJs = {};
    }
  }
  return formJs;
}

function getFormData(form) {
  var formJs = readJsonData(form);
  var data = Object.entries(formJs);
  var allInputs = document.forms[form].elements;
  for (var i = 0; i < data.length; i++) {
    allInputs[data[i][0]].value = data[i][1];
  }
}

function renderDeliveryData() {
  var gift = document.querySelector('#gift');
  var fullName = document.querySelector('#full-name');
  var phoneNum = document.querySelector('#phone-number');

  var formJs = readJsonData('delivery-info');
  var data = Object.entries(formJs);
  for (var i = 0; i < data.length; i++) {
    if(data[i][0]=== "gift") {
      gift.value =  data[i][1];
    }
  }
  if(gift.value === "off"){
    var formJs = readJsonData('personal-info');
    var data = Object.entries(formJs);
    gift.checked = false;
    for (var i = 0; i < data.length; i++) {
      if(data[i][0]=== "full-name") {
        fullName.value =  data[i][1];
      }
      if(data[i][0]=== "phone-number") {
        phoneNum.value = data[i][1];
      }
    }
  }
  else {
    gift.checked = true;
    for (var i = 0; i < data.length; i++) {
      if(data[i][0]=== "full-name") {
        fullName.value =  data[i][1];
      }
      if(data[i][0]=== "phone-number") {
        phoneNum.value = data[i][1];
      }
    }
  }
  saveData('delivery-info');
}

function handleGiftOption() {
  var gift = document.querySelector('#gift');
  var fullName = document.querySelector('#full-name');
  var phoneNum = document.querySelector('#phone-number');

  if(gift.checked){
    fullName.setAttribute("placeholder", "Recipient's name");
    phoneNum.setAttribute("placeholder", "Recipient's phone");
    fullName.value =null;
    phoneNum.value = null;
    gift.value="on";
  }
  else{
    fullName.setAttribute("placeholder", "");
    phoneNum.setAttribute("placeholder", "");
    gift.value="off";
  }

  gift.addEventListener('change', function(event){
    if(gift.checked){
      fullName.setAttribute("placeholder", "Recipient's name");
      phoneNum.setAttribute("placeholder", "Recipient's phone");
      fullName.value =null;
      phoneNum.value = null;
      gift.value="on";
      saveData('delivery-info');
    }
    else{
      document.querySelector('#full-name').removeAttribute("placeholder");
      document.querySelector('#phone-number').removeAttribute("placeholder");
      gift.value="off";
      saveData('delivery-info');
      renderDeliveryData();
    }
  });
}

function handlePrice() {
  var freeDel = document.querySelector('#free');
  var twoDayDel = document.querySelector('#two-day');
  var oneDayDel = document.querySelector('#one-day');
  var shipping = document.querySelector('#shipping-price');
  var total = document.querySelector('#total-price');

  if(freeDel.checked) {
    shipping.innerText = "$0.00"
    total.innerText = "$93.43";
    saveDeliveryOption("free");
  }
  if(twoDayDel.checked) {
    shipping.innerText = "$7.00"
    total.innerText = "$100.43";
    saveDeliveryOption("two-day");
  }
  if(oneDayDel.checked){
    shipping.innerText = "$10.00";
    total.innerText = "$103.43";
    saveDeliveryOption("one-day");
  }
  
  freeDel.addEventListener("click", function(event) {
    if(event.target.checked) {
      shipping.innerText = "$0.00"
      total.innerText = "$93.43";
      saveDeliveryOption("free");
    }
  });
  twoDayDel.addEventListener("click", function(event) {
    if(event.target.checked) {
      shipping.innerText = "$7.00"
      total.innerText = "$100.43";
      saveDeliveryOption("two-day");
    }
  });
  oneDayDel.addEventListener("click", function(event) {
    if(event.target.checked) {
      shipping.innerText = "$10.00";
      total.innerText = "$103.43";
      saveDeliveryOption("one-day");
    }
  });
}

function handleBillingOption() {
  
  var newBillingAddress = document.querySelector('#new-billing-address');
  var same = document.querySelector('#same');
  var different = document.querySelector('#different');
  
  if(same.checked) {
    newBillingAddress.setAttribute('disabled', 'disabled');
    newBillingAddress.setAttribute('aria-hidden', 'true');
    document.querySelector('#billing-address').required = false;
    document.querySelector('#billing-city').required = false;
    document.querySelector('#billing-state').required = false;
    document.querySelector('#billing-zip').required = false;
    saveBillingOption("same");
  }
  else {
    newBillingAddress.removeAttribute('disabled');
    newBillingAddress.setAttribute('aria-hidden', 'false');
    document.querySelector('#billing-address').required = true;
    document.querySelector('#billing-city').required = true;
    document.querySelector('#billing-state').required = true;
    document.querySelector('#billing-zip').required = true; 
    saveBillingOption("different");
  }

  different.addEventListener("click", function(event) {
    if(event.target.checked) {
      newBillingAddress.removeAttribute('disabled');
      newBillingAddress.setAttribute('aria-hidden', 'false');
      document.querySelector('#billing-address').required = true;
      document.querySelector('#billing-city').required = true;
      document.querySelector('#billing-state').required = true;
      document.querySelector('#billing-zip').required = true;
      saveBillingOption("different");
    } 
  });
  same.addEventListener("click", function(event) {
    if(event.target.checked) {
      newBillingAddress.setAttribute('disabled', 'disabled');
      newBillingAddress.setAttribute('aria-hidden', 'true');
      document.querySelector('#billing-address').required = false;
      document.querySelector('#billing-city').required = false;
      document.querySelector('#billing-state').required = false;
      document.querySelector('#billing-zip').required = false;
      saveBillingOption("same");
    } 
  });
  
}

function saveDeliveryOption(type) {
  var data = getLocalStorage('delivery-info');
  data['delivery-option'] = type;
  saveJsonData('delivery-info', data); 
}

function saveBillingOption(type) {
  var data = getLocalStorage('payment');
  data['billing-option'] = type;
  saveJsonData('payment', data);  
}

function showAllData() {
  var form = readJsonData('personal-info');
  document.querySelector('#name').innerText = form['full-name'];
  document.querySelector('#email').innerText = form['email'];
  document.querySelector('#phone').innerText = form['phone-number'];

  form = readJsonData('delivery-info');
  document.querySelector('#name-s').innerText = form['full-name'];
  document.querySelector('#phone-s').innerText = form["phone-number"];
  document.querySelector('#address-s').innerText = form['shipping-address'] + ' ' 
  + (form['shipping-address-two'] ? form['shipping-address-two']: '')+ ' ' 
  + form['shipping-city'] + ' ' +form['shipping-state'] + ' ' 
  + form['shipping-zip'] + ' ';
  
  form = readJsonData('payment');
  if(form["billing-option"] ==="different"){
    document.querySelector('#address-b').innerText = form['billing-address'] + ' '
    + (form['billing-address-two'] ? form['billing-address-two'] : '') + ' '
    + form['billing-city'] + ' ' + form['billing-state'] + ' ' 
    + form['billing-zip'] + ' ';
  }
  else{
    document.querySelector('#address-b').innerText = document.querySelector('#address-s').innerText;
  }
  document.querySelector('#card-name').innerText = form['card-name'];
  var num = form['card-number'];
  document.querySelector('#card-num').innerText = num.substring(num.length - 4);
}

function checkInputPersonal() {
  var fullName = document.querySelector('#full-name');
  var phoneNum = document.querySelector('#phone-number');
  const regexName = /^[a-z ,.'-]+$/i;
  const regexPhone = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const isValidName = regexName.test(fullName.value);
  const isValidPhone = regexPhone.test(phoneNum.value);

  showError(fullName, isValidName, 'Name cannot contain numbers/special characters except .,\'-');
  showError(phoneNum, isValidPhone, 'Phone number formatted incorrectly');
  
  return isValidName && isValidPhone;

}

function checkInputDelivery() {
  var fullName = document.querySelector('#full-name');
  var phoneNum = document.querySelector('#phone-number');
  var city = document.querySelector('#shipping-city');
  var state = document.querySelector('#shipping-state');
  var zip = document.querySelector('#shipping-zip');
  const regexName = /^[a-z ,.'-]+$/i;
  const regexPhone = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const regexCity = /^[a-zA-z .]+$/;
  const regexZip = /^[0-9]{5}(?:-[0-9]{4})?$/;

  const isValidName = regexName.test(fullName.value);
  const isValidPhone = regexPhone.test(phoneNum.value);
  const isValidCity = regexCity.test(city.value);
  const isValidState = state.value != '--';
  const isValidZip = regexZip.test(zip.value);
  var parentEl = document.querySelector('ol[name=city-state-zip]');
  
  showError(fullName, isValidName, 'Name cannot contain numbers/special characters except .,\'-');
  showError(phoneNum, isValidPhone, 'Phone number formatted incorrectly');
  showError(city, isValidCity, "City cannot contain numbers or special characters",parentEl);
  showError(state, isValidState, "Please select a state", parentEl);
  showError(zip, isValidZip, "ZIP code formatted incorrectly", parentEl);
  
  return isValidName && isValidPhone && isValidCity && isValidState && isValidZip;
}

function checkInputPayment() {
  var city = document.querySelector('#billing-city');
  var state = document.querySelector('#billing-state');
  var zip = document.querySelector('#billing-zip');

  var name = document.querySelector('#card-name');
  var cardNum = document.querySelector('#card-number');
  var cardCvv = document.querySelector('#cvv-number');
  
  const regexName = /^[a-z ,.'-]+$/i;
  const regexCity = /^[a-zA-z .]+$/;
  const regexZip = /^[0-9]{5}(?:-[0-9]{4})?$/;
  const regexCardNum = /^[0-9]{13,19}$/; //accepts 13-19 digits
  const regexCvv = /^[0-9]{3,4}$/;

  var isValidAddress = true;
  var newBillingAddress = document.querySelector('#new-billing-address')

  if(newBillingAddress.getAttribute("disabled") != "disabled") {
    const isValidCity = regexCity.test(city.value);
    const isValidState = state.value != '--';
    const isValidZip = regexZip.test(zip.value);
    isValidAddress = isValidCity && isValidState && isValidZip;
    
    var parentEl = document.querySelector('ol[name=city-state-zip]');
    showError(city, isValidCity, "City cannot contain numbers or special characters",parentEl);
    showError(state, isValidState, "Please select a state", parentEl);
    showError(zip, isValidZip, "ZIP code formatted incorrectly", parentEl);

  }

  const isValidName = regexName.test(name.value);
  const isValidNum = regexCardNum.test(cardNum.value);
  const isValidCvv= regexCvv.test(cardCvv.value);

  var parentEl = document.querySelector('ol[name=expiration-and-cvv]');
  showError(name, isValidName, 'Name cannot contain numbers/special characters except .,\'-');
  showError(cardNum, isValidNum, 'Card number must be 13-19 digits');
  showError(cardCvv, isValidCvv, 'CVV number must be 3-4 digits', parentEl);

  return isValidAddress && isValidName && isValidNum && isValidCvv;

}

function showError(element, condition, errorText, parentEl) {
  var errorClass = element.name + '-error';
  var error = document.querySelector('.' + errorClass);
  if (!condition) {
    if (!error) {
      error = document.createElement('p');
      error.className = errorClass;
      error.innerText = errorText;
      if(parentEl)
        parentEl.after(error);
      else
        element.after(error);
    }
  }
  else {
    if(error)
      error.remove();
  }
}