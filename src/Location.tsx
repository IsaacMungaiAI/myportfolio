import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import SectionBg from "./SectionBg";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Fix Leaflet icon issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Button } from "@/components/ui/button"; // ShadCN Button

interface LocationProps {
    theme: "light" | "dark";
};

const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Location = ({ theme }: LocationProps) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState<"idle" | "Refreshing..." | "Refresh successful" | "Error refreshing location">("idle");
    //const [search, setSearch]=useState<"Searching" | "Error">

    // Get user's current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {setPosition([pos.coords.latitude, pos.coords.longitude])},
            (err) => {console.error("Error getting location:", err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } 
            }
        );
    }, []);

    // Function to refresh location
    const refreshLocation = () => {
        setStatus("Refreshing...");
        navigator.geolocation.getCurrentPosition(

            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude])
                setDestination(null); // Reset destination when refreshing
                setStatus("Refresh successful");
                toast.success("Location updated", {
                    description: "Location refreshed successfully!",
                });
            },
            (err) => {
                console.error("Error getting location:", err)
                setStatus("Error refreshing location");
                toast.error("Update failed", {
                    description: "Location failed to update. Please try again!",
                });
            }
        );

    };


    // Function to handle place search
    const searchLocation = async () => {
        if (!searchQuery) return;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
        );
        const data = await response.json();
        console.log("Search API Response:", data); // Debugging: See what data is returned
        if (data.length > 0) {
            setDestination([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            toast.success("Location found!", {
                description: `Showing results for ${searchQuery}`,
            });
        } else {
            toast.error("No results found!", {
                description: "Try a different search query.",
            });
        }
    };

    useEffect(() => {
        //console.log("Destination updated:", destination);
    }, [destination]);



    return (

        <section id="location" className={`relative h-[700px] w-full flex items-center  bg-transparent text-white ${theme === "light" ? "bg-violet-400 text-black" : "bg-black text-white"
            } `}>
            <SectionBg effect="stars" />
            {/* Search Bar */}
            <div className={`absolute top-2 left-1/2 text-black transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-md flex gap-2 
        
                `}>
                <input
                    type="text"
                    placeholder="Search place..."
                    className="border p-2 rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchLocation(); // Invoke search when Enter is pressed
                        }
                    }}
                />
                <Button onClick={searchLocation} 
                
                className={`p-0 bg-transparent hover:bg-transparent focus:ring-0`
                    
                }
                style={{ border: "none", boxShadow: "none", background: "transparent" }}
                >
                    <Search className={`h-5 w-5 text-gray-700 hover:text-black cursor-pointer`
                    } />
                </Button>
            </div>

            {/* Refresh Location Button */}
            <div className="  flex flex-col items-center">
                <Button
                    onClick={refreshLocation}
                    className="absolute bottom-2 left-1/2 border-violet-600 transform -translate-x-1/2 bg-blue-600"
                    disabled={status === "Refreshing..."}
                >

                    {status === "Refreshing..." ? "Refreshing..." : "Refresh Location"}
                </Button>

            </div>
            {/* Map Container */}
            <div className="w-full flex  items-center mt-10">
                {position && (

                    <MapContainer center={position} zoom={13} className="h-[500px] w-[100%]  max-w-3xl mt-16 ml-0 relative z-10">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <RecenterMap position={position} />
                        <Marker position={position} icon={customIcon}>
                            <Popup>You are here</Popup>
                        </Marker>
                        {destination && <Marker position={destination} icon={customIcon} />}
                        {destination && <RoutingComponent start={position} end={destination} />}
                    </MapContainer>

                )}
            </div>
        </section>
    );
};

// Component to handle re-centering the map when location updates
const RecenterMap = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, 13);
        }
    }, [position]);
    return null;
};

// Component to handle routing using OpenRouteService
const RoutingComponent = ({ start, end }: { start: [number, number]; end: [number, number] }) => {
    const map = useMap();
    const apiKey = import.meta.env.VITE_ORS_API_KEY;

    useEffect(() => {
        const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}&radiuses=350,350`;

        fetch(routeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.routes) {
                    const routeCoords = data.routes[0].geometry.coordinates.map(
                        ([lng, lat]: [number, number]) => L.latLng(lat, lng)
                    );

                    // Remove old routes before adding a new one
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });

                    // Add polyline to map
                    const routeLine = L.polyline(routeCoords, {
                        color: "#3388ff",
                        weight: 5,
                    }).addTo(map);

                    // Fit map to route
                    map.fitBounds(routeLine.getBounds());

                    L.marker(start, { title: "Start location" })
                        .addTo(map)
                        .bindPopup("Start");

                    //Add End Marker
                    L.marker(end, { title: "End location" })
                        .addTo(map)
                        .bindPopup("End")
                        .openPopup();// Open popup automatically at the end location

                    //console.log("Route coordinates:", routeCoords);
                }
            })
            .catch(error => {
                console.error("Routing error:", error);
                toast.error("Location search failed!", {
                    description: "Please try again!",
                });
            });
    }, [map, start, end]);

    return null;
};




export default Location;
