# Sử dụng một runtime Node.js chính thức làm hình ảnh cơ sở
FROM node:14

# Đặt thư mục làm việc trong container thành /app
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói cần thiết được chỉ định trong package.json
RUN npm install

# Sao chép phần còn lại của ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 3000 cho thế giới bên ngoài
EXPOSE 3000

# Chạy pool2.js khi container khởi động
CMD ["node", "pool2.js"]