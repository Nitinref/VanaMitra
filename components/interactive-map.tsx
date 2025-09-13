"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Map,
  Download,
  Layers,
  Search,
  Navigation,
  TreePine,
  Droplets,
  FileText,
  ZoomIn,
  ZoomOut,
  Locate,
  Settings,
  Users,
  MapPin,
  Info,
  Filter,
  Home,
  Phone,
  Mail,
} from "lucide-react"

interface InteractiveMapProps {
  isFullscreen?: boolean
}

export function InteractiveMap({ isFullscreen = false }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLayer, setSelectedLayer] = useState("all")
  const [mapStyle, setMapStyle] = useState("satellite")
  const [opacity, setOpacity] = useState([0.9])
  const [searchQuery, setSearchQuery] = useState("")
  const [zoom, setZoom] = useState(6) // Reduced zoom to show all of India
  const [center, setCenter] = useState([20.5937, 78.9629]) // Center of India
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filterBy, setFilterBy] = useState("all")
  const [mapLoaded, setMapLoaded] = useState(false)

  const [showLayers, setShowLayers] = useState({
    tribalLands: true,
    claims: true,
    rivers: true,
    ponds: true,
    forests: true,
  })

  const tribalLandsData = useMemo(
    () => [
      // Andhra Pradesh
      {
        id: 1,
        lat: 15.9129,
        lng: 79.74,
        state: "Andhra Pradesh",
        tribalName: "Chenchu Tribe",
        villageName: "Nallamala Forest Village",
        landOwner: "Ravi Kumar Chenchu",
        area: 12.5,
        landType: "Forest Land",
        status: "Community Forest Rights",
        surveyNumber: "AP-123/A",
        familyMembers: 6,
        traditionalUse: "Honey Collection & NTFP",
        address: "Village Nallamala, District Kurnool, Andhra Pradesh",
        phone: "+91 9876543201",
        email: "ravi.chenchu@tribal.gov.in",
        registrationDate: "2019-03-15",
        claimArea: 12.5,
        approvedArea: 12.5,
      },
      // Assam
      {
        id: 2,
        lat: 26.2006,
        lng: 92.9376,
        state: "Assam",
        tribalName: "Bodo Tribe",
        villageName: "Kokrajhar Village",
        landOwner: "Sunita Bodo",
        area: 18.3,
        landType: "Agricultural",
        status: "Individual Forest Rights",
        surveyNumber: "AS-456/B",
        familyMembers: 8,
        traditionalUse: "Rice Cultivation & Fishing",
        address: "Village Kokrajhar, District Kokrajhar, Assam",
        phone: "+91 9876543202",
        email: "sunita.bodo@tribal.gov.in",
        registrationDate: "2020-07-22",
        claimArea: 18.3,
        approvedArea: 18.3,
      },
      // Bihar
      {
        id: 3,
        lat: 25.0961,
        lng: 85.3131,
        state: "Bihar",
        tribalName: "Santhal Tribe",
        villageName: "Dumka Village",
        landOwner: "Mohan Santhal",
        area: 8.7,
        landType: "Agricultural",
        status: "Community Forest Rights",
        surveyNumber: "BR-789/C",
        familyMembers: 5,
        traditionalUse: "Millet Cultivation",
        address: "Village Dumka, District Jamui, Bihar",
        phone: "+91 9876543203",
        email: "mohan.santhal@tribal.gov.in",
        registrationDate: "2018-11-08",
        claimArea: 8.7,
        approvedArea: 8.7,
      },
      // Chhattisgarh
      {
        id: 4,
        lat: 21.2787,
        lng: 81.8661,
        state: "Chhattisgarh",
        tribalName: "Gond Tribe",
        villageName: "Bastar Village",
        landOwner: "Priya Gond",
        area: 25.1,
        landType: "Forest Land",
        status: "Community Resource Rights",
        surveyNumber: "CG-012/D",
        familyMembers: 12,
        traditionalUse: "Sal Forest Management",
        address: "Village Bastar, District Bastar, Chhattisgarh",
        phone: "+91 9876543204",
        email: "priya.gond@tribal.gov.in",
        registrationDate: "2021-01-30",
        claimArea: 25.1,
        approvedArea: 23.8,
      },
      // Goa
      {
        id: 5,
        lat: 15.2993,
        lng: 74.124,
        state: "Goa",
        tribalName: "Kunbi Tribe",
        villageName: "Canacona Village",
        landOwner: "Amit Kunbi",
        area: 4.2,
        landType: "Coastal Land",
        status: "Individual Forest Rights",
        surveyNumber: "GA-345/E",
        familyMembers: 4,
        traditionalUse: "Coconut Cultivation & Fishing",
        address: "Village Canacona, District South Goa, Goa",
        phone: "+91 9876543205",
        email: "amit.kunbi@tribal.gov.in",
        registrationDate: "2019-09-12",
        claimArea: 4.2,
        approvedArea: 4.2,
      },
      // Gujarat
      {
        id: 6,
        lat: 23.0225,
        lng: 72.5714,
        state: "Gujarat",
        tribalName: "Bhil Tribe",
        villageName: "Dahod Village",
        landOwner: "Lakshmi Bhil",
        area: 15.8,
        landType: "Hilly Land",
        status: "Community Forest Rights",
        surveyNumber: "GJ-678/F",
        familyMembers: 9,
        traditionalUse: "Mahua Collection & Goat Rearing",
        address: "Village Dahod, District Dahod, Gujarat",
        phone: "+91 9876543206",
        email: "lakshmi.bhil@tribal.gov.in",
        registrationDate: "2020-04-18",
        claimArea: 15.8,
        approvedArea: 15.8,
      },
      // Himachal Pradesh
      {
        id: 7,
        lat: 31.1048,
        lng: 77.1734,
        state: "Himachal Pradesh",
        tribalName: "Gaddi Tribe",
        villageName: "Dharamshala Village",
        landOwner: "Rajesh Gaddi",
        area: 22.3,
        landType: "Pastoral Land",
        status: "Community Resource Rights",
        surveyNumber: "HP-901/G",
        familyMembers: 7,
        traditionalUse: "Sheep & Goat Grazing",
        address: "Village Dharamshala, District Kangra, Himachal Pradesh",
        phone: "+91 9876543207",
        email: "rajesh.gaddi@tribal.gov.in",
        registrationDate: "2018-06-25",
        claimArea: 22.3,
        approvedArea: 22.3,
      },
      // Jharkhand
      {
        id: 8,
        lat: 23.6102,
        lng: 85.2799,
        state: "Jharkhand",
        tribalName: "Munda Tribe",
        villageName: "Ranchi Village",
        landOwner: "Sita Munda",
        area: 19.5,
        landType: "Agricultural",
        status: "Individual Forest Rights",
        surveyNumber: "JH-234/H",
        familyMembers: 8,
        traditionalUse: "Paddy Cultivation & Poultry",
        address: "Village Ranchi, District Ranchi, Jharkhand",
        phone: "+91 9876543208",
        email: "sita.munda@tribal.gov.in",
        registrationDate: "2019-12-10",
        claimArea: 19.5,
        approvedArea: 19.5,
      },
      // Karnataka
      {
        id: 9,
        lat: 15.3173,
        lng: 75.7139,
        state: "Karnataka",
        tribalName: "Soliga Tribe",
        villageName: "Chamarajanagar Village",
        landOwner: "Krishna Soliga",
        area: 14.7,
        landType: "Forest Land",
        status: "Community Forest Rights",
        surveyNumber: "KA-567/I",
        familyMembers: 6,
        traditionalUse: "Bamboo Craft & Honey",
        address: "Village Chamarajanagar, District Chamarajanagar, Karnataka",
        phone: "+91 9876543209",
        email: "krishna.soliga@tribal.gov.in",
        registrationDate: "2020-08-14",
        claimArea: 14.7,
        approvedArea: 14.7,
      },
      // Kerala
      {
        id: 10,
        lat: 10.8505,
        lng: 76.2711,
        state: "Kerala",
        tribalName: "Paniya Tribe",
        villageName: "Wayanad Village",
        landOwner: "Meera Paniya",
        area: 6.9,
        landType: "Plantation Land",
        status: "Individual Forest Rights",
        surveyNumber: "KL-890/J",
        familyMembers: 5,
        traditionalUse: "Spice Cultivation & Weaving",
        address: "Village Wayanad, District Wayanad, Kerala",
        phone: "+91 9876543210",
        email: "meera.paniya@tribal.gov.in",
        registrationDate: "2021-03-20",
        claimArea: 6.9,
        approvedArea: 6.9,
      },
      // Madhya Pradesh
      {
        id: 11,
        lat: 23.2599,
        lng: 77.4126,
        state: "Madhya Pradesh",
        tribalName: "Bhil Tribe",
        villageName: "Jhabua Village",
        landOwner: "Ramesh Bhil",
        area: 28.4,
        landType: "Forest Land",
        status: "Community Forest Rights",
        surveyNumber: "MP-123/K",
        familyMembers: 11,
        traditionalUse: "Teak Forest Management",
        address: "Village Jhabua, District Jhabua, Madhya Pradesh",
        phone: "+91 9876543211",
        email: "ramesh.bhil@tribal.gov.in",
        registrationDate: "2018-05-15",
        claimArea: 28.4,
        approvedArea: 28.4,
      },
      // Maharashtra
      {
        id: 12,
        lat: 19.7515,
        lng: 75.7139,
        state: "Maharashtra",
        tribalName: "Warli Tribe",
        villageName: "Thane Village",
        landOwner: "Savita Warli",
        area: 11.2,
        landType: "Hilly Land",
        status: "Community Resource Rights",
        surveyNumber: "MH-456/L",
        familyMembers: 6,
        traditionalUse: "Warli Art & Farming",
        address: "Village Thane, District Thane, Maharashtra",
        phone: "+91 9876543212",
        email: "savita.warli@tribal.gov.in",
        registrationDate: "2020-02-28",
        claimArea: 11.2,
        approvedArea: 11.2,
      },
      // Odisha
      {
        id: 13,
        lat: 20.2961,
        lng: 85.8245,
        state: "Odisha",
        tribalName: "Kondh Tribe",
        villageName: "Koraput Village",
        landOwner: "Ravi Kumar Kondh",
        area: 12.5,
        landType: "Agricultural",
        status: "Community Forest Rights",
        surveyNumber: "OR-789/M",
        familyMembers: 6,
        traditionalUse: "Cultivation & NTFP Collection",
        address: "Village Koraput, Block Laxmipur, District Koraput, Odisha",
        phone: "+91 9876543213",
        email: "ravi.kondh@tribal.gov.in",
        registrationDate: "2019-03-15",
        claimArea: 12.5,
        approvedArea: 12.5,
      },
      // Rajasthan
      {
        id: 14,
        lat: 27.0238,
        lng: 74.2179,
        state: "Rajasthan",
        tribalName: "Meena Tribe",
        villageName: "Udaipur Village",
        landOwner: "Gopal Meena",
        area: 16.8,
        landType: "Desert Land",
        status: "Individual Forest Rights",
        surveyNumber: "RJ-012/N",
        familyMembers: 7,
        traditionalUse: "Camel Rearing & Handicrafts",
        address: "Village Udaipur, District Udaipur, Rajasthan",
        phone: "+91 9876543214",
        email: "gopal.meena@tribal.gov.in",
        registrationDate: "2019-11-05",
        claimArea: 16.8,
        approvedArea: 16.8,
      },
      // Tamil Nadu
      {
        id: 15,
        lat: 11.1271,
        lng: 78.6569,
        state: "Tamil Nadu",
        tribalName: "Toda Tribe",
        villageName: "Nilgiris Village",
        landOwner: "Kamala Toda",
        area: 9.3,
        landType: "Grassland",
        status: "Community Resource Rights",
        surveyNumber: "TN-345/O",
        familyMembers: 4,
        traditionalUse: "Buffalo Rearing & Dairy",
        address: "Village Nilgiris, District Nilgiris, Tamil Nadu",
        phone: "+91 9876543215",
        email: "kamala.toda@tribal.gov.in",
        registrationDate: "2020-09-18",
        claimArea: 9.3,
        approvedArea: 9.3,
      },
      // Telangana
      {
        id: 16,
        lat: 18.1124,
        lng: 79.0193,
        state: "Telangana",
        tribalName: "Lambadi Tribe",
        villageName: "Adilabad Village",
        landOwner: "Venkat Lambadi",
        area: 13.6,
        landType: "Agricultural",
        status: "Community Forest Rights",
        surveyNumber: "TS-678/P",
        familyMembers: 8,
        traditionalUse: "Cotton Cultivation & Embroidery",
        address: "Village Adilabad, District Adilabad, Telangana",
        phone: "+91 9876543216",
        email: "venkat.lambadi@tribal.gov.in",
        registrationDate: "2021-01-12",
        claimArea: 13.6,
        approvedArea: 13.6,
      },
      // Tripura
      {
        id: 17,
        lat: 23.9408,
        lng: 91.9882,
        state: "Tripura",
        tribalName: "Tripuri Tribe",
        villageName: "Agartala Village",
        landOwner: "Biplab Tripuri",
        area: 7.4,
        landType: "Hilly Land",
        status: "Individual Forest Rights",
        surveyNumber: "TR-901/Q",
        familyMembers: 5,
        traditionalUse: "Jhum Cultivation & Bamboo",
        address: "Village Agartala, District West Tripura, Tripura",
        phone: "+91 9876543217",
        email: "biplab.tripuri@tribal.gov.in",
        registrationDate: "2020-06-30",
        claimArea: 7.4,
        approvedArea: 7.4,
      },
      // Uttar Pradesh
      {
        id: 18,
        lat: 26.8467,
        lng: 80.9462,
        state: "Uttar Pradesh",
        tribalName: "Tharu Tribe",
        villageName: "Lakhimpur Village",
        landOwner: "Sushila Tharu",
        area: 10.9,
        landType: "Wetland",
        status: "Community Resource Rights",
        surveyNumber: "UP-234/R",
        familyMembers: 6,
        traditionalUse: "Rice Cultivation & Fish Farming",
        address: "Village Lakhimpur, District Lakhimpur Kheri, Uttar Pradesh",
        phone: "+91 9876543218",
        email: "sushila.tharu@tribal.gov.in",
        registrationDate: "2019-08-22",
        claimArea: 10.9,
        approvedArea: 10.9,
      },
      // Uttarakhand
      {
        id: 19,
        lat: 30.0668,
        lng: 79.0193,
        state: "Uttarakhand",
        tribalName: "Bhotiya Tribe",
        villageName: "Chamoli Village",
        landOwner: "Narayan Bhotiya",
        area: 18.2,
        landType: "Alpine Land",
        status: "Community Forest Rights",
        surveyNumber: "UK-567/S",
        familyMembers: 7,
        traditionalUse: "Yak Rearing & Medicinal Plants",
        address: "Village Chamoli, District Chamoli, Uttarakhand",
        phone: "+91 9876543219",
        email: "narayan.bhotiya@tribal.gov.in",
        registrationDate: "2018-12-15",
        claimArea: 18.2,
        approvedArea: 18.2,
      },
      // West Bengal
      {
        id: 20,
        lat: 22.9868,
        lng: 87.855,
        state: "West Bengal",
        tribalName: "Santhal Tribe",
        villageName: "Purulia Village",
        landOwner: "Ruma Santhal",
        area: 12.1,
        landType: "Agricultural",
        status: "Individual Forest Rights",
        surveyNumber: "WB-890/T",
        familyMembers: 6,
        traditionalUse: "Paddy & Vegetable Cultivation",
        address: "Village Purulia, District Purulia, West Bengal",
        phone: "+91 9876543220",
        email: "ruma.santhal@tribal.gov.in",
        registrationDate: "2020-10-08",
        claimArea: 12.1,
        approvedArea: 12.1,
      },
      // Jammu & Kashmir
      {
        id: 21,
        lat: 34.0837,
        lng: 74.7973,
        state: "Jammu & Kashmir",
        tribalName: "Gujjar Tribe",
        villageName: "Srinagar Village",
        landOwner: "Abdul Gujjar",
        area: 21.7,
        landType: "Pastoral Land",
        status: "Community Resource Rights",
        surveyNumber: "JK-123/U",
        familyMembers: 9,
        traditionalUse: "Nomadic Grazing & Dairy",
        address: "Village Srinagar, District Srinagar, Jammu & Kashmir",
        phone: "+91 9876543221",
        email: "abdul.gujjar@tribal.gov.in",
        registrationDate: "2021-04-25",
        claimArea: 21.7,
        approvedArea: 20.5,
      },
    ],
    [],
  )

  const riversData = useMemo(
    () => [
      {
        id: 1,
        name: "Ganges River",
        coordinates: [
          [30.0, 78.9],
          [28.7, 77.1],
          [25.3, 83.0],
          [22.5, 88.4],
        ],
        type: "major",
        length: 2525,
        tribalSignificance: "Sacred river for multiple tribal communities",
      },
      {
        id: 2,
        name: "Narmada River",
        coordinates: [
          [22.7, 81.3],
          [22.5, 76.8],
          [21.7, 73.0],
        ],
        type: "major",
        length: 1312,
        tribalSignificance: "Lifeline for Bhil and Gond tribes",
      },
      {
        id: 3,
        name: "Godavari River",
        coordinates: [
          [19.9, 73.4],
          [18.7, 79.9],
          [16.3, 81.8],
        ],
        type: "major",
        length: 1465,
        tribalSignificance: "Sacred to Gond and Koya tribes",
      },
      {
        id: 4,
        name: "Krishna River",
        coordinates: [
          [19.1, 73.7],
          [16.5, 76.9],
          [15.8, 80.3],
        ],
        type: "major",
        length: 1400,
        tribalSignificance: "Important for Chenchu and Lambadi tribes",
      },
      {
        id: 5,
        name: "Brahmaputra River",
        coordinates: [
          [28.1, 95.4],
          [26.2, 91.7],
          [25.2, 89.7],
        ],
        type: "major",
        length: 916,
        tribalSignificance: "Central to Bodo and Mishing tribal life",
      },
    ],
    [],
  )

  const pondsData = useMemo(
    () => [
      {
        id: 1,
        lat: 20.25,
        lng: 85.75,
        name: "Kondh Community Pond",
        area: 2.3,
        depth: 8,
        type: "Community Tank",
        tribalUse: "Irrigation & Fishing",
        managedBy: "Kondh Tribe Council",
      },
      {
        id: 2,
        lat: 19.85,
        lng: 85.15,
        name: "Santhal Village Pond",
        area: 1.8,
        depth: 6,
        type: "Village Tank",
        tribalUse: "Domestic & Livestock",
        managedBy: "Santhal Village Committee",
      },
      {
        id: 3,
        lat: 20.45,
        lng: 85.95,
        name: "Gond Sacred Pond",
        area: 3.1,
        depth: 12,
        type: "Sacred Water Body",
        tribalUse: "Religious Ceremonies",
        managedBy: "Gond Traditional Council",
      },
    ],
    [],
  )

  const getTileUrl = useCallback(
    (x: number, y: number, z: number) => {
      switch (mapStyle) {
        case "satellite":
          return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
        case "hybrid":
          return `https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`
        case "terrain":
          return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/${z}/${y}/${x}`
        case "osm":
          return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
        default:
          return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
      }
    },
    [mapStyle],
  )

  const getTilesForView = useCallback(() => {
    const tileSize = 256
    const worldSize = tileSize * Math.pow(2, zoom)
    const pixelOrigin = [worldSize / 2, worldSize / 2]

    const centerPixel = [
      pixelOrigin[0] + center[1] * (worldSize / 360),
      pixelOrigin[1] - Math.log(Math.tan(Math.PI / 4 + (center[0] * Math.PI) / 180 / 2)) * (worldSize / (2 * Math.PI)),
    ]

    const mapWidth = mapRef.current?.clientWidth || 800
    const mapHeight = mapRef.current?.clientHeight || 600

    const tiles = []
    const tilesX = Math.ceil(mapWidth / tileSize) + 2
    const tilesY = Math.ceil(mapHeight / tileSize) + 2

    const startTileX = Math.floor((centerPixel[0] - mapWidth / 2) / tileSize)
    const startTileY = Math.floor((centerPixel[1] - mapHeight / 2) / tileSize)

    for (let x = startTileX; x < startTileX + tilesX; x++) {
      for (let y = startTileY; y < startTileY + tilesY; y++) {
        if (x >= 0 && y >= 0 && x < Math.pow(2, zoom) && y < Math.pow(2, zoom)) {
          tiles.push({
            x,
            y,
            z: zoom,
            left: x * tileSize - (centerPixel[0] - mapWidth / 2),
            top: y * tileSize - (centerPixel[1] - mapHeight / 2),
            url: getTileUrl(x, y, zoom),
          })
        }
      }
    }

    return tiles
  }, [center, zoom, getTileUrl])

  const handleLayerToggle = useCallback((layerName) => {
    setShowLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }, [])

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return

    const searchResults = tribalLandsData.map((land) => ({
      name: land.villageName,
      lat: land.lat,
      lng: land.lng,
      type: `${land.tribalName} - ${land.state}`,
      state: land.state,
    }))

    const result = searchResults.find(
      (place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.state.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (result) {
      setCenter([result.lat, result.lng])
      setZoom(10)
      setSelectedLocation(result)
    }
  }, [searchQuery, tribalLandsData])

  const getStatusColor = useCallback((status) => {
    const colors = {
      "Community Forest Rights": "#22c55e",
      "Individual Forest Rights": "#3b82f6",
      "Community Resource Rights": "#f59e0b",
      Pending: "#eab308",
      Disputed: "#ef4444",
    }
    return colors[status] || "#6b7280"
  }, [])

  const filteredTribalLands = useMemo(() => {
    if (filterBy === "all") return tribalLandsData
    return tribalLandsData.filter(
      (land) =>
        land.status.toLowerCase().includes(filterBy.toLowerCase()) ||
        land.tribalName.toLowerCase().includes(filterBy.toLowerCase()) ||
        land.landType.toLowerCase().includes(filterBy.toLowerCase()) ||
        land.state.toLowerCase().includes(filterBy.toLowerCase()),
    )
  }, [tribalLandsData, filterBy])

  const latLngToPixel = useCallback(
    (lat: number, lng: number) => {
      const mapWidth = mapRef.current?.clientWidth || 800
      const mapHeight = mapRef.current?.clientHeight || 600

      const worldSize = 256 * Math.pow(2, zoom)
      const pixelOrigin = [worldSize / 2, worldSize / 2]

      const centerPixel = [
        pixelOrigin[0] + center[1] * (worldSize / 360),
        pixelOrigin[1] -
          Math.log(Math.tan(Math.PI / 4 + (center[0] * Math.PI) / 180 / 2)) * (worldSize / (2 * Math.PI)),
      ]

      const pointPixel = [
        pixelOrigin[0] + lng * (worldSize / 360),
        pixelOrigin[1] - Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2)) * (worldSize / (2 * Math.PI)),
      ]

      return {
        x: pointPixel[0] - centerPixel[0] + mapWidth / 2,
        y: pointPixel[1] - centerPixel[1] + mapHeight / 2,
      }
    },
    [center, zoom],
  )

  const MapVisualization = () => {
    const tiles = getTilesForView()

    return (
      <div ref={mapRef} className="relative w-full h-full bg-gray-200 overflow-hidden">
        <div className="absolute inset-0">
          {tiles.map((tile, index) => (
            <img
              key={`${tile.x}-${tile.y}-${tile.z}`}
              src={tile.url || "/placeholder.svg"}
              alt=""
              className="absolute transition-opacity duration-300"
              style={{
                left: tile.left,
                top: tile.top,
                width: 256,
                height: 256,
                opacity: opacity[0],
              }}
              onLoad={() => {
                if (index === 0) setMapLoaded(true)
              }}
              onError={(e) => {
                // Fallback to OpenStreetMap if other tiles fail
                const target = e.target as HTMLImageElement
                target.src = `https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`
              }}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading satellite imagery...</p>
            </div>
          </div>
        )}

        {showLayers.rivers &&
          mapLoaded &&
          riversData.map((river) => {
            const startPixel = latLngToPixel(river.coordinates[0][0], river.coordinates[0][1])
            const endPixel = latLngToPixel(
              river.coordinates[river.coordinates.length - 1][0],
              river.coordinates[river.coordinates.length - 1][1],
            )

            const length = Math.sqrt(Math.pow(endPixel.x - startPixel.x, 2) + Math.pow(endPixel.y - startPixel.y, 2))
            const angle = (Math.atan2(endPixel.y - startPixel.y, endPixel.x - startPixel.x) * 180) / Math.PI

            return (
              <div key={river.id} className="absolute pointer-events-none">
                <div
                  className="bg-blue-500 opacity-80 shadow-lg cursor-pointer hover:opacity-100 transition-all duration-300 pointer-events-auto"
                  style={{
                    left: startPixel.x,
                    top: startPixel.y,
                    width: length,
                    height: river.type === "major" ? 6 : 4,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "0 50%",
                  }}
                  title={`${river.name} - ${river.tribalSignificance}`}
                  onClick={() => setSelectedLocation({ ...river, type: "river" })}
                />
                <div
                  className="absolute text-xs font-semibold text-blue-700 bg-white/90 px-2 py-1 rounded shadow-sm pointer-events-none"
                  style={{
                    left: startPixel.x + length / 2,
                    top: startPixel.y - 25,
                    transform: "translateX(-50%)",
                  }}
                >
                  {river.name}
                </div>
              </div>
            )
          })}

        {showLayers.ponds &&
          mapLoaded &&
          pondsData.map((pond) => {
            const pixel = latLngToPixel(pond.lat, pond.lng)
            const size = Math.max(pond.area * 8, 12)

            return (
              <div key={pond.id} className="absolute">
                <div
                  className="bg-cyan-400 rounded-full opacity-90 cursor-pointer hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                  style={{
                    left: pixel.x - size / 2,
                    top: pixel.y - size / 2,
                    width: size,
                    height: size,
                  }}
                  title={`${pond.name} - ${pond.tribalUse}`}
                  onClick={() => setSelectedLocation({ ...pond, type: "pond" })}
                />
                <div
                  className="absolute border-2 border-cyan-300 rounded-full opacity-50 animate-ping"
                  style={{
                    left: pixel.x - (size + 8) / 2,
                    top: pixel.y - (size + 8) / 2,
                    width: size + 8,
                    height: size + 8,
                  }}
                />
              </div>
            )
          })}

        {showLayers.tribalLands &&
          mapLoaded &&
          filteredTribalLands.map((land) => {
            const pixel = latLngToPixel(land.lat, land.lng)

            return (
              <div
                key={land.id}
                className="absolute cursor-pointer group z-10"
                style={{
                  left: pixel.x - 16,
                  top: pixel.y - 32,
                }}
                onClick={() => setSelectedLocation({ ...land, type: "tribal" })}
              >
                <div className="relative">
                  <MapPin
                    className="w-8 h-8 group-hover:w-10 group-hover:h-10 transition-all duration-300 drop-shadow-lg"
                    style={{ color: getStatusColor(land.status) }}
                    fill="currentColor"
                  />
                  <Users className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 text-white" />

                  {/* Village name tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg shadow-xl text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="font-semibold">{land.villageName}</div>
                    <div className="text-xs opacity-90">{land.tribalName}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                  </div>

                  {/* Area circle indicator */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full opacity-30 pointer-events-none"
                    style={{
                      borderColor: getStatusColor(land.status),
                      width: Math.max(land.area * 3, 16),
                      height: Math.max(land.area * 3, 16),
                    }}
                  />
                </div>
              </div>
            )
          })}

        {selectedLocation && selectedLocation.lat && selectedLocation.lng && mapLoaded && (
          <div
            className="absolute animate-pulse z-30"
            style={{
              left: latLngToPixel(selectedLocation.lat, selectedLocation.lng).x - 32,
              top: latLngToPixel(selectedLocation.lat, selectedLocation.lng).y - 32,
            }}
          >
            <div className="w-16 h-16 border-4 border-red-500 rounded-full opacity-80 animate-ping" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" />
          </div>
        )}

        {/* Zoom level and coordinates indicator */}
        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-xs font-mono space-y-1">
          <div>Zoom: {zoom}x</div>
          <div>
            Center: {center[0].toFixed(4)}, {center[1].toFixed(4)}
          </div>
          <div>Style: {mapStyle}</div>
        </div>

        {/* Scale indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">
          Scale: 1:{Math.round(1000000 / zoom)}
        </div>
      </div>
    )
  }

  const containerHeight = isFullscreen ? "h-full" : "h-[600px] md:h-[700px] lg:h-[800px]"

  return (
    <Card className={`shadow-lg border-green-200 ${isFullscreen ? "h-full border-0 rounded-none" : ""}`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Vanamitra - Tribal Land WebGIS</span>
          </CardTitle>

          <div className="flex items-center space-x-2 flex-wrap">
            <div className="flex items-center space-x-1 bg-white border border-green-200 rounded-lg px-3 py-1">
              <Search className="w-4 h-4 text-green-600" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search tribal villages..."
                className="border-0 bg-transparent text-sm w-40 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button onClick={handleSearch} size="sm" variant="ghost" className="px-2">
                <Search className="w-3 h-3" />
              </Button>
            </div>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40 border-green-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lands</SelectItem>
                <SelectItem value="community">Community Rights</SelectItem>
                <SelectItem value="individual">Individual Rights</SelectItem>
                <SelectItem value="andhra pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="assam">Assam</SelectItem>
                <SelectItem value="bihar">Bihar</SelectItem>
                <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="goa">Goa</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="himachal pradesh">Himachal Pradesh</SelectItem>
                <SelectItem value="jharkhand">Jharkhand</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="madhya pradesh">Madhya Pradesh</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                <SelectItem value="tamil nadu">Tamil Nadu</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
                <SelectItem value="tripura">Tripura</SelectItem>
                <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                <SelectItem value="west bengal">West Bengal</SelectItem>
                <SelectItem value="jammu & kashmir">Jammu & Kashmir</SelectItem>
              </SelectContent>
            </Select>

            <Select value={mapStyle} onValueChange={setMapStyle}>
              <SelectTrigger className="w-32 border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
                <SelectItem value="osm">Street</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50 bg-transparent">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className={`relative ${containerHeight} overflow-hidden`}>
          <MapVisualization />

          {/* Layer Controls */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-[1000] max-w-xs border border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <Layers className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Map Layers</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-2 block">
                  Opacity: {Math.round(opacity[0] * 100)}%
                </label>
                <Slider value={opacity} onValueChange={setOpacity} max={1} min={0.3} step={0.1} className="w-full" />
              </div>

              <div className="space-y-2">
                {Object.entries(showLayers).map(([layer, visible]) => (
                  <div key={layer} className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <div className="flex items-center space-x-2">
                        {layer === "tribalLands" && <Users className="w-3 h-3 text-green-600" />}
                        {layer === "claims" && <FileText className="w-3 h-3 text-orange-600" />}
                        {layer === "rivers" && <Navigation className="w-3 h-3 text-blue-600" />}
                        {layer === "ponds" && <Droplets className="w-3 h-3 text-cyan-600" />}
                        {layer === "forests" && <TreePine className="w-3 h-3 text-green-700" />}
                        <span className="capitalize font-medium">{layer.replace(/([A-Z])/g, " $1").trim()}</span>
                      </div>
                    </label>
                    <Switch checked={visible} onCheckedChange={() => handleLayerToggle(layer)} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(Math.min(zoom + 1, 18))}
                className="w-8 h-8 p-0 hover:bg-green-50"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(Math.max(zoom - 1, 7))}
                className="w-8 h-8 p-0 hover:bg-green-50"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCenter([20.5937, 78.9629]) // Updated to center of India
                  setZoom(6) // Updated zoom level for India view
                }}
                className="w-8 h-8 p-0 hover:bg-green-50"
              >
                <Locate className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Statistics Panel */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-[1000] border border-green-200">
            <h4 className="text-sm font-semibold mb-3 flex items-center text-green-800">
              <Settings className="w-4 h-4 mr-2 text-green-600" />
              Atlas Statistics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{filteredTribalLands.length}</div>
                <div className="text-gray-600">Tribal Lands</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{riversData.length}</div>
                <div className="text-gray-600">Sacred Rivers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-600">{pondsData.length}</div>
                <div className="text-gray-600">Community Ponds</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">6</div>
                <div className="text-gray-600">Tribal Groups</div>
              </div>
            </div>
          </div>

          {/* Enhanced Selected Location Details */}
          {selectedLocation && (
            <div className="absolute top-20 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-[1000] max-w-sm border border-green-200 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-green-800 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Location Details
                </h4>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)} className="h-6 w-6 p-0">
                  ×
                </Button>
              </div>

              <div className="space-y-3 text-xs">
                {selectedLocation.type === "tribal" ? (
                  <>
                    <div className="border-b pb-2">
                      <div className="font-semibold text-base text-green-700">{selectedLocation.villageName}</div>
                      <div className="text-sm text-gray-600">{selectedLocation.tribalName}</div>
                      <div className="text-xs text-blue-600 font-medium">{selectedLocation.state}</div>{" "}
                      {/* Added state display */}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span>
                          <strong>Owner:</strong> {selectedLocation.landOwner}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="w-3 h-3 text-gray-500" />
                        <span>
                          <strong>Address:</strong> {selectedLocation.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span>
                          <strong>Phone:</strong> {selectedLocation.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span>
                          <strong>Email:</strong> {selectedLocation.email}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-2 space-y-1">
                      <div>
                        <strong>Area:</strong> {selectedLocation.area} hectares
                      </div>
                      <div>
                        <strong>Type:</strong> {selectedLocation.landType}
                      </div>
                      <div>
                        <strong>Survey No:</strong> {selectedLocation.surveyNumber}
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        <Badge
                          className="ml-1 text-xs"
                          style={{ backgroundColor: getStatusColor(selectedLocation.status) }}
                        >
                          {selectedLocation.status}
                        </Badge>
                      </div>
                      <div>
                        <strong>Family:</strong> {selectedLocation.familyMembers} members
                      </div>
                      <div>
                        <strong>Traditional Use:</strong> {selectedLocation.traditionalUse}
                      </div>
                      <div>
                        <strong>Registration:</strong> {selectedLocation.registrationDate}
                      </div>
                      <div>
                        <strong>Claimed Area:</strong> {selectedLocation.claimArea} ha
                      </div>
                      <div>
                        <strong>Approved Area:</strong> {selectedLocation.approvedArea} ha
                      </div>
                    </div>
                  </>
                ) : selectedLocation.type === "pond" ? (
                  <>
                    <div>
                      <strong>Name:</strong> {selectedLocation.name}
                    </div>
                    <div>
                      <strong>Area:</strong> {selectedLocation.area} hectares
                    </div>
                    <div>
                      <strong>Depth:</strong> {selectedLocation.depth} meters
                    </div>
                    <div>
                      <strong>Type:</strong> {selectedLocation.type}
                    </div>
                    <div>
                      <strong>Tribal Use:</strong> {selectedLocation.tribalUse}
                    </div>
                    <div>
                      <strong>Managed by:</strong> {selectedLocation.managedBy}
                    </div>
                  </>
                ) : selectedLocation.type === "river" ? (
                  <>
                    <div>
                      <strong>Name:</strong> {selectedLocation.name}
                    </div>
                    <div>
                      <strong>Length:</strong> {selectedLocation.length} km
                    </div>
                    <div>
                      <strong>Type:</strong> {selectedLocation.type} river
                    </div>
                    <div>
                      <strong>Tribal Significance:</strong> {selectedLocation.tribalSignificance}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Name:</strong> {selectedLocation.name}
                    </div>
                    <div>
                      <strong>Type:</strong> {selectedLocation.type}
                    </div>
                    <div>
                      <strong>Coordinates:</strong> {selectedLocation.lat?.toFixed(4)},{" "}
                      {selectedLocation.lng?.toFixed(4)}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
