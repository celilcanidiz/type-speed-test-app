import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { VscDebugRestart } from "react-icons/vsc";
import { keyCounter, setStatus, tick,TypingStart, refleshWords, addCorrect, addInCorrect, changeGameOver, resetAll } from '../../redux/TypeSlice/TypeSlice'


function Content() {
const dispatch = useDispatch();
const [input, setInput] = useState('');
const [start, setStart] = useState(false); // timer status
const [index, setIndex] = useState(0); // words index

const words = useSelector((state) => state.typing.items);
const keyCount = useSelector((state) => state.typing.keyCount);
const timer = useSelector((state) => state.typing.timer);
const lang = useSelector((state) => state.typing.lang);
const typingstart = useSelector((state) => state.typing.typingstart);
const isOver = useSelector((state)=> state.typing.gameover);
//timer
useEffect(() => {
    if (typingstart) setTimeout(() => dispatch(tick()), 1000);
    if (timer === 1) {
      dispatch(TypingStart(false))
    };
    if(timer === 0){
      dispatch(changeGameOver(true))
    }
  }, [typingstart, timer, dispatch]);

useEffect(() => {
  if (!isOver) {
    setInput('');
  }
},[isOver])
const handleChange = (e) => {
    dispatch(keyCounter());
    dispatch(setStatus({ id: words[index].id, status: 'next' }));

    let word = lang === 'english' ? words[index].english.toLowerCase() : words[index].turkish.toLowerCase();
    if (e.target.value.includes(' ')) {
        setInput('');
  
        if (word.includes(input) && word.length === input.length) {
          dispatch(setStatus({ id: words[index].id, status: 'correct' }));
          dispatch(addCorrect());
        } else if (!word.includes(input) || word.length !== input.length) {
          dispatch(setStatus({ id: words[index].id, status: 'incorrect' }));
          dispatch(addInCorrect());
        }
  
        if (words.length - 1 === index) {
          dispatch(refleshWords());
          setIndex(0);
        } else setIndex(index + 1);
      } else setInput(e.target.value);
  
      if (keyCount === 1) setStart(true);
      dispatch(TypingStart(start))
    };

      const handleClick = () => {
      dispatch(TypingStart(false))
          setTimeout(() => {
            setInput('')
          dispatch(resetAll());
          }, 1006);
        
    }
    
  return (
    <div className=' flex flex-col items-center'>
        <div className='flex bg-[#fefedf] w-[60%]  flex-wrap text-xl p-5 border border-black border-solid rounded-md  dark:text-black'>
        {words.map((word) => (
          <span className={`${word.status} m-1 text-bold`} key={word.id}>
            {lang === 'turkish' ? word.turkish.toLowerCase() : word.english.toLowerCase()}
          </span>
        ))}
        </div>
        <div className='w-[60%] flex justify-around mt-3 '>
        <input className='rounded-md w-[60%] p-2 border dark:text-black border-black' disabled={timer === 0 && keyCount !== 0} value={input} onChange={handleChange} type="text" />
        <div className='w-[%100] flex text-center'>
        <div className='flex justify-center items-center text-xl w-32 h-14 border border-black rounded-lg bg-[#fefedf] dark:text-black mr-2 font-bold '><p>{timer}</p></div>
        <button className='w-14 h-14 flex justify-center items-center border border-black rounded-xl bg-[#fefedf] dark:text-black hover:bg-[#f5f5df]'> <VscDebugRestart onClick={() => handleClick()} className='w-[70%] h-[70%]'/></button>
        </div>
        </div>
    </div>
  )
}

export default Content