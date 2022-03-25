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
  formDelivery.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault();
    saveData(targetElement.name); 
    window.location.href = targetElement.action;
  });

}
if(formPayment) {
  getFormData(formPayment.name);
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
