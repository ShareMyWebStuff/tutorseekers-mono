// 👇 Configures test environment to use UTC timezone
export default async () => {
  process.env.TZ = "UTC";
};
