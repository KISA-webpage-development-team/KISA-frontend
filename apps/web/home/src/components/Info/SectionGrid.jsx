import React from "react";
import SectionImage from "../Info/SectionImage";
import Link from "next/link";

export default function SectionGrid({ infoType, sectionName, contentList }) {
  const sectionLink = `/info/${infoType}/detail/${sectionName}`;
  const third = Math.floor(contentList.length / 3);
  const second = Math.floor(contentList.length / 2);

  return (
    <>
      <div className="hidden md:flex grid_wrapper">
        {third > 0 && (
          <div className="grid_container">
            {contentList.slice(0, third * 3).map(({ name, id }, index) => (
              <SectionImage
                key={id}
                sectionLink={sectionLink}
                name={name}
                id={id}
              />
            ))}
          </div>
        )}

        <div
          className={`${
            contentList.length % 3 === 1
              ? "grid_auto_container_one"
              : "grid_auto_container_two"
          } `}
        >
          {contentList.slice(third * 3).map(({ name, id }, index) => (
            <SectionImage
              key={id}
              sectionLink={sectionLink}
              name={name}
              id={id}
            />
          ))}
        </div>
      </div>
      <div className="flex md:hidden grid_wrapper">
        {second > 0 && (
          <div className="grid_container_mobile">
            {contentList.slice(0, second * 2).map(({ name, id }, index) => (
              <SectionImage
                key={id}
                sectionLink={sectionLink}
                name={name}
                id={id}
              />
            ))}
          </div>
        )}

        <div className={`grid_auto_container_mobile`}>
          {contentList.slice(second * 2).map(({ name, id }, index) => (
            <SectionImage
              key={id}
              sectionLink={sectionLink}
              name={name}
              id={id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
