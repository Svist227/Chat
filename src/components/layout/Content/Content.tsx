import './Content.scss'
interface ComponentProps {
    children: React.ReactNode;
}
const Content = ({children}: ComponentProps) => {

    return (
        <>
        <div className="content">
            {children}
        </div>
        </>
    )
}

export default Content