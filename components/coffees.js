import { useEffect, useState } from 'react'
import Image from 'next/image'
import NewCoffee from './newCoffee'
import styles from '@/styles/Home.module.css'
import coffeeImg from '@/public/assets/mug.svg'

export default function Coffees() {
  const [coffees, setCoffees] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAddingCoffee, setIsAddingCoffee] = useState(false)
  const [isAdded, setIsAdded] = useState(true)

  useEffect(() => {
    if(isAdded)
      fetch('/api/coffee')
        .then(res => res.json())
        .then(res => setCoffees(res.coffees))
        .catch(err => console.log(err.message))
        .finally(() => {
          setIsLoaded(true)
          setIsAdded(false)
        })
  }, [isAdded])

  return (
    <div className={styles.coffeeContainer}>
      <div className={styles.coffeeTitle}>
        <span className={styles.title}>Coffees</span>
        <button onClick={() => setIsAddingCoffee(!isAddingCoffee)}>New Coffee</button>
        {isAddingCoffee && <NewCoffee setIsAddingCoffee={setIsAddingCoffee} setIsAdded={setIsAdded} />}
      </div>
      {isLoaded ?
        !coffees.length ? <div>No coffees yet</div> :
        coffees.map(coffee => (
          <div key={coffee.id} className={styles.coffees}>
            <span style={{marginRight: '8px'}} >
              <Image
                src={coffeeImg}
                alt='coffee'
                width={15}
              />
            </span>
            <span>
              {`${coffee.name} - ${coffee.year}`}
            </span>
          </div>
        )) : <div>Loading...</div>
      }
    </div>
  )
}
