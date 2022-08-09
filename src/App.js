import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';
import Header from './Header';
import Box from '@mui/material/Box'
import arrows from './images/spinning-arrows.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin, faEuro, faDollar, faHryvnia } from '@fortawesome/free-solid-svg-icons'




const CURRENCY_URL = 'https://api.exchangerate.host/latest?base=UAH&symbols=USD,EUR,UAH'
const CURRENCY_URL2 = 'https://api.exchangerate.host/latest'





function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [date, setDate] = useState()
  const [data, setData] = useState([])
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(CURRENCY_URL)
      .then(res => res.json())
      .then(data => {
        const originCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([...Object.keys(data.rates)])
        setDate(data.date)
        setFromCurrency(data.base)
        setToCurrency(originCurrency)
        setExchangeRate(data.rates[originCurrency])
        setData([...Object.entries(data.rates)])

      })

  }, [])

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      fetch(`${CURRENCY_URL2}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }

  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <Box className='container'
      sx={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 500,
        minHeight: 500,
        borderRadius: 5,
        backgroundColor: 'primary.dark',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        '&:hover': {
          backgroundColor: 'primary.main',

        },
      }} >

      <Header
        date={date}
        data={data}
      />
      <div className='bills'>
        <span><FontAwesomeIcon icon={faEuro} className='fa-shake' /> </span>
        <span><FontAwesomeIcon icon={faHryvnia} className='fa-shake' /> </span>
        <span><FontAwesomeIcon icon={faDollar} className='fa-shake' /> </span>
      </div>

      <h1 className='h1'>Currency Converter</h1>
      <Currency
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className='equals'><FontAwesomeIcon icon={faArrowsSpin} className='fa-spin' /> </div>
      <Currency
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount} />
    </Box>
  );
}

export default App;
