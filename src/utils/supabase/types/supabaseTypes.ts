export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Mesh: {
        Row: {
          colour: string | null
          created_at: string
          created_by: string
          id: string
          layer_name: string | null
          mesh_data: Json
          pos_x: number | null
          pos_y: number | null
          pos_z: number | null
          rot_x: number | null
          rot_y: number | null
          rot_z: number | null
          type: string | null
          wireframe: boolean | null
          workspace_id: string
        }
        Insert: {
          colour?: string | null
          created_at?: string
          created_by: string
          id?: string
          layer_name?: string | null
          mesh_data: Json
          pos_x?: number | null
          pos_y?: number | null
          pos_z?: number | null
          rot_x?: number | null
          rot_y?: number | null
          rot_z?: number | null
          type?: string | null
          wireframe?: boolean | null
          workspace_id?: string
        }
        Update: {
          colour?: string | null
          created_at?: string
          created_by?: string
          id?: string
          layer_name?: string | null
          mesh_data?: Json
          pos_x?: number | null
          pos_y?: number | null
          pos_z?: number | null
          rot_x?: number | null
          rot_y?: number | null
          rot_z?: number | null
          type?: string | null
          wireframe?: boolean | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Mesh_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Mesh_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      Profile: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          profile_pic_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          profile_pic_url?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          profile_pic_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      Workspace: {
        Row: {
          created_at: string
          id: string
          owner_id: string
          updated_at: string | null
          workspace_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          owner_id?: string
          updated_at?: string | null
          workspace_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string
          updated_at?: string | null
          workspace_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Workspace_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      WorkspaceUser: {
        Row: {
          id: number
          invited_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: number
          invited_at?: string
          role: string
          user_id?: string
          workspace_id?: string
        }
        Update: {
          id?: number
          invited_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "WorkspaceUser_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "WorkspaceUser_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
