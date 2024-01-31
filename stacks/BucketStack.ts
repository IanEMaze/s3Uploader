import { StackContext, Bucket } from 'sst/constructs';

export default function s3Bucket({ stack }: StackContext) {
  const bucket = new Bucket(stack, 'image-uploader-bucket');

  stack.addOutputs({
    BucketName: bucket.bucketName,
    BucketArn: bucket.bucketArn,
  });

  return bucket;
}
