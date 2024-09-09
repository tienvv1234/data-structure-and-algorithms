async function example() {
    try {
      await Promise.reject('Lỗi!')
        .catch((err) => {
            console.log(222222)
          // Bất kỳ lỗi nào ném ra ở đây đều không được bắt bởi try...catch bên ngoài
          throw new Error('Lỗi mới từ catch!');
        });
    } catch (e) {
      // Khối catch này không bắt được lỗi từ bên trong `.catch()`
        console.log(111111)
        console.log('Đã bắt được lỗi:', e.message);
    }
  }
  
  // Gọi ví dụ
  example();

