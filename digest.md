### bước 1 tạo nonce
tạo 1 nonce ngẫu nhiên có thể bằng uuid

### bước 2 đưa các giá trị vào mã hóa

- nonce
- username
- password
- realm
- method
- uri

### bước 3 tạo hash
h1 = md5(username:realm:password)
h2 = md5(method:uri)
response = md5(h1:nonce:h2)

### bước 4 tạo header
Authorization: Digest username="username", realm="realm", nonce="nonce", uri="uri", response="response", opaque="opaque", qop="qop", nc="nc", cnonce="cnonce"

chú ý header ở đây không có password mà chỉ có response lên server sẽ dùng username để tìm password trong database

### bước 5 gửi request add chuỗi digest va header

### bước 6 server xác thực
- lấy username từ header
- tìm password trong database
- tạo h1, h2, response
- check xem response từ client đã xác thức lần nào chưa(trong cache or database)
- so sánh response từ client và server
- nếu giống nhau thì xác thực thành công
- nếu không thì trả về 401

### lưu lại các response vào database or cache để  so sánh với lần sau