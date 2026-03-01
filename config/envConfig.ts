const getBackendBaseUrl = () => {
  console.log(
    "process.env.NEXT_PUBLIC_BACKEND_BASE_URL",
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  );
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }
  // For Vercel SSR
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return "http://localhost:3000/api";
};

export const getAppBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return "http://localhost:3000";
};

export const envConfig = {
  backendBaseUrl: getBackendBaseUrl(),
  appBaseUrl: getAppBaseUrl(),

  mode: process.env.NODE_ENV === "development",
  isDevlopment: process.env.NODE_ENV === "development",

  mongoUri: process.env.DATABASE_URL,
  authSecret: process.env.AUTH_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    secret_key: process.env.CLOUDINARY_SECRET_KEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  },
};
