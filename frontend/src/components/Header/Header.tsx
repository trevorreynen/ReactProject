// =========================< IMPORTS: REACT >=================================
import { Link } from 'react-router-dom'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import { SidebarState, useCommonStore } from '@/hooks/common-context'


// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: CSS >===================================
import './Header.scss'


export default function Header() {
  const { sidebarState, setSidebarState } = useCommonStore()

  const toggleSidebar = () => {
    setSidebarState(
      sidebarState === SidebarState.Expanded
        ? SidebarState.Collapsed
        : sidebarState === SidebarState.Collapsed
        ? SidebarState.Hidden
        : SidebarState.Expanded
    )
  }

  return (
    <div className='Header'>


      <div className='header-left-side-content'>
        <button className='collapse-sidebar' onClick={toggleSidebar}>
          <div className='menu-icon' />
        </button>
      </div>

      <div className='header-center-content'>
        <h2>Test Website by Trevor Reynen</h2>
      </div>


    </div>
  )
}

