"use server";

import * as argon2 from "argon2";
import { revalidatePath } from "next/cache";

import { getRandom4DigitNumber } from "@/shared/api-helpers";
import supabase from "@/shared/api-helpers/supabase";
import { ROUTES } from "@/shared/routes";

export const deleteBoard = async ({ boardId, password }: { boardId: string; password: string }) => {
  const board = await supabase.from("boards").select("id, password").eq("id", Number(boardId)).single();

  if (!board.data) {
    return {
      status: 404,
      body: JSON.stringify({ message: "board is not found" }),
    };
  }

  const isPasswordValid = await argon2.verify(board.data.password, password);

  if (!isPasswordValid) {
    return {
      status: 401,
      body: JSON.stringify({ message: "password is not valid" }),
    };
  }

  await supabase
    .from("boards")
    .update({ id: Number(boardId), deleted_dt: new Date().toUTCString() })
    .match({ id: Number(boardId) });

  return {
    status: 200,
    body: JSON.stringify({ message: "success" }),
  };
};

export const createComment = async ({
  boardId,
  password,
  comment,
}: {
  boardId: string;
  password: string;
  comment: string;
}) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({ comment, writer: `nowoo${getRandom4DigitNumber()}`, password: await argon2.hash(password) })
    .select("id");

  if (error) {
    return {
      status: 500,
      body: JSON.stringify({ message: "댓글 생성에 실패했습니다." }),
    };
  }

  const newCommentId = data[0].id;
  const { error: boardCommentError } = await supabase
    .from("board_comments")
    .insert({ board_id: Number(boardId), comment_id: newCommentId });

  if (boardCommentError) {
    return {
      status: 500,
      body: JSON.stringify({ message: "댓글 생성에 실패했습니다." }),
    };
  }

  revalidatePath(ROUTES.FREE_BOARD.DETAIL(boardId));

  return {
    status: 200,
    body: JSON.stringify({ message: "댓글이 정상적으로 생성되었습니다.", data }),
  };
};

export const deleteComment = async ({
  boardId,
  password,
  commentId,
}: {
  boardId: string;
  password: string;
  commentId: string;
}) => {
  const { data } = await supabase.from("comments").select("id, password").eq("id", Number(commentId)).single();

  if (!data) {
    return {
      status: 404,
      body: JSON.stringify({ message: "댓글이 존재하지 않습니다." }),
    };
  }

  const isPasswordValid = await argon2.verify(data.password, password);

  if (!isPasswordValid) {
    return {
      status: 401,
      body: JSON.stringify({ message: "비밀번호가 일치하지 않습니다." }),
    };
  }

  await supabase
    .from("comments")
    .update({
      id: Number(commentId),
      deleted_dt: new Date().toUTCString(),
    })
    .match({
      id: Number(commentId),
    });

  await supabase
    .from("board_comments")
    .update({
      deleted_dt: new Date().toUTCString(),
    })
    .match({
      comment_id: commentId,
    });

  revalidatePath(ROUTES.FREE_BOARD.DETAIL(boardId));

  return {
    status: 200,
    body: JSON.stringify({ message: "댓글이 정상적으로 삭제되었습니다." }),
  };
};
