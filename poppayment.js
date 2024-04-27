
const url = 'https://pay.veritrans.co.jp/pop/v1/payment-key';

const POP_SERVER_KEY = '79f5f285-a7a1-4e65-bdc9-f7683f644e96';

const AUTH_STRING = Buffer.from(POP_SERVER_KEY + ':').toString('base64'); // 'VGVzdC1QT1AtU2VydmVyLUtleTo='

const headers = new Headers({
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Basic ${AUTH_STRING}`,
});

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    "order_id": "ORDER-0001",
    "gross_amount": 10000,
    "dummy": true,
    "success_url": "https://www.example.com/success",
    "card": {
        "mpi": true,
        "paynow_account_id": "TEST-ACCOUNT-101",
        "save_card": "always",
        "skip_card_selection": false
    }
}),
};

// Use the Fetch API to send the request
fetch(url, requestOptions)
  .then(response => {
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    console.log('Payment Key retrieved:', data); // Handle the response data
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });