import React from "react";
import { Badge } from "antd";
import { qualityTitle } from "../utils/quality";

export function BadgeComponent({ quality }: { quality: string }) {
  const { text, color } = qualityTitle(quality);
  return <Badge style={{ background: color }} count={text} />;
}
