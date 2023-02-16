import React, { useReducer } from 'react';

import { nanoid } from 'nanoid';

function reducer(state: Task, action: ActionType): Task   {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                toDoTaskts: [...state.toDoTaskts, action.payload],
            };
        case "SHOW_INPUT":
            return {
                ...state,
                showInput: action.showInput,
            };
        default:
            return state;
    }

}


interface Task {
    listName: string;
    showInput: boolean
    updateMode: boolean
    toDoTaskts: TaskList[]
}
interface TaskList {
    id: string;
    isCompleted: boolean;
    taskTitles: string
}

const INITIAL_STATE: Task = {
    listName: "",
    showInput: false,
    updateMode: false,
    toDoTaskts: [
        {
            id: nanoid(),
            isCompleted: false,
            taskTitles: ""
        }
    ]

}

type ActionType =
    | { type: "ADD_TASK"; payload: Task }
    | { type: "UPDATE_TASK"; payload: { id: string; task: string } }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "COMPLETE_TASK"; payload: string }
    | { type: "SHOW_INPUT"; showInput: boolean };






console.log(INITIAL_STATE)
function Usestate() {

    const [tasks, dispatch] = useReducer(reducer, INITIAL_STATE)

    console.log(tasks)

    return (
        <div className=" w-full h-screen flex flex-col   p-10  ">
            <div className=' w-full flex  justify-center gap-4  items-center flex-col'>
                <div className=' flex  items-center gap-4'>   <p className=' font-normal text-2xl'>Create List</p>
                    <button onClick={() =>
                        dispatch({
                            type: "SHOW_INPUT",
                            showInput: true
                        })
                    }
                        className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-2xl'>+</button>
                </div>

                {tasks.showInput && <div className='w-1/3 h-14'>
                    <input type="text" className='w-full   h-12 border-2 border-blue-400  pl-3 rounded-md' />
                    <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl mt-5'>create</button>

                </div>}
            </div>
            <p className=' text-xl mt-14'>  Task to do</p>
            <div className=' flex  gap-5 flex-wrap '>


                <div className=' w-1/4 h-max ' >

                    <div className=' w-full  h-max    bg-blue-400  p-5 shadow-xl mt-4'>
                        <p className=' text-3xl text-white'>hi</p>
                        <p className=' text-base mb-4 text-white'>status</p>
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl'>Done</button>

                    </div>
                    <div className=' flex  gap-3 mt-5'>
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md'>Update</button>
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md text-red-500'>Delete</button>
                    </div>
                    <div>
                        <input type="text" className='w-full   h-12 border-2 border-blue-400  pl-3 rounded-md mt-5' />
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl mt-3'>save</button>
                    </div>


                </div>






            </div>


            <p className=' text-xl  mt-20'>Tasks finished</p>
            <div className=' flex  gap-5 flex-wrap '>

                <div className=' w-1/4 h-max '>

                    <div className=' w-full  h-max    bg-blue-400  p-5 shadow-xl mt-4'>
                        <p className=' text-3xl text-white'></p>
                        <p className=' text-base mb-4 text-white'>status</p>
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-xl'>completed</button>


                    </div>
                    <div className=' flex  gap-3 mt-5'>
                        <button className=' w-max  px-10 py-1 bg-gradient-to-tr  from-slate-50 to-slate-200 shadow-lg text-md text-red-500'>Delete</button>
                    </div>

                </div>





            </div>

        </div>
    )
}


export default Usestate
