import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

// 리포트 PDF는 이 시간이 지나면 서명 URL이 더 이상 유효하지 않습니다.
const DOWNLOAD_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7일

export async function uploadReportPdf(key: string, buffer: Buffer): Promise<string> {
  const s3 = getClient();
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: "application/pdf",
    })
  );

  return getReportDownloadUrl(key);
}

export async function getReportDownloadUrl(key: string): Promise<string> {
  const s3 = getClient();
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }),
    { expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS }
  );
}
