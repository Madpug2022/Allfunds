import NavBar from "@/components/layout/NavBar/NavBar"
import Providers from "./Providers"
import "./styles.scss"

const layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <Providers>
            <main className="mainpage">
                <NavBar />
                {children}
            </main>
        </Providers>

    )
}

export default layout
