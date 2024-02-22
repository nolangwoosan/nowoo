import supabase from "@/shared/api-helpers/supabase";

import { CommentDate } from "./comment-date";
import { CommentDeleteButton } from "./comment-delete-button";

interface Props {
  boardId: string;
}

type BoardCommentsReturnType = {
  comments: {
    id: string;
    comment: string;
    writer: string;
    created_dt: string;
  };
}[];

export async function Comments({ boardId }: Readonly<Props>) {
  const { data: boardComments } = await supabase
    .from("board_comments")
    .select(
      `
    comments (
        id,
        comment,
        writer,
        created_dt
    )
    `,
    )
    .match({
      board_id: boardId,
    })
    .order("created_dt", { ascending: true })
    .is("deleted_dt", null)
    .returns<BoardCommentsReturnType>();

  return (
    <div className="flex w-full flex-col">
      <span className="font-semibold">{boardComments?.length ?? 0}개의 댓글</span>
      {boardComments?.map((comments) =>
        Object.values(comments).map((comment) => (
          <div className="mt-4 flex flex-col gap-1 rounded-md bg-white p-4" key={comment.id}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">{comment.writer}</span>
                <CommentDate createdAt={comment.created_dt} />
              </div>
              <CommentDeleteButton boardId={boardId} commentId={comment.id} />
            </div>
            <span className="mt-4 text-gray-600">{comment.comment}</span>
          </div>
        )),
      )}
    </div>
  );
}
