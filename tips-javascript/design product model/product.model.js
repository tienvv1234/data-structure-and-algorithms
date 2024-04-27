// const p1 = {
//     "_id": ObjectId("62a17a9edc2048a3b9eb654c"),
//     "code": 'CAMERA-0001',
//     "name": "X7800",
//     "brand": "Cannon",
//     "description": "The mamera with the highest resolution",
//     "release_date": ISODate("2022-06-09T04:44:14.544Z"),
//     "weight_g": 365,
//     "specs": [
//         {"resolution_Mp": 36},
//         {"technology": "ANS-3000"},
//         {"height": 98},
//         {"width": 125},
//         {"depth": 70},
//         {"video_resolution": "1920 x 1080"}
//     ]
// },
// {
//     "_id": ObjectId("62a17a9edc2048a3b9eb654d"),
//     "code": "NGK-12345",
//     "name": "Nha gia kim",
//     "brand": "Amazon",
//     "description": "A book to understand about me",
//     "release_date": ISODate("2022-06-09T04:44:14.544Z"),
//     "weight_g": 365,
//     "specs": [
//         {"author": "Paulo Coelho"},
//         {"editor": "Amazon"},
//         {"pages": 100}
//     ]
// }

// combine polymorphic and attribute
const product = [
    {
        "_id": ObjectId("5e8b6f9f0d0d9d0d0d0d0d0d"),
        "name": "Product 1",
        "code": "P1",
        "brand": "Brand 1",
        "description": "Description 1", // chuyển về  không dâu để tìm kiếm
        "release_date": "2020-01-01",
        "weight": "100",
        "spec": [
            {k: "resolution", v: "1920x1080", u: "px"},
            {K: "technology", V: "LED", U: "inch"}
        ]
    }
]

// products.createIndex({"spec.k": 1, "spec.v": 1}, {unique: true})