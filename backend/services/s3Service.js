import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; 


function setup(){
  const myAWSAccessKey = process.env.AWS_ACCESS_KEY;
  const myAWSSecretKey = process.env.AWS_SECRET_KEY;
  const myAWSBucket = process.env.AWS_BUCKET;

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: myAWSAccessKey,
      secretAccessKey: myAWSSecretKey,
    },
  });
  return [myAWSBucket, s3Client];
}

export async function uploadToS3(fileBuffer, fileName, fileType) {
  const [myAWSBucket, s3Client] = setup();

  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: myAWSBucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType,
      //ACL: "public-read",
    }));
    return `https://${myAWSBucket}.s3.amazonaws.com/${fileName}`;
  } catch (err) {
    throw new Error('S3 Upload failed: ' + err.message);
  }
}

export async function getSignedUrlForS3Object(key) {
  const [myAWSBucket, s3Client] = setup();

  const command = new GetObjectCommand({
    Bucket: myAWSBucket,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}


export async function fetchImagesWithUrls(images) {
  if (!Array.isArray(images)) {
    throw new Error('Input should be an array of images');
  }

  const imagesWithUrls = await Promise.all(images.map(async (image) => {
    // Ensure image is defined and properly formatted
    if (!image || !image.imageUrl) { // Check for imageUrl instead of image
      throw new Error('Invalid image data');
    }

    const key = image.imageUrl.split('/').pop(); // Extract the file name from the URL
    const preSignedUrl = await getSignedUrlForS3Object(key); // Generate pre-signed URL

    return {
      ...image,
      preSignedUrl, // Add pre-signed URL to the image object
    };
  }));

  return imagesWithUrls; // Return the array of images with URLs
}
