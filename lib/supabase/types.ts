/**
 * Generated Supabase types, copied from ../../cityBotIngestionLayer/db/types.ts
 * (that repo owns the schema — see ../../cityBotIngestionLayer/docs/DATA_ARCHITECTURE.md).
 * This presentation layer only reads via the anon key, so it keeps its own
 * copy rather than importing across repos. Re-copy after a schema change:
 *
 *   cd ../cityBotIngestionLayer && supabase gen types typescript --local 2>/dev/null > db/types.ts
 *   cp ../cityBotIngestionLayer/db/types.ts lib/supabase/types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          age_group: string | null
          capacity: string | null
          category: string | null
          contact: string | null
          created_at: string
          description: string | null
          id: string
          last_verified_at: string | null
          owner_user_id: string | null
          photos: string[]
          place_id: string | null
          price: string | null
          schedule: string | null
          source: string | null
          source_url: string | null
          status: string
          thumbnail_url: string | null
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          age_group?: string | null
          capacity?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          photos?: string[]
          place_id?: string | null
          price?: string | null
          schedule?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          age_group?: string | null
          capacity?: string | null
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          photos?: string[]
          place_id?: string | null
          price?: string | null
          schedule?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          created_at: string
          ico: string | null
          last_verified_at: string | null
          owner_user_id: string | null
          place_id: string
          services: string[]
          source: string | null
          source_url: string | null
          status: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          ico?: string | null
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id: string
          services?: string[]
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          ico?: string | null
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string
          services?: string[]
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      cinema_showtimes: {
        Row: {
          created_at: string
          duration_minutes: number | null
          film_title: string
          film_title_original: string | null
          genre: string | null
          id: string
          language: string | null
          last_verified_at: string | null
          owner_user_id: string | null
          place_id: string | null
          poster_url: string | null
          rating: string | null
          show_date: string
          show_time: string
          source: string | null
          source_url: string | null
          status: string
          ticket_url: string | null
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          film_title: string
          film_title_original?: string | null
          genre?: string | null
          id?: string
          language?: string | null
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string | null
          poster_url?: string | null
          rating?: string | null
          show_date?: string
          show_time: string
          source?: string | null
          source_url?: string | null
          status?: string
          ticket_url?: string | null
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          film_title?: string
          film_title_original?: string | null
          genre?: string | null
          id?: string
          language?: string | null
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string | null
          poster_url?: string | null
          rating?: string | null
          show_date?: string
          show_time?: string
          source?: string | null
          source_url?: string | null
          status?: string
          ticket_url?: string | null
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cinema_showtimes_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      city_profile: {
        Row: {
          center_lat: number
          center_lng: number
          created_at: string
          domains: string[]
          id: string
          locale: string
          name: string
          slug: string
          timezone: string
          updated_at: string
        }
        Insert: {
          center_lat: number
          center_lng: number
          created_at?: string
          domains?: string[]
          id?: string
          locale?: string
          name: string
          slug: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          center_lat?: number
          center_lng?: number
          created_at?: string
          domains?: string[]
          id?: string
          locale?: string
          name?: string
          slug?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      classifieds: {
        Row: {
          ad_type: string
          category: string | null
          contact: string | null
          created_at: string
          description: string | null
          id: string
          last_verified_at: string | null
          location: string | null
          owner_user_id: string | null
          photos: string[]
          price: string | null
          source: string | null
          source_url: string | null
          status: string
          thumbnail_url: string | null
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          ad_type: string
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          location?: string | null
          owner_user_id?: string | null
          photos?: string[]
          price?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          ad_type?: string
          category?: string | null
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          location?: string | null
          owner_user_id?: string | null
          photos?: string[]
          price?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      council_sessions: {
        Row: {
          created_at: string
          id: string
          last_verified_at: string | null
          minutes_url: string | null
          session_date: string
          session_status: string
          source: string | null
          source_url: string | null
          status: string
          summary: string | null
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_verified_at?: string | null
          minutes_url?: string | null
          session_date: string
          session_status?: string
          source?: string | null
          source_url?: string | null
          status?: string
          summary?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_verified_at?: string | null
          minutes_url?: string | null
          session_date?: string
          session_status?: string
          source?: string | null
          source_url?: string | null
          status?: string
          summary?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_configs: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
          widgets: Json
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          widgets?: Json
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          widgets?: Json
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          created_at: string
          date_end: string | null
          date_start: string
          description: string | null
          id: string
          last_verified_at: string | null
          owner_user_id: string | null
          photos: string[]
          place_id: string | null
          source: string | null
          source_type: string
          source_url: string | null
          status: string
          thumbnail_url: string | null
          ticket_url: string | null
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          date_end?: string | null
          date_start: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          photos?: string[]
          place_id?: string | null
          source?: string | null
          source_type?: string
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          ticket_url?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          date_end?: string | null
          date_start?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          photos?: string[]
          place_id?: string | null
          source?: string | null
          source_type?: string
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          ticket_url?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      government_notices: {
        Row: {
          category: string | null
          created_at: string
          document_url: string | null
          expires_at: string | null
          id: string
          last_verified_at: string | null
          office_id: string | null
          published_at: string
          source: string | null
          source_url: string | null
          status: string
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          document_url?: string | null
          expires_at?: string | null
          id?: string
          last_verified_at?: string | null
          office_id?: string | null
          published_at?: string
          source?: string | null
          source_url?: string | null
          status?: string
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          document_url?: string | null
          expires_at?: string | null
          id?: string
          last_verified_at?: string | null
          office_id?: string | null
          published_at?: string
          source?: string | null
          source_url?: string | null
          status?: string
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "government_notices_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "government_offices"
            referencedColumns: ["place_id"]
          },
        ]
      }
      government_offices: {
        Row: {
          created_at: string
          department: string | null
          last_verified_at: string | null
          place_id: string
          services: string[]
          source: string | null
          source_url: string | null
          status: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          last_verified_at?: string | null
          place_id: string
          services?: string[]
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          last_verified_at?: string | null
          place_id?: string
          services?: string[]
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "government_offices_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string
          created_at: string
          id: string
          menu_id: string
          name: string
          price: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          menu_id: string
          name: string
          price?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          menu_id?: string
          name?: string
          price?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string
          id: string
          last_verified_at: string | null
          menu_date: string
          owner_user_id: string | null
          place_id: string
          source: string | null
          source_url: string | null
          status: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_verified_at?: string | null
          menu_date?: string
          owner_user_id?: string | null
          place_id: string
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_verified_at?: string | null
          menu_date?: string
          owner_user_id?: string | null
          place_id?: string
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menus_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      news_items: {
        Row: {
          content: string | null
          created_at: string
          id: string
          last_verified_at: string | null
          published_at: string
          source: string | null
          source_name: string
          source_url: string | null
          status: string
          summary: string | null
          thumbnail_url: string | null
          title: string
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          last_verified_at?: string | null
          published_at?: string
          source?: string | null
          source_name: string
          source_url?: string | null
          status?: string
          summary?: string | null
          thumbnail_url?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          last_verified_at?: string | null
          published_at?: string
          source?: string | null
          source_name?: string
          source_url?: string | null
          status?: string
          summary?: string | null
          thumbnail_url?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      places: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          id: string
          last_verified_at: string | null
          lat: number | null
          links: Json
          lng: number | null
          name: string
          opening_hours: Json | null
          owner_user_id: string | null
          phone: string | null
          photos: string[]
          slug: string
          source: string | null
          source_url: string | null
          status: string
          tags: string[]
          thumbnail_url: string | null
          trust_tier: string | null
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          lat?: number | null
          links?: Json
          lng?: number | null
          name: string
          opening_hours?: Json | null
          owner_user_id?: string | null
          phone?: string | null
          photos?: string[]
          slug: string
          source?: string | null
          source_url?: string | null
          status?: string
          tags?: string[]
          thumbnail_url?: string | null
          trust_tier?: string | null
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_verified_at?: string | null
          lat?: number | null
          links?: Json
          lng?: number | null
          name?: string
          opening_hours?: Json | null
          owner_user_id?: string | null
          phone?: string | null
          photos?: string[]
          slug?: string
          source?: string | null
          source_url?: string | null
          status?: string
          tags?: string[]
          thumbnail_url?: string | null
          trust_tier?: string | null
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      raw_ingestion_items: {
        Row: {
          confidence: number | null
          created_at: string
          error_message: string | null
          fetched_at: string
          id: string
          processing_status: string
          promoted_id: string | null
          promoted_table: string | null
          raw_html: string | null
          raw_payload: Json
          source: string
          source_url: string | null
          target_domain: string | null
          updated_at: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          error_message?: string | null
          fetched_at?: string
          id?: string
          processing_status?: string
          promoted_id?: string | null
          promoted_table?: string | null
          raw_html?: string | null
          raw_payload: Json
          source: string
          source_url?: string | null
          target_domain?: string | null
          updated_at?: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          error_message?: string | null
          fetched_at?: string
          id?: string
          processing_status?: string
          promoted_id?: string | null
          promoted_table?: string | null
          raw_html?: string | null
          raw_payload?: Json
          source?: string
          source_url?: string | null
          target_domain?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      theatre_shows: {
        Row: {
          created_at: string
          date_time: string
          description: string | null
          duration_minutes: number | null
          genre: string | null
          id: string
          last_verified_at: string | null
          owner_user_id: string | null
          place_id: string | null
          source: string | null
          source_url: string | null
          status: string
          thumbnail_url: string | null
          ticket_url: string | null
          title: string
          trust_tier: string | null
          updated_at: string
          venue: string | null
        }
        Insert: {
          created_at?: string
          date_time: string
          description?: string | null
          duration_minutes?: number | null
          genre?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          ticket_url?: string | null
          title: string
          trust_tier?: string | null
          updated_at?: string
          venue?: string | null
        }
        Update: {
          created_at?: string
          date_time?: string
          description?: string | null
          duration_minutes?: number | null
          genre?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          thumbnail_url?: string | null
          ticket_url?: string | null
          title?: string
          trust_tier?: string | null
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theatre_shows_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          business_name: string | null
          created_at: string
          display_name: string | null
          ico: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          display_name?: string | null
          ico?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          created_at?: string
          display_name?: string | null
          ico?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      winery_details: {
        Row: {
          created_at: string
          last_verified_at: string | null
          owner_user_id: string | null
          place_id: string
          regular_hours: Json | null
          seasonal_note: string | null
          source: string | null
          source_url: string | null
          status: string
          trust_tier: string | null
          updated_at: string
          wine_types: string[]
        }
        Insert: {
          created_at?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id: string
          regular_hours?: Json | null
          seasonal_note?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
          wine_types?: string[]
        }
        Update: {
          created_at?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string
          regular_hours?: Json | null
          seasonal_note?: string | null
          source?: string | null
          source_url?: string | null
          status?: string
          trust_tier?: string | null
          updated_at?: string
          wine_types?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "winery_details_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: true
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      winery_tastings: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          last_verified_at: string | null
          owner_user_id: string | null
          place_id: string
          source: string | null
          source_url: string | null
          starts_at: string
          status: string
          title: string | null
          trust_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id: string
          source?: string | null
          source_url?: string | null
          starts_at: string
          status?: string
          title?: string | null
          trust_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          last_verified_at?: string | null
          owner_user_id?: string | null
          place_id?: string
          source?: string | null
          source_url?: string | null
          starts_at?: string
          status?: string
          title?: string | null
          trust_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "winery_tastings_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      user_role: "citizen" | "business" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role: ["citizen", "business", "staff"],
    },
  },
} as const

