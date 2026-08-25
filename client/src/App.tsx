import { SiteChrome } from "@/components/SiteChrome";
import { SeoMeta } from "@/components/SeoMeta";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Switch } from "wouter";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.AboutPage })));
const ConcertsPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.ConcertsPage })));
const ContactPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.ContactPage })));
const MediaPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.MediaPage })));
const MusicPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.MusicPage })));
const ShopPage = lazy(() => import("./pages/SitePages").then(module => ({ default: module.ShopPage })));

function Router() { return <Suspense fallback={<main className="min-h-[100svh] bg-black" aria-busy="true" />}><Switch><Route path="/" component={HomePage} /><Route path="/about" component={AboutPage} /><Route path="/concerts" component={ConcertsPage} /><Route path="/music" component={MusicPage} /><Route path="/media" component={MediaPage} /><Route path="/shop" component={ShopPage} /><Route path="/contact" component={ContactPage} /><Route><HomePage /></Route></Switch></Suspense>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><LocaleProvider><SeoMeta /><SiteChrome><Router /></SiteChrome></LocaleProvider></TooltipProvider></ThemeProvider></ErrorBoundary>; }
