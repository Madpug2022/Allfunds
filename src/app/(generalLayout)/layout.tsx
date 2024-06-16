import Providers from "./Providers"

const layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <Providers>
            <main>
                {children}
            </main>
        </Providers>

    )
}

export default layout
