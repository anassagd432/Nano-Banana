/**
 * Simple localStorage-based storage for demo purposes
 * All data stays in the user's browser - nothing is sent to any server
 */

export interface Toy {
    id: string;
    theme: string;
    image: string;
    name: string;
    tagline: string;
    createdAt: number;
}

export interface User {
    name: string;
}

const STORAGE_KEY_USER = 'nano_banana_user';
const STORAGE_KEY_TOYS = 'nano_banana_toys';

export const store = {
    // Demo User (just a name for personalization)
    login: (name: string) => {
        const user: User = { name };
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        return user;
    },
    logout: () => {
        localStorage.removeItem(STORAGE_KEY_USER);
    },
    getUser: (): User | null => {
        const data = localStorage.getItem(STORAGE_KEY_USER);
        return data ? JSON.parse(data) : null;
    },

    // Toys Collection (stored locally)
    saveToy: (toy: Omit<Toy, 'id' | 'createdAt'>) => {
        const currentToys = store.getToys();
        const newToy: Toy = {
            ...toy,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY_TOYS, JSON.stringify([newToy, ...currentToys]));
        return newToy;
    },
    getToys: (): Toy[] => {
        const data = localStorage.getItem(STORAGE_KEY_TOYS);
        return data ? JSON.parse(data) : [];
    },
    deleteToy: (id: string) => {
        const toys = store.getToys().filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY_TOYS, JSON.stringify(toys));
    },
    clearAll: () => {
        localStorage.removeItem(STORAGE_KEY_USER);
        localStorage.removeItem(STORAGE_KEY_TOYS);
    }
};
