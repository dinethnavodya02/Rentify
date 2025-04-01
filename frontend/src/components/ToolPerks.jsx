import React from "react";

const ToolPerks = ({ selected, onChange }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    let updatedSelection;
    if (checked) {
      updatedSelection = [...selected, value];
    } else {
      updatedSelection = selected.filter(
        (selectedName) => selectedName !== value
      );
    }

    onChange(updatedSelection);

    console.log(updatedSelection);
  };

  const perksList = [
    "Self-Sharpening Blades",
    "Ergonomic Handles",
    "Battery-Powered",
    "Noise Reduction",
    "Adjustable Height",
    "Automatic Shutoff",
    "Weather-Resistant",
    "Low Fuel Consumption",
    "Quick Start Mechanism",
    "Multi-Speed Settings",
  ];

  return (
    <div>
      <h3 className="text-[#16423C] font-medium mb-2">Tool Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {perksList.map((perk) => (
          <div key={perk} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={perk}
              onChange={handleCheckboxChange}
              checked={selected.includes(perk)} // Show the correct checked status
              className="mr-2"
            />
            <label className="text-[#16423C]">{perk}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolPerks;
