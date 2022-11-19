import "/src/sass/components/Divider.scss";

export default function Divider({ extraClasses = "" }) {
    return (
        <div className={`divider ${extraClasses}`}></div>
    )
}