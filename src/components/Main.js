import Content from './Content/Content'
import GameOver from './GameOver/GameOver';
import Header from './Header/Header'
import { useSelector } from 'react-redux';


function Main() {
  const gameover = useSelector((state) => state.typing.gameover);
  
  return (
    <div className="p-8 w-full sm:h-screen h-full bg-[#9b89b3] dark:text-white dark:bg-neutral-800">
    {gameover && <GameOver/>}
        <Header/>
        <Content />
       
    </div>
  )
}

export default Main