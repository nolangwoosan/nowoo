import { ItemIdPage } from "src/pages/item-id";

interface Props {
  params: {
    itemId: string;
  };
}

export default async function Page({ params }: Readonly<Props>) {
  return <ItemIdPage itemId={params.itemId} />;
}
