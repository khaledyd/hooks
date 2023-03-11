import React from 'react'

export default function Practise() {
    //this is my data
    const data = {
        name: "khalid",
        id: 12,
        hopes: [{ name: "coding", score: 80 }, { name: "moviews", score: 90 }, { name: "dating", score: 70 }]
    }
    const filtered = data.hopes.filter(function (hop) {
        return (
            hop.score <= 80
        )
    })
    return (
        <div className=' w-full h-screen bg-slate-200  flex justify-center  pt-10'>
            <div className='  w-1/4 h-max bg-gray-500 p-5 rounded-md  text-xl'>
                <h1 className=' text-white '>{data.name}</h1>
                <div className=' flex gap-4 text-white/60'>
                    {filtered.map((h, index) => {
                        return (
                            <div key={index} className='flex flex-col'>
                                <p key={index}>{h.name}</p>
                                <p className='  mt-2  text-center bg-white px-5 py-1 text-teal-700 rounded-sm  text-sm'>{h.score}</p>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
