import { useEffect, useState } from "react"
import hamsters from "../../atoms/hamsters";
import { Hamster } from "../../models/Hamster"


export const imgStyle = {
    width: '20rem',
    height: 'auto',
    margin: '1rem',
};


const Play = () => {

    const [players, setPlayers] = useState<null | Hamster[]>(null)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [winner, setWinner] = useState<null | Hamster>(null)
    const [looser, setLooser] = useState<null | Hamster>(null)

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

    const winnerStats = (a:Hamster) => {

        fetch(`/hamsters/` + a.id, {
            method: 'PUT',
            body: JSON.stringify({ wins: a.wins+1, games: a.games+1 }),
            headers: {
                "Content-type": "application/json"
            }
        })
        setWinner(a)
        console.log("uppdate the backend winner")
    }

    //uppdate the backend loses

    const looserStats = (b:Hamster) => {

        fetch(`/hamsters/` + b.id, {
            method: 'PUT',
            body: JSON.stringify({ defeats: b.defeats+1, games: b.games+1 }),
            headers: {
                "Content-type": "application/json"
            }
        })
        setLooser(b)
        console.log("uppdate the backend loses")
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
                    <h2>Winner Winner chicken dinner</h2>
                    <br></br>
                    
                    <h3> {winner?.name} </h3>
                    <img style={imgStyle} src={`/img/${winner.imgName}`} alt={winner.imgName} />
                    <h2>He has played {winner?.games === 0 ? 1 : winner?.games} games so far and won {winner.wins === 0 ? 1 : winner?.wins } and lost {winner?.defeats} times.</h2>
                    <button className="startButton" onClick={() => playGame()}>NEXT BATTLE</button>
                </> : <>
                <h2> choose the cuter hamster </h2>
                </>
            }
            <section className='battleWrapper'>
                {players ?
                    <div className="playSectionWraper">
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

                    </div>
                    : 'Loading Hamsters ...'
                }
            </section>
        </section>
    )

}

export default Play
