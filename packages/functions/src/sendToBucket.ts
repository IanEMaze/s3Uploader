import { S3 } from 'aws-sdk';

const s3 = new S3();
const bucketName = process.env.BUCKET_NAME || '';

export const sendImage = async (fileName: string, body: string) => {
  const decodedBody = Buffer.from(body, 'base64');

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: decodedBody,
  };

  await s3.upload(params).promise();
};

export const handler = async (event: {
  headers: { [x: string]: string };
  body: string;
}) => {
  try {
    const key: string = event.headers['x-filename'];
    const { body } = event;

    await sendImage(key, body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image uploaded successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
