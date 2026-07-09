"use client";

import { useEffect, useState } from "react";
import { getPublicSettings, type SiteSettings } from "@/actions/site";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getPublicSettings().then(setSettings);
  }, []);

  return settings;
}
