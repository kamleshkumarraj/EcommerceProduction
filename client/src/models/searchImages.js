// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// Load MobileNet model
// Function to load an image from a URL
// Function to load an image from a URL
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Allow cross-origin images
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
}

// Function to extract features from an image
async function extractFeatures(imgElement, model) {
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
    // Reshape the vectors to 1D tensors
    vectorA = vectorA.reshape([-1]); // Flatten to shape [1024]
    vectorB = vectorB.reshape([-1]); // Flatten to shape [1024]

    // Calculate the dot product
    const dotProduct = tf.dot(vectorA, vectorB);

    // Calculate the magnitudes
    const magnitudeA = tf.norm(vectorA);
    const magnitudeB = tf.norm(vectorB);

    // Calculate the cosine similarity
    const similarity = dotProduct.div(magnitudeA.mul(magnitudeB));

    return similarity;
}

// Function to search for similar products
async function searchSimilarProducts(userImageUrl, productImageUrls, model) {
    // Load the user-provided image
    const userImage = await loadImage(userImageUrl);

    // Extract features from the user-provided image
    const userFeatures = await extractFeatures(userImage, model);

    // Compare with features of product images
    const similarities = [];
    for (const productImageUrl of productImageUrls) {
        const productImage = await loadImage(productImageUrl);
        const productFeatures = await extractFeatures(productImage, model);
        const similarity = await cosineSimilarity(userFeatures, productFeatures);
        similarities.push(similarity.dataSync()[0]);
    }

    // Sort products by similarity
    const sortedProducts = productImageUrls
        .map((productUrl, index) => ({ productUrl, similarity: similarities[index] }))
        .sort((a, b) => b.similarity - a.similarity);

    return sortedProducts;
}

// Example usage
export async function run({userImages, productsImages }) {
    // Load the MobileNet model
    const model = await mobilenet.load();
    console.log('Model loaded');

    // User-provided image URL
    const userImageUrl =  userImages;

    // Product image URLs
    const productImageUrls = productsImages;

    // Search for similar products
    const similarProducts = await searchSimilarProducts(userImageUrl, productImageUrls, model);
    console.log('Similar Products:', similarProducts);
}

// Run the example


// Run the example
