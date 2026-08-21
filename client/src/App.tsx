import { SiteChrome } from "@/components/SiteChrome";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Switch } from "wouter";
import { AboutPage, ConcertsPage, ContactPage, HomePage, MediaPage, MusicPage, ShopPage } from "./pages/SitePages";

function Router() { return <Switch><Route path="/" component={HomePage} /><Route path="/about" component={AboutPage} /><Route path="/concerts" component={ConcertsPage} /><Route path="/music" component={MusicPage} /><Route path="/media" component={MediaPage} /><Route path="/shop" component={ShopPage} /><Route path="/contact" component={ContactPage} /><Route><HomePage /></Route></Switch>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><LocaleProvider><SiteChrome><Router /></SiteChrome></LocaleProvider></TooltipProvider></ThemeProvider></ErrorBoundary>; }
