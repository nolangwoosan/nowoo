import supabase from "@/app/_lib/utils/supabase";

export const getItems = async () => {
  const { data: items } = await supabase.from("items").select();
  return items ?? [];
};

export const getMonsters = async () => {
  const { data: monsters } = await supabase.from("monsters").select();
  return monsters ?? [];
};
