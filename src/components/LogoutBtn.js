import React from "react";

const LogoutBtn = ({ logout }) => {
  return (
    <button
      onClick={logout}
      className="w-full p-3 text-white bg-[#023E8A] rounded-lg hover:bg-[#0077B6] focus:ring-4 focus:ring-[#90E0EF]"
    >
      Logg ut
    </button>
  );
};

export default LogoutBtn;
