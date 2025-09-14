import ClientComponent from "@/components/client-component";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      book/{id} Page입니다
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
