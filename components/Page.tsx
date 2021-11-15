import Navigation from "./Navigation";

export default function Page({ children }) {
  return (
    <div className="max-w-2xl p-3 m-auto">
      <Navigation />
      {children}
    </div>
  )
}