"use client";

import React from "react";
import ServiceCarousel3D from "./ServiceCarousel3D";

/**
 * ServicesShowcaseWith3D
 * Pure unboxed 3D service carousel without surrounding box/header.
 */
export default function ServicesShowcaseWith3D() {
  return (
    <div className="relative w-full overflow-visible">
      <ServiceCarousel3D showHeader={false} />
    </div>
  );
}
