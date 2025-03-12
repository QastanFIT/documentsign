'use client'

import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRedirect = (to?: string) => {
  const router = useRouter();
  const redirectPath = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = "nl"
    if (redirectPath.startsWith("/" + detectedLng) && router.route === "/404") {
      // prevent endless loop
      router.replace("/" + detectedLng + router.route);
      return;
    }

    router.replace("/" + detectedLng + redirectPath);
  });

  return <></>;
};