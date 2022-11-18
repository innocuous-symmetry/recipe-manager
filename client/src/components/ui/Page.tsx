import { PageComponent } from "../../util/types"

const Page: PageComponent = ({ extraStyles, children }) => {
    return (
        <main className={`page ${extraStyles || null}`}>
            { children || null }
        </main>
    )
}

export default Page;