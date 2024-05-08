import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { ulid } from 'ulidx';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  let objectKey = ulid();
  let assistantId = getId(request);

  try {

    let configuration = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    }
    // @ts-ignore
    const client = new S3Client(configuration);
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_S3_BUCKET ? process.env.AWS_S3_BUCKET : '',
      Key: assistantId + '/' + objectKey,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return Response.json({ url, fields }, { status: 201 })
  } catch (error:any) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}