import './Main.css'
import Posts from './posts/Posts'
import SideBar from './SideBar'
import Stories from './Stories'


const Main = () => {

    return (
        <>

            <main>
                <section className='main-section'>
                    <Stories/>
                    <Posts/>
                    
                </section>
                <aside>
                    <SideBar/>
                </aside>
            </main>
        </>
    )
}

export default Main