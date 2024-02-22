"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Output, minLength, object, string } from "valibot";

import { ROUTES } from "@/shared/routes";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { useToast } from "@/shared/ui/use-toast";

import { QUERY_KEY } from "../../board/lib/use-board";
import { deleteBoard } from "../lib/action";

interface Props {
  boardId: string;
}

const schema = object({
  password: string("비밀번호를 입력해주세요.", [minLength(1, "비밀번호를 입력해주세요.")]),
});

type Schema = Output<typeof schema>;

export function DeleteButton({ boardId }: Readonly<Props>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Schema>({
    resolver: valibotResolver(schema),
  });
  const { toast } = useToast();

  const onSubmit = async ({ password }: Schema) => {
    const response = await deleteBoard({ boardId, password });

    if (response.status === 200) {
      toast({
        title: "게시글 삭제",
        description: "게시글이 삭제되었습니다.",
      });
      router.push(ROUTES.FREE_BOARD.LIST);
      return queryClient.invalidateQueries({
        queryKey: QUERY_KEY.FREE_BOARD,
      });
    }

    if (response.status === 401) {
      setError("password", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-md border border-[#FF3B3B] px-6 py-2 text-lg text-[#FF3B3B] transition-colors hover:bg-[#FF3B3B] hover:text-white">
        삭제
      </DialogTrigger>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <form className="relative flex flex-col rounded-md bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 flex flex-col gap-2">
            <span className="font-bold">게시글 삭제</span>
            <span className="text-[#717171]">비밀번호를 입력해주세요</span>
          </div>
          <div className="flex gap-2">
            <input
              className="h-9 border-none bg-[#F1F1F1] p-2"
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            />
            <button
              className="h-9 w-20 bg-[#4E86F3] text-white disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              확인
            </button>
          </div>
          {errors.password && <span className="mt-1 text-sm text-red-600">{errors.password.message?.toString()}</span>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
