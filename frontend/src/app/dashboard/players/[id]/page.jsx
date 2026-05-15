export default async function Players({ params }) {
  const { id } = await params;
  return <p>{id}</p>;
}
