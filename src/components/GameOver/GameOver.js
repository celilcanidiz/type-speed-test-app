import { useSelector, useDispatch } from 'react-redux';
import {resetAll,} from '../../redux/TypeSlice/TypeSlice';

function GameOver() {
const dispatch = useDispatch();
const keyCount = useSelector((state) => state.typing.keyCount);
const correct = useSelector((state) => state.typing.correct);
const incorrect = useSelector((state) => state.typing.incorrect);
const lang = useSelector((state) => state.typing.lang);
const handleClick = () => {
    setTimeout(() => {
      dispatch(resetAll());
    }, 250);
}

  return (
    <div className='bg-[#fefedf] dark:text-black rounded-xl drop-shadow-xl text-center w-[60%] h-[50%] top-[20%] left-[20%] z-[100] fixed '>
       <div className="flex flex-col items-center">
      <p className=" mb-3 mt-6 text-4xl font-bold">{lang === 'turkish' ? 'Sonuç' : 'Result'}</p>
      <p className='my-2 font-bold rounded-lg p-2'>
        {lang === 'turkish' ? 'Tuş Vuruşu: ' : 'Key Count: '} {keyCount}
      </p>
      <p className='my-2 font-bold rounded-lg p-2'>
        {lang === 'turkish' ? 'Doğru: ' : 'Correct: '} {correct}
      </p>
      <p className='my-2 font-bold rounded-lg p-2'>
        {lang === 'turkish' ? 'Yanlış: ' : 'Incorrect: '} {incorrect}
      </p>
      <p className='my-2 font-bold rounded-lg p-2'>
        {lang === 'turkish' ? 'Doğruluk: ' : 'Accuracy: '} %{((correct / (correct + incorrect) || 0) * 100).toFixed(2)}
      </p>
      <button className='my-2 w-[20%] bg-[#d9daff] font-bold rounded-lg p-2' onClick={() => handleClick()}>
        {lang === 'turkish' ? 'Tekrar Dene' : 'Retry'}
      </button>
    </div>
    </div>
  )
}

export default GameOver