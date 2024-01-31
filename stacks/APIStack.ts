import { Api, StackContext, use } from 'sst/constructs';
import s3Bucket from './BucketStack';

export default function API({ stack }: StackContext) {
  const bucket = use(s3Bucket);
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        // Bind the bucket to our API
        bind: [bucket],
        environment: {
          BUCKET_NAME: bucket.bucketName,
          REGION: stack.region,
        },
      },
    },
    routes: {
      'POST /upload': 'packages/functions/src/sendToBucket.handler',
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return api;
}
