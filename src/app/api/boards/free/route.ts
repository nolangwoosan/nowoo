import supabase from "@/shared/api-helpers/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  if (Number.isNaN(page)) {
    return new Response("page is not a number", { status: 400 });
  }

  const offset = (page - 1) * pageSize;

  const boardsResponse = await supabase
    .from("boards")
    .select(
      `
    id,
    title,
    writer,
    created_dt,
    board_comments (
      id
    )
    `,
      {
        count: "exact",
      },
    )
    .order("created_dt", { ascending: false })
    .range(offset, offset + pageSize - 1)
    .is("deleted_dt", null);

  const boards = boardsResponse.data ?? [];
  const boardsWithCommentCount = [];

  for (const board of boards) {
    const commentsResponse = await supabase
      .from("board_comments")
      .select("id")
      .eq("board_id", board.id)
      .is("deleted_dt", null);

    const commentCount = commentsResponse.data ? commentsResponse.data.length : 0;

    const boardWithCommentCount = {
      ...board,
      comment_count: commentCount,
    };

    boardsWithCommentCount.push(boardWithCommentCount);
  }

  return new Response(
    JSON.stringify({
      count: boardsResponse.count,
      data: boardsWithCommentCount,
    }),
  );
}
