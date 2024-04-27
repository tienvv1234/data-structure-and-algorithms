const crypto = require('crypto');

// Tạo một cặp khóa công khai và khóa riêng
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,  // Độ dài bit của modulus (một số nguyên lớn)
});

// Dữ liệu cần ký
const data = 'Các dữ liệu cần ký được đặt ở đây';

// Tạo chữ ký
const sign = crypto.createSign('SHA256');
sign.update(data);
const signature = sign.sign(privateKey, 'hex');

console.log('Chữ ký là: ', signature);

// Xác minh chữ ký
const verify = crypto.createVerify('SHA256');
verify.update(data);
const isVerified = verify.verify(publicKey, signature, 'hex');

console.log('Xác minh chữ ký: ', isVerified ? 'Thành công' : 'Thất bại');

// npm install express body-parser crypto

// const crypto = require('crypto');
// const express = require('express');
// const bodyParser = require('body-parser');

// // Khởi tạo app
// const app = express();
// app.use(bodyParser.json());

// // Tạo cặp khóa mô phỏng (Trong thực tế, khóa công khai sẽ được lưu trữ bên phía client)
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
// });

// // Endpoint đăng ký thông tin
// app.post('/register', (req, res) => {
//   const { data, signature } = req.body;

//   // Xác thực chữ ký
//   const verify = crypto.createVerify('SHA256');
//   verify.update(data);
//   const isVerified = verify.verify(publicKey, signature, 'hex');

//   if (isVerified) {
//     res.status(200).send('Chữ ký hợp lệ. Đăng ký thành công.');
//   } else {
//     res.status(400).send('Chữ ký không hợp lệ. Đăng ký thất bại.');
//   }
// });

// // Start server
// app.listen(5000, () => console.log('App đang chạy trên cổng 5000'));

// // Mô phỏng request từ client
// const requestSimulation = () => {
//   const data = 'Thông tin đăng ký';

//   // Tạo chữ ký
//   const sign = crypto.createSign('SHA256');
//   sign.update(data);
//   const signature = sign.sign(privateKey, 'hex');

//   // Gửi request tới 'register' API
//   // Tham số gồm dữ liệu đăng ký và chữ ký số
//   // ...
// };

// requestSimulation();