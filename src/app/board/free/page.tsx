import { FreeBoardPage } from "src/pages/board";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function Page({ searchParams }: Readonly<Props>) {
  return <FreeBoardPage page={searchParams.page} />;
}
