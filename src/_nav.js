import React from 'react'
import CIcon from '@coreui/icons-react'
// import logo from '../src/assets/images/image.png';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilUser,
  cilSpeedometer,
  cilStar,
  cilLocationPin,
  cilNewspaper,
  cilInfo,
  cilBuilding,
  cilInstitution,
  cilUserX,
  cilSquare,
  cilHome,
  cilBriefcase,

} from '@coreui/icons'
import { CHeaderBrand, CHeaderNav, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: () => (
  //     <div className="d-flex align-items-center">
  //       <img src={logo} alt="Logo" style={{ width: '32px', height: '32px', marginLeft: '10px' }} />
  //       <span style={{ marginLeft: '10px' }}>NanaBar Samaj</span>
  //     </div>
  //   ),
  // },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Home',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/Home/Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Profile',
  //   to: '/Home/Profile',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'News',
    to: '/Home/News',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Business',
    to: '/Home/Business',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pragati Mandal',
    to: '/Home/pragatimandal',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Besnu',
    to: '/Home/Besnu',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Career',
    to: '/Home/Career',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
]

export default _nav
