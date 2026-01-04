import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    email: string;
    username: string;
    profilePic: string | null;
    bio?: string;
    joinedDate: string;
    role: 'user' | 'admin';
    isBanned?: boolean;
    isVerified?: boolean;
    preferences: {
        musicAlerts: boolean;
        communityMentions: boolean;
        storeExclusives: boolean;
    };
}

interface AuthContextType {
    user: User | null;
    allUsers: User[];
    login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signup: (email: string, username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    updateProfilePic: (url: string) => Promise<void>;
    updateUsername: (name: string) => Promise<boolean>;
    banUser: (id: string) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    updateUserRole: (id: string, role: 'user' | 'admin') => Promise<void>;
    verifyUser: (id: string) => Promise<void>;
    updatePreferences: (prefs: Partial<User['preferences']>) => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const USERNAME_REGEX = /^[a-zA-Z0-9_.\\-`]+$/;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize auth state
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                loadUserProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                loadUserProfile(session.user.id);
            } else {
                setUser(null);
            }
        });

        // Load all users for admin panel
        loadAllUsers();

        return () => subscription.unsubscribe();
    }, []);

    const loadUserProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data && !error) {
            setUser({
                id: data.id,
                email: data.email,
                username: data.username,
                profilePic: data.profile_pic,
                bio: data.bio,
                joinedDate: new Date(data.created_at).toLocaleDateString(),
                role: data.role,
                isBanned: data.is_banned,
                isVerified: data.is_verified,
                preferences: data.preferences
            });
        }
    };

    const loadAllUsers = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) {
            setAllUsers(data.map(profile => ({
                id: profile.id,
                email: profile.email,
                username: profile.username,
                profilePic: profile.profile_pic,
                bio: profile.bio,
                joinedDate: new Date(profile.created_at).toLocaleDateString(),
                role: profile.role,
                isBanned: profile.is_banned,
                isVerified: profile.is_verified,
                preferences: profile.preferences
            })));
        }
    };

    const login = async (emailOrUsername: string, password: string): Promise<{ success: boolean; message?: string }> => {
        try {
            // Check if input is email or username
            const isEmail = emailOrUsername.includes('@');
            let email = emailOrUsername;

            // If username provided, look up email
            if (!isEmail) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', emailOrUsername)
                    .single();

                if (!profile) {
                    return { success: false, message: 'Signal Not Found: Username does not exist in the network.' };
                }
                email = profile.email;
            }

            // Attempt sign in
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    return { success: false, message: 'Encryption Mismatch: Invalid credentials.' };
                }
                return { success: false, message: `Connection Failed: ${error.message}` };
            }

            if (data.user) {
                await loadUserProfile(data.user.id);
                return { success: true };
            }

            return { success: false, message: 'Authentication failed.' };
        } catch (error) {
            return { success: false, message: 'System Error: Unable to establish connection.' };
        }
    };

    const signup = async (email: string, username: string, password: string): Promise<{ success: boolean; message?: string }> => {
        try {
            // Validate username format
            if (!USERNAME_REGEX.test(username)) {
                return { success: false, message: 'Invalid Signal Format: Username contains illegal characters.' };
            }

            // Check if username already exists
            const { data: existingUsername } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();

            if (existingUsername) {
                return { success: false, message: 'Signal Collision: Username already registered.' };
            }

            // Sign up with Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (error) {
                if (error.message.includes('already registered')) {
                    return { success: false, message: 'Frequency Occupied: Email already in use.' };
                }
                return { success: false, message: `Registration Failed: ${error.message}` };
            }

            if (data.user) {
                return { success: true };
            }

            return { success: false, message: 'Initialization Failed: Unable to create signature.' };
        } catch (error) {
            return { success: false, message: 'System Error: Registration unavailable.' };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const updateProfilePic = async (url: string) => {
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .update({ profile_pic: url })
            .eq('id', user.id);

        if (!error) {
            setUser({ ...user, profilePic: url });
        }
    };

    const updateUsername = async (name: string): Promise<boolean> => {
        if (!user) return false;

        if (!USERNAME_REGEX.test(name)) return false;

        // Check if username is taken
        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', name)
            .neq('id', user.id)
            .single();

        if (existing) return false;

        const { error } = await supabase
            .from('profiles')
            .update({ username: name })
            .eq('id', user.id);

        if (!error) {
            setUser({ ...user, username: name });
            await loadAllUsers();
            return true;
        }

        return false;
    };

    const banUser = async (id: string) => {
        await supabase
            .from('profiles')
            .update({ is_banned: true })
            .eq('id', id);
        await loadAllUsers();
    };

    const deleteUser = async (id: string) => {
        // Note: This only soft-deletes from profiles
        // Actual auth.users deletion requires admin API
        await supabase
            .from('profiles')
            .delete()
            .eq('id', id);
        await loadAllUsers();
    };

    const updateUserRole = async (id: string, role: 'user' | 'admin') => {
        await supabase
            .from('profiles')
            .update({ role })
            .eq('id', id);
        await loadAllUsers();
    };

    const verifyUser = async (id: string) => {
        await supabase
            .from('profiles')
            .update({ is_verified: true })
            .eq('id', id);
        await loadAllUsers();
    };

    const updatePreferences = async (prefs: Partial<User['preferences']>) => {
        if (!user) return;

        const newPreferences = { ...user.preferences, ...prefs };

        const { error } = await supabase
            .from('profiles')
            .update({ preferences: newPreferences })
            .eq('id', user.id);

        if (!error) {
            setUser({ ...user, preferences: newPreferences });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            allUsers,
            login,
            signup,
            logout,
            updateProfilePic,
            updateUsername,
            banUser,
            deleteUser,
            updateUserRole,
            verifyUser,
            updatePreferences,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
