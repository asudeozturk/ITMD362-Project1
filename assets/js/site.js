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


var newBillingRadio = document.querySelector('#different');
var newBillingAddress = document.querySelector('#new-billing-address');

newBillingAddress.setAttribute('disabled', 'disabled');
newBillingAddress.setAttribute('aria-hidden', 'true');

newBillingRadio.addEventListener("RadioStateChange", function(event) {
  if(event.target.checked) {
    newBillingAddress.removeAttribute('disabled');
    newBillingAddress.setAttribute('aria-hidden', 'false');
  } else {
    newBillingAddress.setAttribute('disabled', 'disabled');
    newBillingAddress.setAttribute('aria-hidden', 'true');
  }
});
