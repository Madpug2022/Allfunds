import { createContext } from "react";

const shopContext = createContext({
});

export default shopContext;

export const ShopProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const contextData = {

    };

    return (
        <shopContext.Provider value={contextData}>
            {children}
        </shopContext.Provider>
    );
};
