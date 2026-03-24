import React from "react";

const AccessDenied = () => {
  return (
    <div className="wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>403 - Access Denied</title>

        {/* Background */}
        <rect x="0" y="0" width="800" height="600" fill="#f8fafc" />

        {/* Circle */}
        <circle cx="400" cy="260" r="160" fill="#fee2e2" />

        {/* Lock body */}
        <rect x="300" y="260" width="200" height="160" rx="20" fill="#ef4444" />

        {/* Lock shackle */}
        <path
          d="M340 260v-40c0-60 120-60 120 0v40"
          fill="none"
          stroke="#991b1b"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Lock hole */}
        <circle cx="400" cy="330" r="14" fill="#1f2933" />
        <rect x="394" y="330" width="12" height="40" fill="#1f2933" />

        {/* Forbidden sign */}
        <circle cx="520" cy="180" r="38" fill="#dc2626" />
        <line
          x1="495"
          y1="155"
          x2="545"
          y2="205"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* ===== TEXT 403 (≈ 150px) ===== */}
        <g transform="translate(400 470) scale(3.125)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="48"
            fontWeight="700"
            fill="#111827"
          >
            403
          </text>
        </g>

        {/* ===== TEXT DESCRIPTION (≈ 30px, GẦN HƠN) ===== */}
        <g transform="translate(400 510) scale(1.36)">
          <text x="0" y="0" textAnchor="middle" fontSize="22" fill="#374151">
            Access Denied – Bạn không có quyền truy cập
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AccessDenied;
