// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// Load MobileNet model
let model;
async function loadModel() {
    model = await mobilenet.load();
    console.log('Model loaded');
}

// Function to extract features from an image
async function extractFeatures(imgElement) {
    // Convert the image to a tensor
    const imgTensor = tf.browser.fromPixels(imgElement).toFloat();

    // Resize the image to the input size expected by MobileNet (224x224)
    const resizedImg = tf.image.resizeBilinear(imgTensor, [224, 224]);

    // Normalize the image to the range [-1, 1]
    const normalizedImg = resizedImg.div(tf.scalar(127)).sub(tf.scalar(1));

    // Add a batch dimension
    const batchedImg = normalizedImg.expandDims(0);

    // Get the embeddings (feature vector) from the model
    const embeddings = model.infer(batchedImg, 'conv_preds');

    return embeddings;
}

// Function to compare feature vectors using cosine similarity
function cosineSimilarity(vectorA, vectorB) {
    const dotProduct = tf.dot(vectorA, vectorB);
    const magnitudeA = tf.norm(vectorA);
    const magnitudeB = tf.norm(vectorB);
    return dotProduct.div(magnitudeA.mul(magnitudeB));
}

// Function to search for similar products
async function searchSimilarProducts(userImage, productImages) {
    // Extract features from the user-provided image
    const userFeatures = await extractFeatures(userImage);

    // Compare with features of product images
    const similarities = [];
    for (const productImage of productImages) {
        const productFeatures = await extractFeatures(productImage);
        const similarity = cosineSimilarity(userFeatures, productFeatures);
        similarities.push(similarity.dataSync()[0]);
    }

    // Sort products by similarity
    const sortedProducts = productImages
        .map((product, index) => ({ product, similarity: similarities[index] }))
        .sort((a, b) => b.similarity - a.similarity);

    return sortedProducts;
}

// Example usage
async function run() {
    // Load the model
    await loadModel();
    // const productsImage = await 
    // Get the user-provided image (e.g., from an <input> element)
    const userImage = document.getElementById('user-image');

    // Get product images (e.g., from an array of image elements)
    const productImages = [
        document.getElementById('product1'),
        document.getElementById('product2'),
        document.getElementById('product3'),
    ];

    // Search for similar products
    const similarProducts = await searchSimilarProducts(userImage, productImages);
    console.log('Similar Products:', similarProducts);
}

// Run the example
run();