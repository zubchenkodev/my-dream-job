import { Fragment } from "react"
import { getInitials } from "../utils"

const Avatar = ({avatar, name, size, color, textSize}) => {
  return (
    <Fragment>
    {avatar ?
        (<div className="avatar">
          <div className={`rounded-full ring ring-${color} ring-offset-2 ${size}`}>
            <img src={avatar} alt={`Avatar of ${name}`} />
          </div>
        </div>)
        :
        (<div className="avatar placeholder">
          <div className={`rounded-full ring ring-${color} bg-slate-500 ring-offset-2 ${size}`}>
            <span className={`text-white ${textSize}`}>{getInitials(name)}</span>
          </div>
        </div>)
      }
    </Fragment>
  )
}

export default Avatar