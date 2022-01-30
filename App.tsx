import { StatusBar } from "expo-status-bar";

import useCachedResources from "./hooks/useCachedResources";

import Navigation from "./navigation";

export default function App() {
  const isLoaded = useCachedResources();

  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
