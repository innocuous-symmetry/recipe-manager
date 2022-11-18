import { Page, Panel } from './components/ui';
import './sass/App.scss'

function App() {

  return (
    <Page extraStyles='App'>
      <Panel>
        <h1>RECIPE MANAGER</h1>
        <h2>Simple Recipe Management and Sharing for the Home</h2>
        <p>Keep all your most-used recipes handy in your own personal collection.</p>
      </Panel>

      <Panel>
        <h2>Share Your Recipe Collection</h2>
        <p>Share your personal collection with your friends and family, and subscribe to their collections.</p>
      </Panel>

      <Panel>
        <h2>Build Shopping Lists Directly from Your Recipes</h2>
        <p>Lay out your meal plan for the week, and let Recipin automatically generate your grocery list, ingredient by ingredient.</p>
      </Panel>
    </Page>
  )
}

export default App
