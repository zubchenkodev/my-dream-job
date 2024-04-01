import NavLinks from "./NavLinks"

const Bottombar = () => {
  return (
    <section className="z-50  w-full fixed bottom-0 p-4 lg:hidden bg-fontDark">
      <NavLinks bottombar/>
    </section>
  )
}

export default Bottombar