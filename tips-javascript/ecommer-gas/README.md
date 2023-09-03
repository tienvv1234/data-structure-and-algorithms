### mongodb
1. Nhươc điểm của cách kết nỗi cũ
2. Cách kết nối mới
3. kiểm tra hệ thông có bao nhiêu kết nối
4. thông báo khi server quá tải connect
5. có nên disConnect liên tục không
   - không cần thiết nó sử dung connection pool để đóng mở kết nói khi cần
6. poolSize là gì
    maxPoolSize là khởi tạo sắn các kết nối trong pool
7. vượt quá poolSize thì sao
   - khi vượt quá poolSize thì sẽ cho vào hàng đợi và chờ đến khi có kết nối free