"use client"

import React, { useState, useEffect } from 'react'

export default function Timer() {
    const [date, setDate] = useState('')
    const [age, setAge] = useState<number | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    const handleSubmit = () => {
        const birthDate = new Date(date)
        const today = new Date()
        const diff = today.getTime() - birthDate.getTime()
        const ageInYears = diff / (1000 * 60 * 60 * 24 * 365)
        setAge(parseFloat(ageInYears.toFixed(10)))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (isSubmitted) {
            const interval = setInterval(() => {
                const birthDate = new Date(date)
                const today = new Date()
                const diff = today.getTime() - birthDate.getTime()
                const ageInYears = diff / (1000 * 60 * 60 * 24 * 365)
                const ageString = ageInYears.toFixed(7)
                const ageParts = ageString.split('.')
                const integerPart = ageParts[0]
                const decimalPart = ageParts[1]
                const integerFontSize = 100 - (integerPart.length * 10)
                const decimalFontSize = 50 + (decimalPart.length * 5)
                setAge(parseFloat(ageString))
                setIntegerFontSize(integerFontSize)
                setDecimalFontSize(decimalFontSize)
            }, 50)
            return () => clearInterval(interval)
        }
    }, [isSubmitted, date])
    
    const [integerFontSize, setIntegerFontSize] = useState(100)
    const [decimalFontSize, setDecimalFontSize] = useState(50)

    return (
        <section className='flex justify-center items-center flex-col'>
            <h1 className='mt-8 text-7xl mb-32'>Как долго еще?</h1>
            {!isSubmitted && <div className='flex flex-col gap-8'>
                <input type="date" placeholder='input your birthday date' className='py-4 px-10 mt-32 text-center' value={date} onChange={handleInput}/>
                <button onClick={handleSubmit} className='bg-gray-900 h-12 rounded-xl text-white shadow-lg hover:bg-gray-800 transition'>Узнай</button>
            </div>}
            {isSubmitted && age !== null && <div className='text-5xl font-bold absolute left-0 right-0 top-1/3'>
                <span className='text-9xl'>{Math.floor(age)}</span><span>.</span>
                <span className='text-5xl'>{(age - Math.floor(age)).toFixed(7).substring(2)}</span>
            </div>}
        </section>
    )
}