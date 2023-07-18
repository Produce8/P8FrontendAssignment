import React, { useState, useCallback, useEffect, useRef } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'


import { formatMetricBucks, formatPercent } from '../util/format';

import styles from './home.module.css';

import Slider from '../components/slider';
import RadioList, { RadioValue } from '../components/radiolist';
import FancyMoney from '../components/fancymoney';
import Button from '../components/button';


const PURCHASE_PRICE_MIN = 50_000;
const PURCHASE_PRICE_MAX = 2_500_000;
const PURCHASE_PRICE_STEP = 1_000;
const PURCHASE_PRICE_DEFAULT = 250_000;

const INTEREST_RATE_MIN = 0.0;
const INTEREST_RATE_MAX = 25.0;
const INTEREST_RATE_STEP = 0.1;
const INTEREST_RATE_DEFAULT = 1.5;

const PERIODS = [
  { id: 'period20years', label: '20 years', value: 20 },
  { id: 'period25years', label: '25 years', value: 25 },
  { id: 'period30years', label: '30 years', value: 30 },
]
const PERIOD_DEFAULT = PERIODS[1].value;


const fetchMonthlyPayment = async (purchasePrice: string, interestRate: string, period: string): Promise<{ monthlyPayment: number, error: string }> => {
  const isClient = typeof window !== "undefined";
  const url = `${isClient ? window.location.origin : 'http://127.0.0.1:3000'}/api/mortgageCalculation?`;
  const params = new URLSearchParams({
    principal: purchasePrice,
    annualInterestRate: interestRate,
    termOfLoan: period,
  } as Record<string, string>);

  const response = await fetch(url + params, {
    method: "POST"
  });

  return await response.json()
}

interface ServerSideProps {
  defaultMonthlyPayment: number
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const res = await fetchMonthlyPayment(
    String(PURCHASE_PRICE_DEFAULT),
    String(INTEREST_RATE_DEFAULT),
    String(PERIOD_DEFAULT)
  );
  if (res.error) {
    // uuuuuuhhhhhh wrong guess is better than serving a 500 imo
    return { props: { defaultMonthlyPayment: 853.50 } };
  } else {
    return { props: { defaultMonthlyPayment: res.monthlyPayment } };
  }
}


const Home = ({ defaultMonthlyPayment }: ServerSideProps) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(PURCHASE_PRICE_DEFAULT)
  const onPurchasePriceChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setPurchasePrice(Number(e.target.value));
  }, []);

  const [interestRate, setInterestRate] = useState<number>(INTEREST_RATE_DEFAULT)
  const onInterestRateChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setInterestRate(Number(e.target.value));
  }, []);

  const [period, setPeriod] = useState<number>(PERIOD_DEFAULT)
  const onPeriodChange = useCallback<(value: RadioValue) => void>((v) => {
    setPeriod(Number(v));
  }, []);


  const [isLoadingMonthlyPayment, setIsLoadingMonthlyPayment] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(defaultMonthlyPayment);

  // Don't run on mount. We'll serve the correct value instantly with SSR!
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setIsLoadingMonthlyPayment(true);
    setApiError(null);

    // Debounce network fetch so it's not super laggy while using the slider or something
    const debounceId = setTimeout(async () => {
      const res = await fetchMonthlyPayment(String(purchasePrice), String(interestRate), String(period));
      if (res.error) {
        setApiError(res.error);
      } else {
        setMonthlyPayment(res.monthlyPayment);
      }
      setIsLoadingMonthlyPayment(false);
    }, 55)
    return () => clearTimeout(debounceId);
  }, [purchasePrice, interestRate, period])


  const outputBlurred = isLoadingMonthlyPayment || apiError;


  return (
    <div className={styles.home}>
      <div className={styles.cta}>
        <h1>
          Get Started With Digital Credit Experience
        </h1>
        <p>
          Qualify or apply your mortgage in minutes
        </p>
      </div>

      <div className={styles.calculator}>
        {/* Input Column (Row on Mobile) */}
        <div className={styles.inputs}>

          {/* Purchase Price Slider */}
          <div className={styles.slider}>
            <div className={styles.label}>Purchase Price</div>
            <div className={styles.value}>
              <FancyMoney className={styles.purchasePrice} value={purchasePrice} />
            </div>
            <Slider
              value={purchasePrice}
              onChange={onPurchasePriceChange}
              min={PURCHASE_PRICE_MIN}
              max={PURCHASE_PRICE_MAX}
              step={PURCHASE_PRICE_STEP}
            />
            <div className={styles.markings}>
              <div className={styles.mark}>
                {formatMetricBucks(PURCHASE_PRICE_MIN, 2)}
              </div>
              <div className={styles.mark}>
                {formatMetricBucks(PURCHASE_PRICE_MAX, 2)}
              </div>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className={styles.slider}>
            <div className={styles.label}>Interest Rate</div>
            <div
              className={styles.value}
              /* HACK: This should line up horizontally with purchase price */
              style={{ marginLeft: '1rem' }}
            >
              {formatPercent(interestRate)}
            </div>
            <Slider
              value={interestRate}
              onChange={onInterestRateChange}
              min={INTEREST_RATE_MIN}
              max={INTEREST_RATE_MAX}
              step={INTEREST_RATE_STEP}
            />
            <div className={styles.markings}>
              <div className={styles.mark}>
                {formatPercent(INTEREST_RATE_MIN)}
              </div>
              <div className={styles.mark}>
                {formatPercent(INTEREST_RATE_MAX)}
              </div>
            </div>
          </div>

          {/* Period Radio */}
          <div className="period">
            <div className={styles.radioLabel}>
              Period
            </div>
            <RadioList
              value={period}
              onChange={onPeriodChange}
              options={PERIODS}
            />
          </div>
        </div>
        {/* Output Column (Row on Mobile) */}
        <div
          className={styles.output}
        >
          {!apiError ? null : (
            <div className={styles.outError}>
              {apiError}
            </div>
          )}
          <div
            className={styles.outBox}
            style={outputBlurred ? { filter: 'blur(25px)' } : undefined}
          >
            <div className={styles.outMessage}>
              Your total monthly payment will be
            </div>
            <FancyMoney className={styles.outValue} value={monthlyPayment ?? 0} showChange />
            <div className={styles.outUnit}>
              /month
            </div>
            <Button className={styles.outAction}>
              Apply Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
