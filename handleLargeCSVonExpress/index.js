const csv = require('csv');
const express = require('express');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const app = express();
const { Readable } = require('stream');

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'my.csv');
    const readStream = fs.createReadStream(filePath);
    
    readStream.pipe(csv.parse()).pipe(csv.stringify()).pipe(res);
});

app.get('/downloadcsv', (req, res) => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            code: `物件コード-${i}`,
            name: `物件名-${i}`,
            address: `住所-${i}`,
            owner: `オーナー名-${i}`,
        });
    }
    const fileName = 'properties.csv';
    const csvHeaders = [
        { key: 'code', header: '物件コード' },
        { key: 'name', header: '物件名' },
        { key: 'address', header: '住所' },
        { key: 'owner', header: 'オーナー名' },
    ];

    csv.stringify(data, { header: true, columns: csvHeaders }, (err, output) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(output);
        // const shiftJisBuffer = iconv.encode(output, 'Shift_JIS');
        // fs.writeFileSync(fileName, shiftJisBuffer);

        // res.setHeader(
		// 				'Content-disposition',
		// 				`attachment; filename=${fileName}`,
		// 			);
        // res.setHeader('Content-type', 'text/csv');
        // fs.createReadStream(fileName).pipe(res);
        // I don't want to create a properties file in the server
        // how can I encode Shift_JIS and send it to the client?
        
        const shiftJisBuffer = iconv.encode(output, 'Shift_JIS');
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-type', 'text/csv');
        // res.send(shiftJisBuffer);
        fs.createReadStream(fileName, {
            
        }).pipe(res);
    });
});

app.get('/downloads', (req, res) => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            code: `物件コード-${i}`,
            name: `物件名-${i}`,
            address: `住所-${i}`,
            owner: `オーナー名-${i}`,
        });
    }
    const fileName = 'properties.csv';
    const csvHeaders = [
        { key: 'code', header: '物件コード' },
        { key: 'name', header: '物件名' },
        { key: 'address', header: '住所' },
        { key: 'owner', header: 'オーナー名' },
    ];

    csv.stringify(data, { header: true, columns: csvHeaders }, (error, output) => {
        if (error) {
            return next(error);
        }
    
        const readableStream = new Readable();
        readableStream.push(iconv.encode(output, 'Shift_JIS')); // push your data to the stream
        readableStream.push(null); // indicates that no more data will be pushed
    
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'text/csv');
    
        readableStream.pipe(res); // pipe the readable stream to the response
    });
});

// app.get('/download', (req, res) => {
//     const filePath = path.join(__dirname, 'my.csv');
//     res.download(filePath);
// });

// steam the file my.csv
app.get('/stream', (req, res) => {
    const filePath = path.join(__dirname, 'my.csv');
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

app.get('/download-write-one', (req, res) => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            code: `物件コード-${i}`,
            name: `物件名-${i}`,
            address: `住所-${i}`,
            owner: `001`,
        });
    }
    const fileName = 'properties.csv';
    const csvHeaders = [
        { key: 'code', header: '物件コード' },
        { key: 'name', header: '物件名' },
        { key: 'address', header: '住所' },
        { key: 'owner', header: 'オーナー名' },
    ];

    csv.stringify(data, { 
        header: true, 
        columns: csvHeaders, 
        quoted_string: true,
        quoted_empty: true,
        quoted_match: /""/g
    }, (error, output) => {
        console.log(1)
        if (error) {
            return next(error);
        }
        console.log(1, output)
        const shiftJisBuffer = iconv.encode(output, 'Shift_JIS');

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'text/csv');
        res.write(shiftJisBuffer);
        res.end();
    })
});

app.get('/download-write-chunk', (req, res) => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            code: `物件コード-${i}`,
            name: `物件名-${i}`,
            address: `住所-${i}`,
            owner: `オーナー名-${i}`,
        });
    }
    const fileName = 'properties.csv';
    const csvHeaders = [
        { key: 'code', header: '物件コード' },
        { key: 'name', header: '物件名' },
        { key: 'address', header: '住所' },
        { key: 'owner', header: 'オーナー名' },
    ];

    csv.stringify(data, { header: true, columns: csvHeaders }, (error, output) => {
        if (error) {
            return next(error);
        }

        const shiftJisBuffer = iconv.encode(output, 'Shift_JIS');
        const chunkSize = 1024; // Set the desired chunk size

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'text/csv');

        let offset = 0;
        while (offset < shiftJisBuffer.length) {
            const chunk = shiftJisBuffer.slice(offset, offset + chunkSize);
            res.write(chunk);
            offset += chunkSize;
        }

        res.end();
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
