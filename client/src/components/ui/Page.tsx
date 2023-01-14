import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { checkCredientials } from "../../util/apiUtils";
import { PageComponent } from "../../util/types"
import Navbar from "./Navbar";
import "/src/sass/components/Page.scss";

const Page: PageComponent = ({ extraStyles, children }) => {
    return (
        <main id="view">
            <section className={`Page ${extraStyles || null}`}>
                { children || null }
            </section>
        </main>
    )
}

export default Page;