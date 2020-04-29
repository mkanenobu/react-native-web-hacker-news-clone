import { createContext, ReactElement } from "react";

export const ContainerContext = createContext<{
  setCurrentView: (view: ReactElement | null) => void;
}>({
  setCurrentView: () => {},
});
