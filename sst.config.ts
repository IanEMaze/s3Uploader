import { SSTConfig } from 'sst';
import s3Bucket from './stacks/BucketStack';
import API from './stacks/APIStack';
import FrontEndStack from './stacks/FrontEndStack';

export default {
  config() {
    return {
      name: 's3-image-uploader',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(s3Bucket).stack(API).stack(FrontEndStack);
  },
} satisfies SSTConfig;
