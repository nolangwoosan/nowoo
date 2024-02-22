/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

export async function createBoard({ title, content, password }: { title: string; content: string; password: string }) {
  // const response = await supabase.from("boards").insert([
  //   {
  //     title,
  //     description: content,
  //     writer: `nowoo${getRandom4DigitNumber()}`,
  //     password: await argon2.hash(password),
  //   },
  // ]);
  // return response.status === 201

  return true;
}
