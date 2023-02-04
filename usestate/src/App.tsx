import { useState } from 'react'

import { nanoid } from 'nanoid';


function App() {
  const id = nanoid();
  const [list, setList] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  const [updated, setUpdates] = useState<string>("")
  const [updatemode, setUpdateMode] = useState<boolean>(false)



  const [lisdata, setListdata] = useState<{ id: string, name: string }[]>([])
  console.log(lisdata)
  const [tasksDone, setTasksDone] = useState<{ id: string, name: string }[]>([])
  console.log(lisdata)
  const handlelist = () => {
    setShow(false)
    setListdata(prev => [...prev, { name: list, id: nanoid() }])

  }
  const finishedtask = (id: string) => {
    setListdata(lisdata.filter(t => t.id !== id));
    setTasksDone([...tasksDone, ...lisdata.filter(task => task.id === id)]);

  };
  const deleteTask = (id: string) => {
    setListdata(lisdata.filter(task => task.id !== id));
  };
  const deleteTaskDone = (id: string) => {
    setTasksDone(tasksDone.filter(task => task.id !== id));
  };

  const updatedTask = (id: string) => {
    setListdata(lisdata.map(task => task.id === id ? { ...task, name: updated } : task));
    setUpdateMode(false)
  };

  console.log
  return (
    <div className=" w-full h-screen flex flex-col   p-10  ">
      <div className=' w-full flex  justify-center gap-4  items-center flex-col'>
        <div className=' flex  items-center gap-4'>   <p className=' font-normal text-2xl'>Create List</p>
          <button
            disabled={show}
            onClick={
              () => setShow(true)
            }

            className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-2xl'>+</button>
        </div>

        {show && <div className='w-1/3 h-14'>
          <input onChange={(e) => setList(e.target.value)} type="text" className='w-full   h-12 border-2 border-blue-400  pl-3 rounded-md' />
          <button onClick={handlelist} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl mt-5'>create</button>

        </div>}
      </div>
      <p className=' text-xl mt-14'> {lisdata.length} Task to do</p>
      <div className=' flex  gap-5 flex-wrap '>
        {lisdata && lisdata.map(function (l) {
          return (
            <div className=' w-1/4 h-max ' >

              <div key={l.id} className=' w-full  h-max    bg-blue-400  p-5 shadow-xl mt-4'>
                <p className=' text-3xl text-white'>{l.name}</p>
                <p className=' text-base mb-4 text-white'>status</p>
                <button onClick={() => finishedtask(l.id)} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl'>Done</button>

              </div>
              <div className=' flex  gap-3 mt-5'>
                <button disabled={updatemode} onClick={() => setUpdateMode(true)} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md'>Update</button>
                <button onClick={() => deleteTask(l.id)} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md text-red-500'>Delete</button>
              </div>
              {updatemode && <div>
                <input onChange={(e) => setUpdates(e.target.value)} type="text" className='w-full   h-12 border-2 border-blue-400  pl-3 rounded-md mt-5' />
                <button onClick={() => updatedTask(l.id)} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl mt-3'>save</button>
              </div>}


            </div>
          )
        })}





      </div>


      <p className=' text-xl  mt-20'>{tasksDone.length} Tasks finished</p>
      <div className=' flex  gap-5 flex-wrap '>
        {tasksDone && tasksDone.map((t) => {
          return (
            <div className=' w-1/4 h-max ' key={t.id}>

              <div className=' w-full  h-max    bg-blue-400  p-5 shadow-xl mt-4'>
                <p className=' text-3xl text-white'>{t.name}</p>
                <p className=' text-base mb-4 text-white'>status</p>
                <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl'>completed</button>


              </div>
              <div className=' flex  gap-3 mt-5'>
                <button onClick={() => deleteTaskDone(t.id)} className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md text-red-500'>Delete</button>
              </div>

            </div>
          )
        })}





      </div>

    </div>
  )
}

export default App
