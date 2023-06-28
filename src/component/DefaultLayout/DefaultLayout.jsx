import './DefaultLayout.css'

const DefaultLayout = ({children}) => {
  return (
    <>
      <div className="default-layout-container container grid-lg">
        <header className="navbar bg-primary" style={{padding: '.5em'}}>
          <section className="navbar-center">
            <span className="h5">Sodality Web SMS</span>
          </section>
        </header>
      </div>
      <div className="default-layout-container container grid-lg text-left" style={{marginTop: '1em'}}>
        {children}
      </div>
    </>
  )
}

export default DefaultLayout