import type { NextPage } from 'next'
import CtaCard from '../components/CtaCard'
import Navbar from '../components/Navbar'
import RadioOptions from '../components/RadioOptions'
import Slider from '../components/Slider'

const Home: NextPage = () => {
  return (
    <div className='content-wrapper'>
      <Navbar />
      <div className='content'>
        <div className='container mt-10'>
          <div className='header'>
            <h1 className='mt-1'>Get started with Digital Credit Experience</h1>
            <span className='tagline'>Qualify of apply your mortgage in minutes</span>
          </div>
          <div className='main'>
            <div className='values'>
              <div className='sliders mt-5'>
                <Slider label='Purchase Price' options={{defaultValue: 500000, min: 50000, max: 2500000, type: "dollar", labelMin: "$50K", labelMax: "$2.5M"}}/>
                <Slider label='Interest Rate' options={{defaultValue: 15, min: 0, max: 25,  type: "percent", labelMin: "0", labelMax: "25%"}}/>
              </div>
              <div className='options mt-5'>
                <RadioOptions label='Period' values={[20, 25, 30]}/>
              </div>
            </div>
            <div className='total'>
                <CtaCard purchasePrice={0} interestRate={0} period={0}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
