import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    username: string;
    password?: string;
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
    login: (email: string, username: string, password?: string) => { success: boolean; message?: string };
    logout: () => void;
    updateProfilePic: (url: string) => void;
    updateUsername: (name: string) => boolean;
    banUser: (id: string) => void;
    deleteUser: (id: string) => void;
    updateUserRole: (id: string, role: 'user' | 'admin') => void;
    verifyUser: (id: string) => void;
    updatePreferences: (prefs: Partial<User['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Allowed symbols: _ . - `
export const USERNAME_REGEX = /^[a-zA-Z0-9_.\-`]+$/;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    // Initialize from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('gyaviira_user');
        const savedAllUsers = localStorage.getItem('gyaviira_all_users');

        if (savedAllUsers) {
            setAllUsers(JSON.parse(savedAllUsers));
        } else {
            // Initial data: Only Gyaviira_Foundation as the primary admin
            const initialUsers: User[] = [
                {
                    id: 'foundation-01',
                    email: 'foundation@gyaviira.com',
                    username: 'Gyaviira_Foundation',
                    profilePic: null,
                    joinedDate: '01/01/2026',
                    role: 'admin',
                    isVerified: true,
                    password: 'Luganda_pop_345',
                    preferences: {
                        musicAlerts: true,
                        communityMentions: true,
                        storeExclusives: true
                    }
                },
                {
                    id: 'foundation-02',
                    email: 'jerome@gyaviira.com',
                    username: 'Jerome Moses',
                    profilePic: null,
                    joinedDate: '01/01/2026',
                    role: 'admin',
                    isVerified: true,
                    password: 'Luganda_pop_345',
                    preferences: {
                        musicAlerts: true,
                        communityMentions: true,
                        storeExclusives: true
                    }
                }
            ];
            setAllUsers(initialUsers);
            localStorage.setItem('gyaviira_all_users', JSON.stringify(initialUsers));
        }

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            // Check if user is banned or deleted
            const currentAllUsers = savedAllUsers ? JSON.parse(savedAllUsers) : [];
            const freshUser = (currentAllUsers as User[]).find(u => u.id === parsedUser.id);

            if (freshUser) {
                if (freshUser.isBanned) {
                    localStorage.removeItem('gyaviira_user');
                    setUser(null);
                } else {
                    setUser(freshUser);
                }
            } else {
                localStorage.removeItem('gyaviira_user');
                setUser(null);
            }
        }
    }, []);

    const login = (email: string, username: string, password?: string) => {
        // Validation for the Foundation Admin account
        if (username === 'Gyaviira_Foundation' || email === 'foundation@gyaviira.com') {
            if (password !== 'Luganda_pop_345') {
                return { success: false, message: 'Invalid Foundation Access Code.' };
            }
        }

        // Validate username formatting
        if (!USERNAME_REGEX.test(username)) {
            return { success: false, message: 'Invalid symbols in signature. Only ( _ . - ` ) allowed.' };
        }

        // Find existing user
        const existingUser = allUsers.find(u => u.username === username || u.email === email);

        if (existingUser) {
            if (existingUser.isBanned) {
                return { success: false, message: 'Connection Terminated: Your signal has been banned.' };
            }
            if (password && existingUser.password && existingUser.password !== password) {
                return { success: false, message: 'Encryption Mismatch: Invalid password.' };
            }
            setUser(existingUser);
            localStorage.setItem('gyaviira_user', JSON.stringify(existingUser));
            return { success: true };
        }

        // Only allow new account creation if password is provided
        if (!password) {
            return { success: false, message: 'Initialization Failed: Password required for new signature.' };
        }

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username,
            password,
            profilePic: null,
            joinedDate: new Date().toLocaleDateString(),
            role: 'user',
            isVerified: false,
            preferences: {
                musicAlerts: true,
                communityMentions: true,
                storeExclusives: false
            }
        };

        const updatedAll = [...allUsers, newUser];
        setAllUsers(updatedAll);
        setUser(newUser);
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        localStorage.setItem('gyaviira_user', JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gyaviira_user');
    };

    const updateProfilePic = (url: string) => {
        if (!user) return;
        const updatedUser = { ...user, profilePic: url };
        setUser(updatedUser);
        const updatedAll = allUsers.map(u => u.id === user.id ? updatedUser : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_user', JSON.stringify(updatedUser));
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
    };

    const updateUsername = (name: string) => {
        if (!user || !USERNAME_REGEX.test(name)) return false;
        const updatedUser = { ...user, username: name };
        setUser(updatedUser);
        const updatedAll = allUsers.map(u => u.id === user.id ? updatedUser : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_user', JSON.stringify(updatedUser));
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        return true;
    };

    const banUser = (id: string) => {
        const updatedAll = allUsers.map(u => u.id === id ? { ...u, isBanned: !u.isBanned } : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        if (user?.id === id) logout();
    };

    const verifyUser = (id: string) => {
        const updatedAll = allUsers.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        if (user?.id === id) {
            const updatedUser = { ...user, isVerified: !user.isVerified };
            setUser(updatedUser);
            localStorage.setItem('gyaviira_user', JSON.stringify(updatedUser));
        }
    };

    const deleteUser = (id: string) => {
        const updatedAll = allUsers.filter(u => u.id !== id);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        if (user?.id === id) logout();
    };

    const updateUserRole = (id: string, role: 'user' | 'admin') => {
        const updatedAll = allUsers.map(u => u.id === id ? { ...u, role } : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
        if (user?.id === id) {
            const updatedUser = { ...user, role };
            setUser(updatedUser);
            localStorage.setItem('gyaviira_user', JSON.stringify(updatedUser));
        }
    };

    const updatePreferences = (prefs: Partial<User['preferences']>) => {
        if (!user) return;
        const updatedUser = { ...user, preferences: { ...user.preferences, ...prefs } };
        setUser(updatedUser);
        const updatedAll = allUsers.map(u => u.id === user.id ? updatedUser : u);
        setAllUsers(updatedAll);
        localStorage.setItem('gyaviira_user', JSON.stringify(updatedUser));
        localStorage.setItem('gyaviira_all_users', JSON.stringify(updatedAll));
    };

    return (
        <AuthContext.Provider value={{ user, allUsers, login, logout, updateProfilePic, updateUsername, banUser, deleteUser, updateUserRole, verifyUser, updatePreferences }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
