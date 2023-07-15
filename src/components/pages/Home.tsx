import {  HomeHeader } from "../HomeHeader"
import { Title } from "../Title"

export const Home = () => {
    return <div>
        <HomeHeader />
        <Title title='Sprint' />
        <div>
            card sprint
        </div>
        <Title title='Backlog' />
    </div>
}