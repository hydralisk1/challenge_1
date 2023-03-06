import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'

export default function NewCoffee({ setIsAddingCoffee, setIsAdded }) {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [caffine, setCaffine] = useState('')

  const [nameError, setNameError] = useState(true)
  const [yearError, setYearError] = useState(true)
  const [caffineError, setCaffineError] = useState(true)

  const [errorMsg, setErrorMsg] = useState('')

  const border = 'solid 1px black'
  const borderError = 'solid 1px red'

  const handleSubmit = e => {
    e.preventDefault()

    if(!nameError && !yearError && !caffineError){
      fetch('/api/coffee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, year: year*1, caffineContent: caffine*1, caffinePercentage: (caffine*100) / 28349.5})
      })
        .then(res => {
          if(res.status < 400) {
            setIsAdded(true)
            setName('')
            setYear('')
            setCaffine('')
            setIsAddingCoffee(false)
          }
          else throw new Error()
        })
        .catch(err => console.log(err.message))
    }
  }

  useEffect(() => {
    setErrorMsg('')
    setNameError(false)
    setYearError(false)
    setCaffineError(false)

    if(!caffine.length){
      setErrorMsg('Caffine is required')
      setCaffineError(true)
    }else setCaffineError(false)

    if(!year.length){
      setErrorMsg('Year is required')
      setYearError(true)
    }
    else if(year*1 < 2000 || year*1 > new Date().getFullYear()) {
      setErrorMsg('Year must be between 2000 and current year')
      setYearError(true)
    }

    if(!name.length){
      setErrorMsg('Name is required')
      setNameError(true)
    }
  }, [name, year, caffine])

  return (
    <div className={styles.addCoffeeContainer}>
      <div className={styles.addCoffeeTitle}>
        New Coffee
      </div>
      <form
        className={styles.addCoffeeForm}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputContainer}>
          <span>Name</span>
          <span style={{border: nameError ? borderError : border}}>
            <input
              className={styles.input}
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </span>
        </div>
        <div className={styles.inputContainer}>
          <span>Year</span>
          <span style={{border: yearError ? borderError : border}}>
            <input
              className={styles.input}
              type='text'
              value={year}
              onChange={e => {
                if(!(/[^0-9]/.test(e.target.value)))
                  setYear(e.target.value)
              }}
            />
          </span>
        </div>
        <div className={styles.inputContainer}>
          <span>Caffine</span>
          <span style={{border: caffineError ? borderError : border}}>
            <input
              className={styles.input}
              type='text'
              value={caffine}
              onChange={e => {
                if(!(/[^0-9]/.test(e.target.value)))
                 setCaffine(e.target.value)
              }}
            />
          </span>
        </div>
        <div className={styles.errorMessage}>
          {!!errorMsg.length && errorMsg}
        </div>
        <div className={styles.buttons}>
          <button type='submit'>Submit</button>
          <button onClick={() => setIsAddingCoffee(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
