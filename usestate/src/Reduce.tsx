import React, { useState, useReducer, ChangeEvent } from 'react';

interface state {
  inputvalue: string;
  listnames: string[];
}

const intialState: state = {
  inputvalue: "",
  listnames: []
}

type Action = { type: 'UPDATE_INPUT', payload: string } | { type: 'ADD_NAME', payload: string };

const reducer = (state: state, action: Action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        inputvalue: action.payload
      }
    case 'ADD_NAME':
      return {
        ...state,
        listnames: [...state.listnames, action.payload],
        inputvalue: ""
      }


    default:
      return state;
  }

}

export default function Test() {
  const [state, dispatch] = useReducer(reducer, intialState)

  const handlechangeinput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_INPUT",
      payload: e.target.value
    })
  }
  const handleadd = () => {
    dispatch({
      type: "ADD_NAME",
      payload: state.inputvalue
    })
  }

  return (
    <div className="flex flex-col bg-gradient-to-tr from-violet-300 via-slate-300 to-stone-300 w-full h-screen p-10">
      <input
        type="text"
        value={state.inputvalue}
        className="w-1/3 p-5 rounded-md border-blue-600 self-center"
        onChange={handlechangeinput}

      />
      <button

        className="w-max px-10 py-5  bg-blue-600text-white rounded-2xl mt-5 self-center"
        onClick={handleadd}
      >
        Tell me my name
      </button>
      <p className="self-center mt-5 p-5 bg-white  text-gray-900">
        This is the list of names: {state.listnames.join(" , ")}
      </p>
    </div>
  );
}
