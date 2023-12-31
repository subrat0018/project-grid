import React from "react";

export const ProductItemDescription = ({ item }) => {
  // console.log(item);
  return (
    <div className="space-y-3">
      {[item.description].map((desc, index) => {
        return (
          <p
            key={index}
            className="font-urbanist text-sm text-secondary md:text-base lg:text-lg"
          >
            <span className="mr-1 font-semibold">{desc}</span>
          </p>
        );
      })}
    </div>
  );
};
