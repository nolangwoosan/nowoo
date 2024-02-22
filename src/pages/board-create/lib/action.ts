"use server";

import * as argon2 from "argon2";

import { getRandom4DigitNumber } from "@/shared/api-helpers";
import supabase from "@/shared/api-helpers/supabase";

export async function createBoard({ title, content, password }: { title: string; content: string; password: string }) {
  const response = await supabase.from("boards").insert([
    {
      title,
      description: content,
      writer: `nowoo${getRandom4DigitNumber()}`,
      password: await argon2.hash(password),
    },
  ]);

  return response.status === 201;
}
