'use strict';
var navigationBar = document.querySelector('#checkout-nav');
var summary = document.querySelector('#summary');

navigationBar.setAttribute('disabled', 'disabled');
navigationBar.setAttribute('aria-hidden', 'true');
summary.setAttribute('disabled', 'disabled');
summary.setAttribute('aria-hidden', 'true');

if(window.innerWidth >= 450) { //show checkout-nav at minimum 400px
  navigationBar.removeAttribute('disabled');
  navigationBar.setAttribute('aria-hidden', 'false');
}
if(window.innerWidth >= 800) { //show summary at minimum 800px
  summary.removeAttribute('disabled');
  summary.setAttribute('aria-hidden', 'false');
}

window.addEventListener('resize', function(event) {
  if(window.innerWidth >= 450) {
    navigationBar.removeAttribute('disabled');
    navigationBar.setAttribute('aria-hidden', 'false');
  } else {
    navigationBar.setAttribute('disabled', 'disabled');
    navigationBar.setAttribute('aria-hidden', 'true');
  }

  if(window.innerWidth >= 800) {
    summary.removeAttribute('disabled');
    summary.setAttribute('aria-hidden', 'false');
  } else {
    summary.setAttribute('disabled', 'disabled');
    summary.setAttribute('aria-hidden', 'true');
  }
});

var formPersonal = document.querySelector('form[name=personal-info]');
var formDelivery = document.querySelector('form[name=delivery-info]');
var formPayment = document.querySelector('form[name=payment]');

if(formPersonal) {
  getFormData(formPersonal.name);
  formPersonal.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault(); 
    saveData(targetElement.name); 
    window.location.href = targetElement.action;
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
    saveData(targetElement.name); 
    window.location.href = targetElement.action;
  });

}
if(formPayment) {
  getFormData(formPayment.name);
  handleBillingOption();
  formPayment.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault();
    saveData(targetElement.name);
    window.location.href = targetElement.action;
  });
}

function saveData(form) {
  var data = getLocalStorage(form);
  var allInputs= document.forms[form].elements;
  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value !== "") {
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