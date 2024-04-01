import { NavLink } from "react-router-dom";
import { navLinks as links } from "../consts";
import { createElement } from "react";
import { IconContext } from "react-icons";


const NavLinks = ({bottombar}) => {
  return (
    <ul className={bottombar ? "flex items-center justify-between" : "flex flex-col gap-4"}>
      {links.map((link) => {
        return (
          <li key={link.id}>
            <NavLink 
              to={link.url} 
              className={`${bottombar ? 'mdjNavLinkBottom group' : 'mdjNavLink group'}`}
              >
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <span>{createElement(link.icon)}</span>
              </IconContext.Provider>
              {<span className={bottombar ? 'text-[0.5rem]' : 'text-lg'}>{link.text}</span>}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks