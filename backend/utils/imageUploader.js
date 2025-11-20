const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = { 
            folder,
            resource_type: 'auto',
            timeout: 60000, // 60 seconds timeout
        };
        if (height) options.height = height;
        if (quality) options.quality = quality;

        console.log('Uploading to Cloudinary:', file.name, 'Size:', file.size);
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log('Upload successful:', result.secure_url);
        return result;
    }
    catch (error) {
        console.log("Error while uploading image to Cloudinary");
        console.log(error);
        throw new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`);
    }
}



// Function to delete a resource by public ID
exports.deleteResourceFromCloudinary = async (url) => {
    if (!url) return;

    try {
        const result = await cloudinary.uploader.destroy(url);
        console.log(`Deleted resource with public ID: ${url}`);
        console.log('Delete Resourse result = ', result)
        return result;
    } catch (error) {
        console.error(`Error deleting resource with public ID ${url}:`, error);
        throw error;
    }
};