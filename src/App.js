import './App.css';

function App() {
  return (
    <div className="App flex gap-x-[20px] w-[100%] items-center justify-around">
      <div className='Form flex flex-col w-[40%] gap-y-[30px] p-[20px] border-[1px] border-solid border-slate-500 rounded-xl'>
        <div className='Direction flex flex-row w-[100%] gap-x-[20px] justify-between'>
          <div className='From flex flex-col w-[40%] gap-y-[20px]'>
            <label className='text-xl'>From:</label>
            <select className='text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl'>
              <option value='None'>Select from chain</option>
              <option value='OP'>OP</option>
              <option value='BASE'>BASE</option>
            </select>
          </div>
          <div className='From flex flex-col w-[40%] gap-y-[20px]'>
            <label className='text-xl'>To:</label>
            <select className='text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl'>
              <option value='None'>Select target chain</option>
              <option value='OP'>OP</option>
              <option value='BASE'>BASE</option>
            </select>
          </div>
        </div>
        <button className='Bridge px-[10px] py-[14px] text-base font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'>
          Bridge
        </button>
      </div>
      <div className='LeaderBoard flex flex-col w-[40%] gap-y-[20px]'>
        <div className='Notification'>
          <label className='Time'>
            Next announcement is in: 2:59
          </label>
        </div>
        <div className='LeaderBoardTable flex flex-col gap-y-[10px]'>
          <label className='Title font-bold text-4xl'>
            LeaderBoard
          </label>
          <div className='TableContainer flex flex-col gap-y-[10px]'>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left font-bold'>Wallet</div>
              <div className='Right w-[120px] text-center font-bold'>Bridge Count</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xabc...123</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xdef...432</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xqwe...221</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xdsa...234</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
