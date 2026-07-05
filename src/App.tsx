import './App.css'
import BundleAccordion from './features/bundle/BundleAccordion'


function App() {
  return (
    <main className="Page">
      <header className="PageHeader container">
        <h1 className="PageHeader-title">Let's get started!</h1>
      </header>

      <section className="PageSteps" aria-label="Bundle steps">
        <BundleAccordion />
      </section>


      <section className="PageReview">
        <div className="PageReview-inner container">
          {/* review card content — later step */}
        </div>
      </section>
    </main>
  )
}

export default App
