import { useState, useEffect } from 'react'
import { Hamster } from '../../models/Hamster'


const CutestHamster = () => {

    const [cutestHamster, setCutestHamster] = useState<null | Hamster[]>(null);
    const [errorIsThere, setErrorIsThere] = useState<boolean>(false)

    useEffect(() => {
        async function send() {
            await getCutest(setCutestHamster)
        }
        send()
    }, [])


    // gives us a winner if we have hamsters with same score
    if (cutestHamster && cutestHamster?.length > 1) {
        const giveUsWinner: Hamster = cutestHamster[Math.floor(Math.random() * cutestHamster.length)]
        setCutestHamster([giveUsWinner])
    }

    console.log('the cutest is: ', cutestHamster)

    return (
        <div>
            < section className='cutestHamsterSection'>
                {cutestHamster ?
                    cutestHamster.map(hamster => (

                        <section key={hamster.id} className="galleryCard">
                            <img
                                src={`/img/${hamster.imgName}`}
                                alt={hamster.name}
                                key={hamster.id} />
                            <br />
                            <p>{hamster.name}</p>
                            <p>the hamsters score is: {hamster.wins === 0 ? 1 :`${hamster.wins - hamster.defeats}`} </p>
                        </section>

                    ))

                    : 'Humsters are taking some rest... apparently'
                }

            </section>
        </div>
    )

    async function getCutest(theCutestHamster: any) {
        try {
            const url = '/hamsters/cutest'
            const response = await fetch(url)
            console.log('This is a cutest hamster')
            if (!response.ok) {
                throw new Error(response.statusText)
            }
             else {
                const data = await response.json()
                theCutestHamster(data)

            }
        } catch (error) {
            setErrorIsThere(true)
            console.log('There is an error:', error);
        }
    }


}

export default CutestHamster