import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between pt-2 pb-4 mb-6 border-b border-gray-800">
      <p className="text-lg font-black">max</p>
      <NavigationItem relativeHref="/" title="Home" />
      <NavigationItem relativeHref="/articles" title="Articles" />
    </nav>
  )
}


function NavigationItem({ title, relativeHref }) {
  return (
    <Link href={relativeHref}>
      <a className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-100">{title}</a>
    </Link>
  )
}