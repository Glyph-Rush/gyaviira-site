import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxrfxbjqlbaexbxmfvdi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cmZ4YmpxbGJhZXhieG1mdmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDQwNzIsImV4cCI6MjA1MTU4MDA3Mn0.hDQg-oVQ6Wu_jiHapTiUSA_T8hLLr1i';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    username: string;
                    profile_pic: string | null;
                    bio: string | null;
                    role: 'user' | 'admin';
                    is_banned: boolean;
                    is_verified: boolean;
                    created_at: string;
                    preferences: {
                        musicAlerts: boolean;
                        communityMentions: boolean;
                        storeExclusives: boolean;
                    };
                };
                Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
            };
            messages: {
                Row: {
                    id: string;
                    channel: string;
                    user_id: string;
                    username: string;
                    text: string;
                    profile_pic: string | null;
                    is_admin: boolean;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['messages']['Insert']>;
            };
            products: {
                Row: {
                    id: string;
                    name: string;
                    description: string;
                    price: number;
                    image_url: string;
                    category: string;
                    stock: number;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['products']['Insert']>;
            };
            orders: {
                Row: {
                    id: string;
                    user_id: string;
                    items: any[];
                    total: number;
                    status: 'pending' | 'completed' | 'cancelled';
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['orders']['Insert']>;
            };
        };
    };
}
