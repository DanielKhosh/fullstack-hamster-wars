import { Link } from "react-router-dom"
import CutestHamster from "./CutestHamster"

const Start = () => (
    <div>
        <p> In a place where Cute Rules the world. the cutest hamster king calls on you to chose the next role of this world and bring peace and order to this land.<br/> 
        </p>
        <h3>The king hamster orders you to do him this one faver</h3>
        <div className="winner">
            <CutestHamster/>
        </div>
        <div>
            <p>
                To start playing you need to navigate to PLAY with the navbar, or press <Link className="txtPlay" to="/play">Play</Link>.
            </p>
            <p>
                This app is used for comparing to random hamsters and than choosing the one that is the cutes this data is than saved on a fire store static api. the winner is base on wins - defeats for a final score.
            </p>
        </div>
    </div>
)

export default Start



