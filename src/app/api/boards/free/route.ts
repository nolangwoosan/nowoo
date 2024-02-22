import { prisma } from "@/shared/api-helpers/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  if (Number.isNaN(page)) {
    return new Response("page is not a number", { status: 400 });
  }

  const offset = (page - 1) * pageSize;

  const boards = await prisma.board.findMany({
    select: {
      _count: true,
      boardIdx: true,
      title: true,
      writer: true,
      createdDt: true,
      commnets: {
        select: {
          commentIdx: true,
        },
      },
    },
    orderBy: {
      createdDt: "desc",
    },
    skip: offset,
    take: pageSize,
    where: {
      deletedDt: null,
    },
  });

  const boardsWithCommentCount = [];

  for (const board of boards) {
    const comments = await prisma.comment.findMany({
      select: {
        commentIdx: true,
      },
      where: {
        boardId: board.boardIdx,
        deletedDt: null,
      },
    });

    const boardWithCommentCount = {
      ...board,
      comment_count: comments.length,
    };

    boardsWithCommentCount.push(boardWithCommentCount);
  }

  return new Response(
    JSON.stringify({
      count: await prisma.board.count(),
      data: boardsWithCommentCount,
    }),
  );
}
