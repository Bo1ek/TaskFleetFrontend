import React, { useState } from "react";

interface AutocompleteInputProps {
  label: string;
  placeholder: string;
  onPlaceSelected: (lat: number, lng: number) => void;
}

const NominatimAutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  placeholder,
  onPlaceSelected,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div style={{ marginBottom: "10px", position: "relative" }}>
      <label>{label}: </label>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "200px", padding: "5px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "10px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            zIndex: 1000,
            width: "200px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                const lat = parseFloat(suggestion.lat);
                const lng = parseFloat(suggestion.lon);
                onPlaceSelected(lat, lng);
                setQuery(suggestion.display_name); 
                setSuggestions([]); 
              }}
              style={{
                padding: "5px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NominatimAutocompleteInput;
