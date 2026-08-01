export interface AgeEstimate {
  age: number;
  ageRangeLabel: string;
}

type FaceApiModule = typeof import("@vladmandic/face-api");

let faceApiPromise: Promise<FaceApiModule> | null = null;

async function loadFaceApi(): Promise<FaceApiModule> {
  if (!faceApiPromise) {
    faceApiPromise = import("@vladmandic/face-api").then(async (faceapi) => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ]);
      return faceapi;
    });
  }
  return faceApiPromise;
}

export interface AgeRangeMessages {
  ageRangeUnderTen: string;
  ageRangeDecade: string;
}

function formatAgeRange(age: number, messages: AgeRangeMessages): string {
  const rounded = Math.round(age);
  const decade = Math.floor(rounded / 10) * 10;
  if (decade < 10) {
    return messages.ageRangeUnderTen.replace("{age}", String(rounded));
  }
  return messages.ageRangeDecade
    .replace("{decade}", String(decade))
    .replace("{age}", String(rounded));
}

export async function estimateAge(
  video: HTMLVideoElement,
  messages: AgeRangeMessages
): Promise<AgeEstimate | null> {
  const faceapi = await loadFaceApi();
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withAgeAndGender();
  if (!detection) return null;
  return {
    age: detection.age,
    ageRangeLabel: formatAgeRange(detection.age, messages),
  };
}
