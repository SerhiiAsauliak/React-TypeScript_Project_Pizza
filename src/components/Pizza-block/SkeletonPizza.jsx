import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonPizza = (props) => (
    <ContentLoader 
      speed={2}
      width={280}
      height={455}
      viewBox="0 0 280 455"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="135" cy="125" r="125" /> 
      <rect x="-2" y="265" rx="0" ry="0" width="280" height="24" /> 
      <rect x="0" y="309" rx="15" ry="15" width="280" height="83" /> 
      <rect x="1" y="408" rx="0" ry="0" width="113" height="44" /> 
    <rect x="133" y="408" rx="15" ry="15" width="143" height="44" />
    </ContentLoader>
  )

  