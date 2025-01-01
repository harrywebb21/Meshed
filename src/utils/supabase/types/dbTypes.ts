import { Database } from "./supabaseTypes";

export type Profile = Database["public"]["Tables"]["Profile"]["Row"];
export type Workspace = Database["public"]["Tables"]["Workspace"]["Row"];
export type Mesh = Database["public"]["Tables"]["Mesh"]["Row"];
