describe('Personal Info Form', function() {

  
    it('Should display error on incorrect name and phone format', function(browser) {
      browser
        .url('http://localhost:8080/')
        .setValue('input[name="full-name"]', 'Asu123')
        .setValue('input[name="email"]', 'aozturk2@hawk.iit.edu')
        .setValue('input[name="email"]', '123456789+')
        .click('button[type=submit]', function(result) {
            this.assert.visible('.title-error')
            this.assert.visible('.phone-number-error')
            this.assert.textContains('.full-name-error', 'Name cannot contain numbers/special characters except .,\'-')
            this.assert.textContains('.phone-number-error', 'Phone number formatted incorrectly')
        })
    });
  
  
  });