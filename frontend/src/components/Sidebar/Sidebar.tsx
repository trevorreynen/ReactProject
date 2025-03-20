// =========================< IMPORTS: REACT >=================================
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import { SidebarState, useCommonStore } from '@/hooks/common-context'

// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: STYLES >================================
import './Sidebar.scss'


const menuItems = [
  {
    key: 'sub1',
    label: 'Home',
    iconClass: 'icon-home',
    children: [
      { key: '1', label: 'Home', path: '/home', iconClass: 'icon-home' },
      { key: '2', label: 'Option 2', path: '/option-2', iconClass: 'icon-temp' },
      { key: '3', label: 'Option 3', path: '/option-3', iconClass: 'icon-temp' },
      { key: '4', label: 'Option 4', path: '/option-4', iconClass: 'icon-temp' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    iconClass: 'icon-bug',
    children: [
      { key: '5', label: 'Option 5', path: '/option-5', iconClass: 'icon-temp' },
      { key: '6', label: 'Option 6', path: '/option-6', iconClass: 'icon-temp' },
      {
        key: 'sub3',
        label: 'Submenu',
        iconClass: 'icon-bug',
        children: [
          { key: '7', label: 'Option 7', path: '/option-7', iconClass: 'icon-temp' },
          { key: '8', label: 'Option 8', path: '/option-8', iconClass: 'icon-temp' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    iconClass: 'icon-settings',
    children: [
      { key: '9', label: 'Option 9', path: '/option-9', iconClass: 'icon-temp' },
      { key: '10', label: 'Option 10', path: '/option-10', iconClass: 'icon-temp' },
      { key: '11', label: 'Option 11', path: '/option-11', iconClass: 'icon-temp' },
      { key: '12', label: 'Option 12', path: '/option-12', iconClass: 'icon-temp' },
    ],
  },
]


export default function Sidebar() {
  const { sidebarState } = useCommonStore()

  if (sidebarState === SidebarState.Hidden) {
    return null
  }

  const location = useLocation() // Get current route

  // Set ALL menus and submenus to CLOSED by default
  const [openSections, setOpenSections] = useState<string[]>([]) // Empty means all collapsed
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]) // Track open submenus separately
  const [selectedItem, setSelectedItem] = useState<string>('')

  // Toggle main menu sections
  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    )
  }

  // Toggle submenu sections
  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    )
  }

  // Handle item selection
  const handleItemClick = (key: string) => {
    setSelectedItem(key)
  }


  return (
    <div className={`Sidebar ${sidebarState}`}>


      {menuItems.map((section) => {
        // Checks to see which main-menu-item should be highlighted based on route.
        const isActiveSection = section.children.some(
          (item) => location.pathname === item.path ||
          (item.children && item.children.some((subItem) => location.pathname === subItem.path))
        );


        return (
          <div key={section.key} className='menu-section'>

            {/* Main Menu Header (Expandable) */}
            <div className={`sidebar-menu-item main-menu-item ${isActiveSection ? 'active' : ''}`} onClick={() => toggleSection(section.key)}>
              <div className='menu-left'>
                <span className={`menu-icon ${section.iconClass}`}></span>
                {sidebarState !== SidebarState.Collapsed && <span className='menu-label'>{section.label}</span>}
              </div>

              <span className={`menu-right arrow ${openSections.includes(section.key) ? 'close-it' : 'open-it'}`}></span>
            </div>

            {/* Render menu items if section is open */}
            {openSections.includes(section.key) && (
              <div className='menu-items'>
                {section.children.map((item) =>
                  item.children ? (
                    // Submenu (Expandable)
                    <div key={item.key} className='submenu'>

                      <div className='sidebar-menu-item' onClick={() => toggleSubmenu(item.key)}>
                        <div className='menu-left'>
                          <span className={`menu-icon ${item.iconClass}`}></span>
                          <span className='menu-label'>{item.label}</span>
                        </div>

                        <span className={`menu-right arrow ${openSubmenus.includes(item.key) ? 'close-it' : 'open-it'}`}></span>
                      </div>

                      {/* Render submenu items if submenu is open */}
                      {openSubmenus.includes(item.key) && (
                        <div className='submenu-items'>
                          {item.children.map((subItem) => (
                            <Link key={subItem.key} to={subItem.path} className={`menu-item ${location.pathname === subItem.path ? 'active' : ''}`} onClick={() => handleItemClick(subItem.key)}>
                              <div className='sidebar-menu-item'>
                                <div className='menu-left'>
                                  <span className={`menu-icon ${subItem.iconClass}`}></span>
                                  <span className='menu-label'>{subItem.label}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link key={item.key} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`} onClick={() => handleItemClick(item.key)}>
                      <div className='sidebar-menu-item'>
                        <div className='menu-left'>
                          <span className={`menu-icon ${item.iconClass}`}></span>
                          <span className='menu-label'>{item.label}</span>
                        </div>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            )}


          </div>
        )
      })}


    </div>
  )
}


