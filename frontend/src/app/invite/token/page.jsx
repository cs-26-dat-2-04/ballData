import HomePage from "./HomePage";

export default async function Page({ params }) {
  const { token } = params;
  
const res = await fetch(`http://backend:3001/invite/${token}`);
console.log("Status:", res.status);
const data = await res.json();
console.log("Data:", data);
  if (!res.ok) return <p>Invalid or expired invite link</p>;

  return <HomePage token={token} />;
}