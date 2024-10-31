/// <reference types="web-bluetooth" />

//@ts-expect-error: : needs React
import React from 'react'
//import MicrobitBle from '../features/MicrobitBle/MicrobitBle'
import Footer from '../components/Footer/Footer'
import About from '../components/About/About'
import { AlertDialogProvider } from '../components/AlertDialog/AlertDialogContext'
import FieldkitBle from '../views/FieldkitBle/FieldkitBle'
import UiFooter from '../components/UiFooter/UiFooter'
//import UiHeader from '../components/UiHeader/UiHeader'

function App() {
  return (
    <>
      <AlertDialogProvider>
        <div>
          {/* <UiHeader className="ui-header" /> */}
          <FieldkitBle/>
          <Footer visible={true}/>
          <About/>
          <UiFooter className="ui-footer" />
        </div>
      </AlertDialogProvider>
    </>
  )
}

export default App
