import { PageComponent } from "../../util/types"
import Navbar from "./Navbar";
import "/src/sass/components/Page.scss";

const Page: PageComponent = ({ extraStyles, children }) => {
    return (
        <main id="view">
            <Navbar />
            <section className={`Page ${extraStyles || null}`}>
                { children || null }
            </section>
        </main>
    )
}

export default Page;