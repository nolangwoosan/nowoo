/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { headers } from "next/headers";

export default async function AccessLogger() {
  const header = headers();
  const [ip] = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",");
  const userAgent = header.get("user-agent") ?? "";

  // const { data: prevAccessLogs } = await supabase
  //   .from("user_access")
  //   .select("id")
  //   .match({ ip, agent: userAgent })
  //   .gte("updated_dt", new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString())
  //   .order("updated_dt", { ascending: false });

  // const lastAccessLog = prevAccessLogs?.[0];

  // if (lastAccessLog?.id) {
  //   await supabase.from("user_access").upsert({
  //     id: lastAccessLog.id,
  //     ip,
  //     agent: userAgent,
  //   });
  // } else {
  //   await supabase.from("user_access").insert({
  //     ip,
  //     agent: userAgent,
  //   });
  // }

  return null;
}
