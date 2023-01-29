import React from "react";

type Props = {};

const AnnouncementBar = (props: Props) => {
  return (
    <div className="flex h-10 w-full items-center justify-between bg-dark">
      <p className="text-white font-secondary-secular ml-4">Announcemnet Bar</p>
      <button className="text-white font-secondary-secular px-3 h-full border-l-2 border-gray-800 bg-gray-700 hover:bg-red-700">X</button>
    </div>
  );
};

export default AnnouncementBar;
