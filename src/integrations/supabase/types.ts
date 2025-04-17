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
      bank_payments: {
        Row: {
          account_name: string
          account_number: string
          account_type: string
          amount: number
          application_id: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          id: string
          routing_number: string
          status: string | null
        }
        Insert: {
          account_name: string
          account_number: string
          account_type: string
          amount: number
          application_id?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          id?: string
          routing_number: string
          status?: string | null
        }
        Update: {
          account_name?: string
          account_number?: string
          account_type?: string
          amount?: number
          application_id?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          id?: string
          routing_number?: string
          status?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          opt_in: boolean | null
          phone: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          opt_in?: boolean | null
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          opt_in?: boolean | null
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      first_responder_applications: {
        Row: {
          additional_info: string | null
          agree_to_terms: boolean | null
          application_date: string | null
          created_at: string | null
          department: string
          desired_llc_name: string
          email: string
          first_name: string
          id: string
          last_name: string
          occupation: string
          payment_status: string | null
          phone: string
          state: string
          status: string | null
          verify_401k_interest: boolean | null
          years_of_service: string
        }
        Insert: {
          additional_info?: string | null
          agree_to_terms?: boolean | null
          application_date?: string | null
          created_at?: string | null
          department: string
          desired_llc_name: string
          email: string
          first_name: string
          id?: string
          last_name: string
          occupation: string
          payment_status?: string | null
          phone: string
          state: string
          status?: string | null
          verify_401k_interest?: boolean | null
          years_of_service: string
        }
        Update: {
          additional_info?: string | null
          agree_to_terms?: boolean | null
          application_date?: string | null
          created_at?: string | null
          department?: string
          desired_llc_name?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          occupation?: string
          payment_status?: string | null
          phone?: string
          state?: string
          status?: string | null
          verify_401k_interest?: boolean | null
          years_of_service?: string
        }
        Relationships: []
      }
      llc_applications: {
        Row: {
          additional_info: string | null
          agree_to_terms: boolean | null
          alternative_name1: string | null
          alternative_name2: string | null
          application_date: string | null
          business_purpose: string
          city: string | null
          created_at: string | null
          desired_llc_name: string
          email: string
          first_name: string
          id: string
          last_name: string
          member_count: string
          payment_status: string | null
          phone: string
          state: string
          status: string | null
          street: string | null
          zipcode: string | null
        }
        Insert: {
          additional_info?: string | null
          agree_to_terms?: boolean | null
          alternative_name1?: string | null
          alternative_name2?: string | null
          application_date?: string | null
          business_purpose: string
          city?: string | null
          created_at?: string | null
          desired_llc_name: string
          email: string
          first_name: string
          id?: string
          last_name: string
          member_count: string
          payment_status?: string | null
          phone: string
          state: string
          status?: string | null
          street?: string | null
          zipcode?: string | null
        }
        Update: {
          additional_info?: string | null
          agree_to_terms?: boolean | null
          alternative_name1?: string | null
          alternative_name2?: string | null
          application_date?: string | null
          business_purpose?: string
          city?: string | null
          created_at?: string | null
          desired_llc_name?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          member_count?: string
          payment_status?: string | null
          phone?: string
          state?: string
          status?: string | null
          street?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      scheduled_consultations: {
        Row: {
          consultation_date: string
          consultation_time: string
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          status: string | null
        }
        Insert: {
          consultation_date: string
          consultation_time: string
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          status?: string | null
        }
        Update: {
          consultation_date?: string
          consultation_time?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          status?: string | null
        }
        Relationships: []
      }
      solo401k_applications: {
        Row: {
          additional_info: string | null
          annual_income: string
          application_date: string | null
          business_name: string
          business_type: string
          created_at: string | null
          email: string
          existing_retirement: boolean | null
          first_name: string
          id: string
          last_name: string
          participant1_name: string
          participant2_name: string | null
          phone: string
          ssn: string
          status: string | null
          trustee1_name: string
          trustee2_name: string | null
        }
        Insert: {
          additional_info?: string | null
          annual_income: string
          application_date?: string | null
          business_name: string
          business_type: string
          created_at?: string | null
          email: string
          existing_retirement?: boolean | null
          first_name: string
          id?: string
          last_name: string
          participant1_name: string
          participant2_name?: string | null
          phone: string
          ssn: string
          status?: string | null
          trustee1_name: string
          trustee2_name?: string | null
        }
        Update: {
          additional_info?: string | null
          annual_income?: string
          application_date?: string | null
          business_name?: string
          business_type?: string
          created_at?: string | null
          email?: string
          existing_retirement?: boolean | null
          first_name?: string
          id?: string
          last_name?: string
          participant1_name?: string
          participant2_name?: string | null
          phone?: string
          ssn?: string
          status?: string | null
          trustee1_name?: string
          trustee2_name?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
