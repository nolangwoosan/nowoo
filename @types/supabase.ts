export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  nowoo: {
    Tables: {
      board_comments: {
        Row: {
          board_id: number
          comment_id: number
          created_dt: string
          deleted_dt: string | null
          id: number
          updated_dt: string
        }
        Insert: {
          board_id: number
          comment_id: number
          created_dt?: string
          deleted_dt?: string | null
          id?: number
          updated_dt?: string
        }
        Update: {
          board_id?: number
          comment_id?: number
          created_dt?: string
          deleted_dt?: string | null
          id?: number
          updated_dt?: string
        }
        Relationships: []
      }
      boards: {
        Row: {
          category: number
          created_dt: string
          deleted_dt: string | null
          description: string
          id: number
          password: string
          title: string
          updated_dt: string
          writer: string
        }
        Insert: {
          category?: number
          created_dt?: string
          deleted_dt?: string | null
          description: string
          id?: number
          password: string
          title: string
          updated_dt?: string
          writer: string
        }
        Update: {
          category?: number
          created_dt?: string
          deleted_dt?: string | null
          description?: string
          id?: number
          password?: string
          title?: string
          updated_dt?: string
          writer?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment: string
          created_dt: string
          deleted_dt: string | null
          id: number
          password: string
          updated_dt: string
          writer: string
        }
        Insert: {
          comment: string
          created_dt?: string
          deleted_dt?: string | null
          id?: number
          password: string
          updated_dt?: string
          writer: string
        }
        Update: {
          comment?: string
          created_dt?: string
          deleted_dt?: string | null
          id?: number
          password?: string
          updated_dt?: string
          writer?: string
        }
        Relationships: []
      }
      items: {
        Row: {
          category: string
          created_dt: string
          deleted_dt: string | null
          description_eng: string
          description_kor: string
          id: number
          inc_dex: number
          inc_hp: number
          inc_int: number
          inc_luk: number
          inc_mg_attack: number
          inc_mg_defence: number
          inc_mp: number
          inc_ph_attack: number
          inc_ph_defence: number
          inc_str: number
          maple_item_id: number
          name_eng: string
          name_kor: string
          opt_etc: string | null
          overall_category: string
          price_average: number
          price_shop: number
          req_dex: number
          req_int: number
          req_job: number
          req_level: number
          req_luk: number
          req_pop: number
          req_str: number
          sub_category: string
          updated_dt: string
          upgradable_count: number
        }
        Insert: {
          category: string
          created_dt?: string
          deleted_dt?: string | null
          description_eng: string
          description_kor: string
          id?: number
          inc_dex: number
          inc_hp: number
          inc_int: number
          inc_luk: number
          inc_mg_attack: number
          inc_mg_defence: number
          inc_mp: number
          inc_ph_attack: number
          inc_ph_defence: number
          inc_str: number
          maple_item_id: number
          name_eng: string
          name_kor: string
          opt_etc?: string | null
          overall_category: string
          price_average: number
          price_shop: number
          req_dex: number
          req_int: number
          req_job: number
          req_level: number
          req_luk: number
          req_pop: number
          req_str: number
          sub_category: string
          updated_dt?: string
          upgradable_count: number
        }
        Update: {
          category?: string
          created_dt?: string
          deleted_dt?: string | null
          description_eng?: string
          description_kor?: string
          id?: number
          inc_dex?: number
          inc_hp?: number
          inc_int?: number
          inc_luk?: number
          inc_mg_attack?: number
          inc_mg_defence?: number
          inc_mp?: number
          inc_ph_attack?: number
          inc_ph_defence?: number
          inc_str?: number
          maple_item_id?: number
          name_eng?: string
          name_kor?: string
          opt_etc?: string | null
          overall_category?: string
          price_average?: number
          price_shop?: number
          req_dex?: number
          req_int?: number
          req_job?: number
          req_level?: number
          req_luk?: number
          req_pop?: number
          req_str?: number
          sub_category?: string
          updated_dt?: string
          upgradable_count?: number
        }
        Relationships: []
      }
      monster_drops: {
        Row: {
          drop_chance: number
          id: number
          item_id: number
          monster_id: number
        }
        Insert: {
          drop_chance: number
          id?: number
          item_id: number
          monster_id: number
        }
        Update: {
          drop_chance?: number
          id?: number
          item_id?: number
          monster_id?: number
        }
        Relationships: []
      }
      monsters: {
        Row: {
          created_dt: string
          deleted_dt: string | null
          description_eng: string
          description_kor: string
          drop_money: number
          drop_money_chance: string
          exp: number
          hp: number
          id: number
          is_undead: boolean
          level: number
          maple_mob_id: number
          mg_attack: number
          mg_defence: number
          mp: number
          name_eng: string
          name_kor: string
          ph_attack: number
          ph_defence: number
          updated_dt: string
        }
        Insert: {
          created_dt?: string
          deleted_dt?: string | null
          description_eng: string
          description_kor: string
          drop_money: number
          drop_money_chance: string
          exp: number
          hp: number
          id?: number
          is_undead: boolean
          level: number
          maple_mob_id: number
          mg_attack: number
          mg_defence: number
          mp: number
          name_eng: string
          name_kor: string
          ph_attack: number
          ph_defence: number
          updated_dt?: string
        }
        Update: {
          created_dt?: string
          deleted_dt?: string | null
          description_eng?: string
          description_kor?: string
          drop_money?: number
          drop_money_chance?: string
          exp?: number
          hp?: number
          id?: number
          is_undead?: boolean
          level?: number
          maple_mob_id?: number
          mg_attack?: number
          mg_defence?: number
          mp?: number
          name_eng?: string
          name_kor?: string
          ph_attack?: number
          ph_defence?: number
          updated_dt?: string
        }
        Relationships: []
      }
      sample: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['nowoo']['Tables'] & Database['nowoo']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['nowoo']['Tables'] & Database['nowoo']['Views'])
    ? (Database['nowoo']['Tables'] & Database['nowoo']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['nowoo']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['nowoo']['Tables']
    ? Database['nowoo']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['nowoo']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['nowoo']['Tables']
    ? Database['nowoo']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['nowoo']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['nowoo']['Enums']
    ? Database['nowoo']['Enums'][PublicEnumNameOrOptions]
    : never
