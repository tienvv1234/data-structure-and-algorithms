### generator function
question: what kind of task a generator function is better than a normal function?
answer from copilot: A generator function is better than a normal function when the task is to generate a sequence of values. A generator function can generate a sequence of values one at a time, which is more memory-efficient than generating all values at once.
real answer: 
- normal function: can only have one return statement called, whereas can have many huge instructions(many calls)
- generator function: in case get data from database or file, it is better to use generator function, because it can return data one by one, not all at once. It is more memory-efficient than generating all values at once.
- Video player: when we want to play a video, we can use generator function to play video frame by frame, not all at once. It is more memory-efficient than generating all frames at once.(case study: a user can watch a video right after first part of video is loaded, not wait until all video is loaded.)
- best practice: to process data on demand to send data to other steps or tasks as it's available piece by piece, so you can process small amount of data asynchronusly, not all at once.

// https://www.youtube.com/watch?v=edaYw9UhQ0M