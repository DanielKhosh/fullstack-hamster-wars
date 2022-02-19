import { Link } from "react-router-dom"
import CutestHamster from "./CutestHamster"

const Start = () => (
    <div>
        <p> In a place where Cute Rules the world. the cutest hamster king calls on you to chose the next role of this world and bring peace and order to this land.<br/> 
        </p>
        <p>
        Press <Link className="txtPlay" to="/play">Play</Link> to start.
        </p>
        <h3>The king hamster orders you to do him this one faver</h3>
        <div className="winner">
            <CutestHamster/>
        </div>
    </div>
)

export default Start



