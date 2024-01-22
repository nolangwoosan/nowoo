export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  maple_land: {
    Tables: {
      items: {
        Row: {
          category: string | null
          created_dt: string | null
          description_eng: string | null
          description_kor: string | null
          id: number
          inc_dex: number | null
          inc_etc: string | null
          inc_hp: number | null
          inc_int: number | null
          inc_luk: number | null
          inc_mg_defence: number | null
          inc_mp: number | null
          inc_ph_defence: number | null
          inc_str: number | null
          maple_item_id: number | null
          name_eng: string | null
          name_kor: string | null
          overall_category: string | null
          price_average: number | null
          price_shop: number | null
          removed_dt: string | null
          req_dex: number | null
          req_int: number | null
          req_level: number | null
          req_luk: number | null
          req_pop: number | null
          req_str: number | null
          sub_category: string | null
          updated_dt: string | null
          upgradable_count: number | null
        }
        Insert: {
          category?: string | null
          created_dt?: string | null
          description_eng?: string | null
          description_kor?: string | null
          id?: number
          inc_dex?: number | null
          inc_etc?: string | null
          inc_hp?: number | null
          inc_int?: number | null
          inc_luk?: number | null
          inc_mg_defence?: number | null
          inc_mp?: number | null
          inc_ph_defence?: number | null
          inc_str?: number | null
          maple_item_id?: number | null
          name_eng?: string | null
          name_kor?: string | null
          overall_category?: string | null
          price_average?: number | null
          price_shop?: number | null
          removed_dt?: string | null
          req_dex?: number | null
          req_int?: number | null
          req_level?: number | null
          req_luk?: number | null
          req_pop?: number | null
          req_str?: number | null
          sub_category?: string | null
          updated_dt?: string | null
          upgradable_count?: number | null
        }
        Update: {
          category?: string | null
          created_dt?: string | null
          description_eng?: string | null
          description_kor?: string | null
          id?: number
          inc_dex?: number | null
          inc_etc?: string | null
          inc_hp?: number | null
          inc_int?: number | null
          inc_luk?: number | null
          inc_mg_defence?: number | null
          inc_mp?: number | null
          inc_ph_defence?: number | null
          inc_str?: number | null
          maple_item_id?: number | null
          name_eng?: string | null
          name_kor?: string | null
          overall_category?: string | null
          price_average?: number | null
          price_shop?: number | null
          removed_dt?: string | null
          req_dex?: number | null
          req_int?: number | null
          req_level?: number | null
          req_luk?: number | null
          req_pop?: number | null
          req_str?: number | null
          sub_category?: string | null
          updated_dt?: string | null
          upgradable_count?: number | null
        }
        Relationships: []
      }
      items_monsters: {
        Row: {
          id: number
          item_id: number
          monster_id: number
        }
        Insert: {
          id: number
          item_id: number
          monster_id: number
        }
        Update: {
          id?: number
          item_id?: number
          monster_id?: number
        }
        Relationships: []
      }
      monsters: {
        Row: {
          created_dt: string
          description_eng: string | null
          description_kor: string | null
          exp: number | null
          hp: number | null
          id: number
          is_undead: boolean
          level: number | null
          maple_mob_id: number | null
          mg_attack: number | null
          mg_defence: number | null
          mp: number | null
          name_eng: string | null
          name_kor: string | null
          ph_attack: number | null
          ph_defence: number | null
          removed_dt: string | null
          updated_dt: string | null
        }
        Insert: {
          created_dt?: string
          description_eng?: string | null
          description_kor?: string | null
          exp?: number | null
          hp?: number | null
          id?: number
          is_undead?: boolean
          level?: number | null
          maple_mob_id?: number | null
          mg_attack?: number | null
          mg_defence?: number | null
          mp?: number | null
          name_eng?: string | null
          name_kor?: string | null
          ph_attack?: number | null
          ph_defence?: number | null
          removed_dt?: string | null
          updated_dt?: string | null
        }
        Update: {
          created_dt?: string
          description_eng?: string | null
          description_kor?: string | null
          exp?: number | null
          hp?: number | null
          id?: number
          is_undead?: boolean
          level?: number | null
          maple_mob_id?: number | null
          mg_attack?: number | null
          mg_defence?: number | null
          mp?: number | null
          name_eng?: string | null
          name_kor?: string | null
          ph_attack?: number | null
          ph_defence?: number | null
          removed_dt?: string | null
          updated_dt?: string | null
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
    | keyof (Database['maple_land']['Tables'] & Database['maple_land']['Views'])
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
  : PublicTableNameOrOptions extends keyof (Database['maple_land']['Tables'] & Database['maple_land']['Views'])
    ? (Database['maple_land']['Tables'] & Database['maple_land']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['maple_land']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['maple_land']['Tables']
    ? Database['maple_land']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['maple_land']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['maple_land']['Tables']
    ? Database['maple_land']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['maple_land']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['maple_land']['Enums']
    ? Database['maple_land']['Enums'][PublicEnumNameOrOptions]
    : never
