import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1 pt-[73px]">{children}</main>
    <SiteFooter />
  </div>
);

export default PageLayout;
