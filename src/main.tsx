import './index.css'

import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
)
