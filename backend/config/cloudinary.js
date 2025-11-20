const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
			secure: true,
			timeout: 60000, // 60 seconds timeout
		});
		console.log('Cloudinary connected successfully');
		console.log('Cloud Name:', process.env.CLOUD_NAME);
	} catch (error) {
		console.log('Cloudinary connection error:', error);
	}
};


