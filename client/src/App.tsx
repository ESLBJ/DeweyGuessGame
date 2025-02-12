import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import Game from "./pages/game";
import NotFound from "./pages/not-found";
import { FaTwitter } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Game} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ddc-theme">
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;