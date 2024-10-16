import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(fileBuffer, fileName, fileType) {
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

  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: myAWSBucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType,
      ACL: "public-read",
    }));
    return `https://${myAWSBucket}.s3.amazonaws.com/${fileName}`;
  } catch (err) {
    throw new Error('S3 Upload failed: ' + err.message);
  }
}
