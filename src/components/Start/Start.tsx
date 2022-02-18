import { Link } from "react-router-dom"
import CutestHamster from "./CutestHamster"

const Start = () => (


    <div>
        <p> The game is simple - click on the hamster you think is cuter.
            The prettiest hamster gets cheese supplies for life. <br/> 
            Click  <Link className="txtPlay" to="/play">Play</Link> to begin.
        </p>
        <h3>This one is the cutest hamster at the moment</h3>
        <div className="winner">
            <CutestHamster/>
        </div>
    </div>

)

export default Start



