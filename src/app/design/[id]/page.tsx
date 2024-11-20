export default async function Workspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <h1>Workspace: {id}</h1>
    </div>
  );
}
