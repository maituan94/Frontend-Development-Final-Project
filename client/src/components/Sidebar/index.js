import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import { navItems } from './constants';

const NavItem = ({
  id,
  label,
  iconName,
  href,
}) => {
  return (
    <li
      key={id}
      className="relative"
    >
      <a
        className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
        href={href}
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
      >
        <FontAwesomeIcon className="w-3 h-3 mr-3" icon={Icons[iconName]} />
        <span>{label}</span>
      </a>
    </li>
  )
}

const Sidebar = ({
  itemsList = navItems
}) => {
  return (
    <div className="w-60 h-full shadow-md bg-white px-1 absolute">
      <ul className="relative">
        {
          itemsList.map((item, index) => {
            return (
              <NavItem
                id={index}
                label={item?.label}
                iconName={item?.iconName}
                href={item?.href}
              />
            )
          })
        }
      </ul>
    </div>


  )
}

export default Sidebar
