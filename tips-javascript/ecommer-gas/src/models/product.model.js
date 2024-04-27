const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';
// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name:{
        type: String,
        required:true,
    },
    product_thumb:{
        type: String,
        required: true,
    },
    product_description: String,
    product_price:{
        type: Number,
        required: true,
    },
    product_quantity:{
        type: Number,
        required: true,
    },
    product_type:{
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture'],
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    product_attributes:{
        type: Schema.Types.Mixed,
        required:true,
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});


const clothingSchema = new Schema({
    brand: {        
        type: String,      
        required: true
    },
    size: String,
    material: String,
}, {
    collection: 'Clothes',
    timestamps: true
});

const electronicSchema = new Schema({
    manufacturer: {        
        type: String,      
        required: true
    },
    model: String,
    color: String,
}, {
    collection: 'Electronics',
    timestamps: true
});

//Export the model
module.exports = {
    Product: model(DOCUMENT_NAME, productSchema),
    Clothing: model('Clothing', clothingSchema),
    Electronic: model('Electronic', electronicSchema)
};