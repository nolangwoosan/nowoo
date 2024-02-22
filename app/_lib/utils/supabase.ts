import { createClient } from "@supabase/supabase-js";

import { Database } from "@/@types/supabase";

export default createClient<Database>(
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: "nowoo",
    },
  },
);
