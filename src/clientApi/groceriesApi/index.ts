import { requests } from ".."

const GROCERIES_API = {
    getGroceries: async () => {
        try {
            const response = await requests.get("/grocery");
            return response;
        } catch (error) {
            throw error
        }
    },
    updateStock: async (groceryId: string, stock: number) => {
        try {
            const response = await requests.patch(`/grocery/${groceryId}`, { stock });
            return response;
        } catch (error) {
            throw error
        }
    },
    addToFavorite: async (groceryId: string, favorite: string) => {
        try {
            const response = await requests.patch(`/grocery/${groceryId}`, { favorite });
            return response;
        } catch (error) {
            throw error
        }
    },
    removeFromFavorite: async (groceryId: string, favorite: string) => {
        try {
            const response = await requests.patch(`/grocery/${groceryId}`, { favorite });
            return response;
        } catch (error) {
            throw error
        }
    },
    getFavorite: async (listId: string) => {
        try {
            const response = await requests.get(`/grocery?favorite=${listId}`);
            return response;
        } catch (error) {
            throw error
        }
    }
}

export default GROCERIES_API;
