import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand
  } from "@aws-sdk/client-s3";

  

const cfai  = process.env.CLOUDFLARE_ACCOUNT_ID ? process.env.CLOUDFLARE_ACCOUNT_ID : "";
const cfaki = process.env.CLOUDFLARE_ACCESS_KEY_ID ? process.env.CLOUDFLARE_ACCESS_KEY_ID : "";
const cfsk  = process.env.CLOUDFLARE_SECRET_KEY ? process.env.CLOUDFLARE_SECRET_KEY : "";

// const s3 = new S3({
//     endpoint: `https://${cfai}.r2.cloudflarestorage.com`,
//     accessKeyId: `${cfaki}`,
//     secretAccessKey: `${cfsk}`,
//     signatureVersion: 'v4',
// });

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${cfai}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: cfaki,
      secretAccessKey: cfsk,
    },
  });

export async function pushToR2 (bucket: string, key: string, body: Buffer): Promise<string> {
    console.log(`https://${cfai}.r2.cloudflarestorage.com`)
    const params = {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: 'image/jpeg',
    };
    try {
        const poc = new PutObjectCommand(params);
        await S3.send(poc);
        console.log(`Successfully pushed to R2 bucket: ${bucket} with key: ${key}`);
        return key;
    } catch (err) {
        console.error(`Failed to push to R2 bucket: ${bucket} with key: ${key}`, err);
        throw err;
    }
};
