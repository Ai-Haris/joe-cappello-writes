import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Joe Cappello</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Author & Word Searcher<br />
            Galisteo, New Mexico
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Bio", path: "/bio" },
              { label: "Blog", path: "/blog" },
              { label: "Events", path: "/events" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">Member of</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>SouthWest Writers</li>
            <li>New Mexico Press Women</li>
            <li>New Mexico Writers</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
        <span>© {new Date().getFullYear()} Joe Cappello. All rights reserved.</span>
        <Link to="/admin/login" className="hover:text-primary opacity-50 transition-opacity">
          Admin Access
        </Link>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
