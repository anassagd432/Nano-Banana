export interface Toy {
    id: string;
    theme: string;
    image: string;
    name: string;
    tagline: string;
    createdAt: number;
}

export interface User {
    email: string;
    name: string;
}

const STORAGE_KEY_USER = 'nano_banana_user';
const STORAGE_KEY_TOYS = 'nano_banana_toys';

export const store = {
    // User Auth
    login: (email: string) => {
        const user: User = { email, name: email.split('@')[0] };
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

    // Toys
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
    }
};
