// =========================< IMPORTS: REACT >=================================
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import routesConfig from '@/config/routesConfig'
import { useCommonStore } from '@/hooks/common-context'

// =========================< IMPORTS: PAGES >=================================


// =========================< IMPORTS: COMPONENTS >============================
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'


// =========================< IMPORTS: CSS >===================================
import '@/styles/global.scss'


export default function App() {
  const { sidebarState } = useCommonStore()


  return (
    <Router>
      <div className='App'>

        <div className=''>
          <Header />
        </div>


        <div className={`App-Wrapper ${sidebarState}`}>
          <Sidebar />

          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routesConfig.map(({ path, component }, index) => {
                  const Component = lazy(component)
                  return <Route key={index} path={path} element={<Component />} />
                })}
              </Routes>
          </Suspense>
        </div>

      </div>
    </Router>
  )
}

