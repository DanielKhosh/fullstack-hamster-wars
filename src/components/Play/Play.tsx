import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"


export const imgStyle = {
    width: '20rem',
    height: 'auto',
    margin: '1rem',
};


const Play = () => {

    const [players, setPlayers] = useState<null | Hamster[]>(null)
    const [winner, setWinner] = useState<null | Hamster>(null)
    const [looser, setLooser] = useState<null | Hamster>(null)
    const [showResult, setShowResult] = useState<boolean>(false)

    useEffect(() => {
        getPlayers(setPlayers)
        console.log("getplayers")
    }, [])

    async function getPlayers(saveData: any) {
        const url = '/hamsters/random/'
        const response = await fetch(url)
        const playerOne = await response.json()
        let response2 = await fetch(url)
        let playerTwo = await response2.json()

        while (playerOne.id === playerTwo.id) {
            response2 = await fetch(url)
            playerTwo = await response2.json()
        }
        saveData([playerOne, playerTwo])
    }

    //update the backend winns

    const winnerStats = (a: Hamster) => {

        fetch(`/hamsters/` + a.id, {
            method: 'put',
            body: JSON.stringify({ wins: a.wins + 1, games: a.games + 1 }),
            headers: {
                "Content-type": "application/json"
            }
        })
        setWinner(a)
    }

    //uppdate the backend loses

    const looserStats = (b: Hamster) => {

        fetch(`/hamsters/` + b.id, {
            method: 'put',
            body: JSON.stringify({ defeats: b.defeats + 1, games: b.games + 1 }),
            headers: {
                "Content-type": "application/json"
            }
        })
        setLooser(b)
    }

    const playGame = () => {
        getPlayers(setPlayers)
        setWinner(null)
        setLooser(null)
    }

    const handleClick = (a: Hamster, b: Hamster) => {
        looserStats(b)
        winnerStats(a)
    }

    console.log(players)

    return (


        <section className='battleWrapper'>
            {/* om man har valt en vinnare */}
            {winner ?
                <>
                    <h3>Winner Winner chicken dinner</h3>
                    <br></br>
                    <h2 >{winner?.name}</h2>
                    <img style={imgStyle} src={`/img/${winner.imgName}`} alt={winner.imgName} />
                    <h2>He has played {winner?.games} games so far and won {winner?.wins} and lost {winner?.defeats} times.</h2>
                    <button className="startButton" onClick={() => playGame()}>NEXT BATTLE</button>
                </> : <>
                   <div> <h2> choose the cuter hamster </h2> </div>
                </>
            }
            <section className='battleWrapper'>
                {players ?
                    <>
                        {
                            !winner && !looser ?
                                players.map(x => (
                                    <article onClick={!showResult ? () => handleClick(x, players?.filter(l => l !== x)[0]) : undefined} key={x.id} >
                                        <li><img style={imgStyle} src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} /></li>
                                        <h2 >{x.name}</h2>
                                    </article>
                                ))
                                : null
                        }

                    </>
                    : 'Loading Hamsters ...'
                }
            </section>
        </section>
    )

}

export default Play
