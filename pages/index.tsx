import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CtaCard from '../components/CtaCard'
import Navbar from '../components/Navbar'
import RadioOptions from '../components/RadioOptions'
import Slider from '../components/Slider'
import ErrorAlert from '../components/ErrorAlert'

const Home: NextPage = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [interestRate, setInterestRate] = useState(17)
  const [period, setPeriod] = useState(20)
  const [mortgage, setMortgage] = useState(0.0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const calculate = async () => {
      try {
        setError('')
        setIsLoading(true)
        const response = await fetch(`/api/mortgageCalculation?principal=${purchasePrice}&annualInterestRate=${interestRate}&termOfLoan=${period}`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          }
        })
  
        const {monthlyPayment, error} = await response.json()
        if(error) {
          setError(error)
          throw error
        } 
  
        setMortgage(monthlyPayment)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    calculate()
  }, [purchasePrice, interestRate, period])

  return (
    <div className='content-wrapper'>
      <Navbar />
      <ErrorAlert show={error !== ''} message={error}/>
      <div className='content'>
        <div className='container mt-10'>
          <div className='header'>
            <h1 className='mt-1'>Get started with Digital Credit Experience</h1>
            <span className='tagline'>Qualify of apply your mortgage in minutes</span>
          </div>
          <div className='main'>
            <div className='values'>
              <div className='sliders mt-5'>
                <Slider label='Purchase Price' options={{defaultValue: purchasePrice, min: 50000, max: 2500000, type: "dollar", labelMin: "$50K", labelMax: "$2.5M"}} onChange={ (value : number) => setPurchasePrice(value)}/>
                <Slider label='Interest Rate' options={{defaultValue: interestRate, min: 0, max: 25,  type: "percent", labelMin: "0", labelMax: "25%"}} onChange={ (value : number) => setInterestRate(value)}/>
              </div>
              <div className='options mt-5'>
                <RadioOptions label='Period' options={{values: [20, 25, 30], value: period}} onChange={(value: number) => setPeriod(value)}/>
              </div>
            </div>
            <div className='total'>
                <CtaCard mortgage={mortgage} isLoading={isLoading}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
