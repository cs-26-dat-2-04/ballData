import HomePage from "./HomePage";

export default async function Page({ params }) {
  const { token } = await params;

  const res = await fetch(`http://backend:3001/invite/${token}`);
  console.log("Token:", token);
  console.log("Status:", res.status);

  if (!res.ok) return <p>Invalid or expired invite link</p>;

  return <HomePage />;
}