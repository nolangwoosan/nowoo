import { MonsterIdPage } from "@/pages/monster-id";

interface Props {
  params: {
    monsterId: string;
  };
}

export default async function Page({ params }: Readonly<Props>) {
  const { monsterId } = params;

  return <MonsterIdPage monsterId={monsterId} />;
}
