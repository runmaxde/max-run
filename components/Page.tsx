import Navigation from "./Navigation";

export default function Page({ children }) {
  return (
    <div className="max-w-xl p-3 m-auto">
      <Navigation />
      {children}
    </div>
  )
}