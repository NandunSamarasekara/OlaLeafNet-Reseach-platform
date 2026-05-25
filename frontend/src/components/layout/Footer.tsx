import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-[#333] py-24 px-6 text-white font-serif">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col gap-2">
              <img src="/zosterix.svg" alt="Zosterix" className="h-16 w-auto brightness-0 invert" />
              <span className="text-4xl">Zosterix</span>
            </Link>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-2xl font-bold mb-8">Services</h4>
            <ul className="space-y-4 text-xl opacity-80">
              <li><Link to="/papers" className="hover:opacity-100 transition-opacity">Papers</Link></li>
              <li><Link to="/supervisors" className="hover:opacity-100 transition-opacity">Supervisors</Link></li>
              <li><Link to="/forum" className="hover:opacity-100 transition-opacity">Threads</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-xl opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Facebook</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">X</a></li>
            </ul>
          </div>

          {/* Stay in Touch */}
          <div>
            <h4 className="text-2xl font-bold mb-8">Stay in Touch</h4>
            <ul className="space-y-4 text-xl opacity-80">
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-white/10 text-right opacity-60 text-lg">
          No credit card required · Academic email preferred
        </div>
      </div>
    </footer>
  )
}
