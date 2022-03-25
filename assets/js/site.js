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
  formPersonal.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault(); 
    window.location.href = targetElement.action;
  });
}
if(formDelivery) {
  formDelivery.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault(); 
    window.location.href = targetElement.action;
  });

}
if(formPayment) {
  formPayment.addEventListener('submit', function(event) {
    var targetElement = event.target;
    event.preventDefault(); 
    window.location.href = targetElement.action;
  });
}
