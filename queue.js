const concurrentRequest = process.env["CONCURRENT_REQUEST"] || 10;

class TaskQueue {
  constructor(concurrent = 1) {
    this.queue = [];
    this.concurrent = concurrent;
    this.running = 0; // Số lượng job đang chạy
  }

  async enqueue(task) {
    console.log(`1. Job được thêm vào hàng đợi. Queue size: ${this.queue.length + 1}`);
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    console.log(
      `2. Gọi processQueue. Số job đang chạy: ${this.running}, Queue size: ${this.queue.length}`
    );

    // Nếu số job đang chạy đã đạt đến limit hoặc queue trống, dừng xử lý
    if (this.running >= this.concurrent || this.queue.length === 0) {
      console.log(`2,5. Queue bị đầy hoặc không có job để xử lý. Tạm dừng.`);
      return;
    }
	console.log(1111)
    // Lấy một job từ queue ra (FIFO)
    const { task, resolve, reject } = this.queue.shift();
	console.log(2222)
    this.running++; // Tăng số lượng job đang chạy
    console.log(
      `3. Job bắt đầu. Số job đang chạy: ${this.running}, Queue size: ${this.queue.length}`
    );


    try {
	console.log(3333)
      const result = await task(); // Xử lý job
      console.log(`4. Job hoàn thành. Result: ${result}`);
      resolve(result);
    } catch (error) {
      console.error(`5. Job thất bại. Error:`, error);
      reject(error);
    } finally {
      this.running--; // Giảm số lượng job đang chạy
      console.log(
        `6. Job kết thúc. Số job đang chạy: ${this.running}, Queue size: ${this.queue.length}`
      );
      this.processQueue(); // Gọi lại processQueue để xử lý job tiếp theo nếu có
    }
  }
}

const taskQueue = new TaskQueue(3); // Giới hạn 10 job chạy cùng lúc

// Một hàm giả lập các job
// const createJob = (id, delay) => () => {
//   console.log(`Job ${id} được tạo và bắt đầu.`);
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       console.log(`Job ${id} hoàn tất sau ${delay}ms.`);
//       resolve(`Kết quả job ${id}`);
//     }, delay)
//   );
// };

// // Thêm 15 job với các độ trễ khác nhau vào hàng đợi
// for (let i = 1; i <= 15; i++) {
//   const delay = 500 + i * 100; // Mỗi job mất 500ms + thêm 100ms mỗi job
//   taskQueue.enqueue(createJob(i, delay)).then((result) => {
//     console.log(`Đã xử lý hoàn tất: ${result}`);
//   });
// }

const run = async () => {
	const tasks = Array.from({ length: 5 }, (_, i) => i);
	console.log('Tasks created', tasks.length);
	console.log('Starting tasks');
	// await Promise.all(
	// 	tasks.map((i) => taskQueue.enqueue(() => new Promise((resolve) => setTimeout(() => resolve(i), 1000))))
	// );
	// for (let i = 0; i < tasks.length; i++) {
	// 	await taskQueue.enqueue(() => new Promise((resolve) => setTimeout(() => resolve(i), 1000)));
	// }

	// asynchronous
	tasks.forEach(async (i) => taskQueue.enqueue(() => new Promise((resolve) => setTimeout(() => resolve(i), 1000))));

	// synchronous
	// for (const i of tasks) {
	// 	await taskQueue.enqueue(() => new Promise((resolve) => setTimeout(() => resolve(i), 1000)));
	// }
	console.log('All tasks completed');
}

run();