import './Admin.css';

function Admin() {
  return (
    <div className='flex flex-col items-center'>
      <div className="Admin flex flex-row justify-around mt-[30px] w-[100%]">
        <div className='Form flex flex-col gap-y-[10px] w-[300px]'>
          <label className='text-xl'>Number of Rewards:</label>
          <input className='border-[1px] border-solid border-slate-500 rounded-xl p-[8px]' type='text' placeholder='Number' />
        </div>
        <div className='Form flex flex-col gap-y-[10px] w-[300px]'>
          <label className='text-xl'>Number of Challenges:</label>
          <input className='border-[1px] border-solid border-slate-500 rounded-xl p-[8px]' type='text' placeholder='Number' />
        </div>
        <div className='Form flex flex-col gap-y-[10px] w-[300px]'>
          <label className='text-xl'>Challenge Duration in Minutes:</label>
          <input className='border-[1px] border-solid border-slate-500 rounded-xl p-[8px]' type='text' placeholder='Number' />
        </div>
      </div>
      <button className='Bridge px-[10px] py-[14px] text-base font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed w-[250px] mt-[30px]'>
        Confirm
      </button>
    </div>
  );
}

export default Admin;
