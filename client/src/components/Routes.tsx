import { Switch } from "react-router-dom";

export function Routes({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Switch>{children}</Switch>;
}
