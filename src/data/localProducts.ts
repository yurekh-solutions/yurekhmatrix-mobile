// LOCAL PRODUCTS DATA FOR REACT NATIVE
// This file provides offline/fallback products with proper image references
// Images are loaded using require() for React Native compatibility

export interface LocalProduct {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  image: any; // React Native image require()
  applications?: string[];
  features?: string[];
  specifications?: {
    materialStandard?: string;
    packaging?: string;
    testingCertificate?: string;
    brand?: string[];
    grades?: string[];
    delivery?: string;
    quality?: string;
    availability?: string;
  };
  price?: {
    amount: number;
    currency: string;
    unit: string;
  };
  stock?: {
    available: boolean;
    quantity?: number;
    minimumOrder?: number;
  };
}

// Featured Priority Products (7 products)
export const featuredProducts: LocalProduct[] = [
  {
    id: "featured-1",
    name: "TMT Bars Fe 500D",
    category: "mild-steel",
    description: "High-strength Thermo-Mechanically Treated reinforcement bars conforming to IS 1786 Fe 500D grade. Superior ductility, weldability, and earthquake resistance for modern construction projects.",
    image: require('../../assets/products/tmt-bars-new.jpg'),
    applications: ["High-Rise Buildings", "Bridge Construction", "Industrial Structures", "Seismic Zone Projects"],
    features: ["Fe 500D Grade", "Earthquake Resistant", "Superior Ductility", "Corrosion Resistant"],
    specifications: {
      materialStandard: "IS 1786 Fe 500D",
      packaging: "Bundle / Loose",
      testingCertificate: "Mill Test Certificate Available",
      brand: ["JSW Steel", "Tata Steel", "SAIL", "Jindal Steel", "Kamdhenu"],
      grades: ["Fe 500D", "Fe 550D", "Fe 600"],
      delivery: "Pan India",
      quality: "ISI Certified",
      availability: "In Stock"
    },
    stock: { available: true, quantity: 1000, minimumOrder: 10 }
  },
  {
    id: "featured-2",
    name: "MS Hollow Sections",
    category: "mild-steel",
    description: "Premium mild steel hollow square and rectangular sections for structural applications. Manufactured to IS 4923 standards with uniform wall thickness and precise dimensions.",
    image: require('../../assets/products/ms-hollow-sections.jpg'),
    applications: ["Steel Structures", "Roof Trusses", "Industrial Frames", "Fabrication Works"],
    features: ["Uniform Wall Thickness", "High Strength-to-Weight Ratio", "Easy Fabrication", "Cost Effective"],
    specifications: {
      materialStandard: "IS 4923 / ASTM A500",
      packaging: "Bundle / Crate",
      testingCertificate: "Material Test Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL", "Essar Steel"],
      grades: ["Grade A", "Grade B", "S355"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "featured-3",
    name: "Premium Plywood BWP Grade",
    category: "construction",
    description: "Boiling Water Proof (BWP) grade plywood with superior bonding and moisture resistance. Made from high-quality hardwood veneers for construction and furniture applications.",
    image: require('../../assets/products/plywood-new.jpg'),
    applications: ["Furniture Making", "Interior Paneling", "Construction Formwork", "Kitchen Cabinets"],
    features: ["BWP Grade", "Moisture Resistant", "Termite Treatment", "Smooth Surface"],
    specifications: {
      materialStandard: "IS 303 BWP Grade",
      packaging: "Wooden Pallet / Bundle",
      testingCertificate: "ISI Mark & Quality Certificate",
      brand: ["Century Ply", "Greenply", "Kitply", "National Plywood", "Austin Ply"],
      grades: ["BWP Grade", "BWR Grade", "MR Grade", "Marine Grade"],
      delivery: "Pan India",
      quality: "ISI Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "featured-4",
    name: "Ceramic Floor Tiles",
    category: "construction",
    description: "Premium ceramic floor tiles with anti-slip surface and stain resistance. Available in multiple designs, colors, and finishes for residential and commercial spaces.",
    image: require('../../assets/products/tiles-ceramic.jpg'),
    applications: ["Floor Tiling", "Wall Cladding", "Bathroom Flooring", "Commercial Spaces"],
    features: ["Anti-Slip Surface", "Stain Resistant", "Easy Maintenance", "Durable Finish"],
    specifications: {
      materialStandard: "IS 15622",
      packaging: "Box / Pallet",
      testingCertificate: "Quality Certificate",
      brand: ["Kajaria", "Somany", "Nitco", "Rak Ceramics"],
      grades: ["Glazed", "Unglazed", "Polished"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "featured-5",
    name: "Construction Sand (M-Sand)",
    category: "construction",
    description: "High-quality manufactured sand (M-Sand) conforming to IS 383 standards. Ideal for concrete, plastering, and masonry works with consistent gradation and minimal silt content.",
    image: require('../../assets/products/construction-sand.jpg'),
    applications: ["Concrete Mixing", "Plastering Works", "Brick Masonry", "Block Work"],
    features: ["IS 383 Compliant", "Consistent Quality", "Low Silt Content", "Eco-Friendly"],
    specifications: {
      materialStandard: "IS 383",
      packaging: "Bulk / Bags",
      testingCertificate: "Quality Report",
      brand: ["Local Suppliers", "JSW Sand", "Tata Sand"],
      grades: ["Fine", "Medium", "Coarse"],
      delivery: "Pan India",
      quality: "Standard",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "featured-6",
    name: "Stone Grit (20mm Aggregate)",
    category: "construction",
    description: "Premium quality crushed stone aggregate (20mm) for concrete production. Clean, durable, and conforming to IS 383 standards with uniform grading.",
    image: require('../../assets/products/stone-grit.jpg'),
    applications: ["RCC Works", "Road Construction", "Concrete Production", "Foundation Works"],
    features: ["IS 383 Grade", "Uniform Size", "High Strength", "Clean Material"],
    specifications: {
      materialStandard: "IS 383",
      packaging: "Bulk / Bags",
      testingCertificate: "Quality Report",
      brand: ["Local Quarries", "Premium Aggregates"],
      grades: ["10mm", "20mm", "40mm"],
      delivery: "Pan India",
      quality: "Standard",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "featured-7",
    name: "Clay Bricks (Red Bricks)",
    category: "construction",
    description: "Traditional clay bricks manufactured from high-quality clay with uniform burning. Excellent compressive strength and durability for load-bearing masonry construction.",
    image: require('../../assets/products/clay-bricks.jpg'),
    applications: ["Load Bearing Walls", "Partition Walls", "Boundary Walls", "Foundation Works"],
    features: ["High Compressive Strength", "Uniform Size", "Good Thermal Insulation", "Durable"],
    specifications: {
      materialStandard: "IS 1077",
      packaging: "Bundles / Pallets",
      testingCertificate: "Quality Certificate",
      brand: ["Local Manufacturers", "Premier Bricks"],
      grades: ["First Class", "Second Class", "Third Class"],
      delivery: "Pan India",
      quality: "Standard",
      availability: "In Stock"
    },
    stock: { available: true }
  }
];

// Mild Steel Products (20 products)
export const mildSteelProducts: LocalProduct[] = [
  {
    id: "ms-1",
    name: "MS Round Bars IS 2062",
    category: "mild-steel",
    description: "Premium quality mild steel round bars manufactured to IS 2062 specifications. Perfect for machining, fabrication, and construction applications with excellent weldability and machinability.",
    image: require('../../assets/products/ms-round-bars-new.jpg'),
    applications: ["Precision Machining", "Industrial Fabrication", "Construction Framework", "Automotive Components"],
    features: ["High Tensile Strength", "Uniform Diameter", "Smooth Surface Finish", "Cost Effective"],
    specifications: {
      materialStandard: "IS 2062 / ASTM A36",
      packaging: "Bundle / Loose",
      testingCertificate: "Mill Test Available",
      brand: ["JSW Steel", "Tata Steel", "SAIL", "Jindal Steel", "Essar Steel"],
      grades: ["Grade A", "Grade B", "E250A"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-2",
    name: "MS Plates Grade A",
    category: "mild-steel",
    description: "Heavy-duty mild steel plates conforming to Grade A standards. Ideal for shipbuilding, pressure vessels, and heavy industrial applications with superior strength.",
    image: require('../../assets/products/ms-plates-new.jpg'),
    applications: ["Ship Building", "Pressure Vessels", "Industrial Machinery", "Structural Engineering"],
    features: ["High Load Bearing", "Uniform Thickness", "Easy to Weld", "Corrosion Resistant Coating"],
    specifications: {
      materialStandard: "IS 2062 Grade A / ASTM A36",
      packaging: "Wooden Crate / Bundle",
      testingCertificate: "Mill Test Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL", "Jindal Steel", "Essar Steel"],
      grades: ["Grade A", "Grade B", "Grade C", "S235JR", "S275JR"],
      delivery: "Pan India",
      quality: "ISO 9001 Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-3",
    name: "MS Channels ISMC 100",
    category: "mild-steel",
    description: "Indian Standard Medium Channels manufactured to precise specifications. Widely used in construction and infrastructure projects for structural support.",
    image: require('../../assets/products/ms-channels-new.jpg'),
    applications: ["Building Construction", "Bridge Structures", "Industrial Sheds", "Support Beams"],
    features: ["High Strength-to-Weight Ratio", "Easy Installation", "Durable Finish", "Multiple Sizes Available"],
    specifications: {
      materialStandard: "IS 808",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL", "Jindal Steel"],
      grades: ["ISMC 100", "ISMC 125", "ISMC 150"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-4",
    name: "MS Angles L-Section",
    category: "mild-steel",
    description: "Equal and unequal angle sections for diverse construction needs. Precision-cut with excellent straightness for easy installation.",
    image: require('../../assets/products/ms-angles-new.jpg'),
    applications: ["Roof Trusses", "Support Structures", "Frame Making", "Industrial Racking"],
    features: ["Precise Dimensions", "High Rigidity", "Corrosion Protection", "Easy to Cut & Weld"],
    specifications: {
      materialStandard: "IS 1173",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL", "Jindal Steel"],
      grades: ["Equal Angles", "Unequal Angles"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-5",
    name: "MS I-Beams Wide Flange",
    category: "mild-steel",
    description: "Wide flange I-beams for heavy structural applications. Provides exceptional load-bearing capacity for high-rise buildings and bridges.",
    image: require('../../assets/products/ms-i-beams-new.jpg'),
    applications: ["High-Rise Buildings", "Bridge Construction", "Industrial Plants", "Heavy Machinery Bases"],
    features: ["Superior Load Capacity", "Excellent Bending Resistance", "Long Span Coverage", "Seismic Resistant"],
    specifications: {
      materialStandard: "IS 808",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL", "Jindal Steel"],
      grades: ["ISHB 100", "ISHB 125", "ISHB 150"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-6",
    name: "CR Coils Cold Rolled",
    category: "mild-steel",
    description: "Cold rolled steel coils with premium surface finish. Perfect for applications requiring aesthetic appeal and precision thickness.",
    image: require('../../assets/products/cr-steel-coils-new.jpg'),
    applications: ["Automotive Parts", "Home Appliances", "Metal Furniture", "Precision Components"],
    features: ["Smooth Surface", "Tight Tolerances", "High Tensile Strength", "Paintable Surface"],
    specifications: {
      materialStandard: "IS 1079",
      packaging: "Coil",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["CR 0.5mm", "CR 0.75mm", "CR 1mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-7",
    name: "HR Coils Hot Rolled",
    category: "mild-steel",
    description: "Hot rolled steel coils for general fabrication work. Cost-effective solution for non-critical applications with good formability.",
    image: require('../../assets/products/hr-steel-coils-new.jpg'),
    applications: ["General Fabrication", "Structural Components", "Industrial Equipment", "Agricultural Machinery"],
    features: ["Good Formability", "Cost Effective", "High Strength", "Easy to Weld"],
    specifications: {
      materialStandard: "IS 1079",
      packaging: "Coil",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["HR 1mm", "HR 1.5mm", "HR 2mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-8",
    name: "MS Square Tubes",
    category: "mild-steel",
    description: "Hollow square sections for structural and decorative applications. Available in various wall thicknesses and sizes.",
    image: require('../../assets/products/ms-square-tubes-new.jpg'),
    applications: ["Structural Framework", "Furniture Manufacturing", "Handrails", "Fencing"],
    features: ["Uniform Wall Thickness", "Precision Cut Ends", "Easy to Join", "Aesthetically Pleasing"],
    specifications: {
      materialStandard: "IS 4923",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["20x20mm", "25x25mm", "40x40mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-9",
    name: "MS Rectangular Tubes",
    category: "mild-steel",
    description: "Rectangular hollow sections ideal for construction and industrial applications requiring directional strength.",
    image: require('../../assets/products/ms-rectangular-tubes-new.jpg'),
    applications: ["Building Frames", "Support Columns", "Industrial Equipment", "Automotive Chassis"],
    features: ["High Directional Strength", "Clean Appearance", "Easy Fabrication", "Corrosion Resistant"],
    specifications: {
      materialStandard: "IS 4923",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["30x20mm", "40x20mm", "50x30mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-10",
    name: "MS Pipes ERW Black",
    category: "mild-steel",
    description: "Electric Resistance Welded pipes for structural and plumbing applications. Strong and durable for multiple uses.",
    image: require('../../assets/products/ms-pipes-new.jpg'),
    applications: ["Water Supply", "Gas Distribution", "Structural Framework", "Industrial Piping"],
    features: ["Leak Proof Joints", "High Pressure Rating", "Corrosion Resistant", "Cost Effective"],
    specifications: {
      materialStandard: "IS 1239",
      packaging: "Bundle",
      testingCertificate: "Pressure Test Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["1 inch", "1.5 inch", "2 inch"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-11",
    name: "MS Flat Bars",
    category: "mild-steel",
    description: "Versatile flat steel bars for various fabrication needs. Available in multiple widths and thicknesses.",
    image: require('../../assets/products/ms-flat-bars-new.jpg'),
    applications: ["Brackets & Supports", "Frame Making", "Industrial Fabrication", "Hardware Manufacturing"],
    features: ["Precise Dimensions", "Smooth Edges", "Easy to Machine", "Multiple Sizes"],
    specifications: {
      materialStandard: "IS 2062",
      packaging: "Bundle / Loose",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["25x5mm", "40x5mm", "50x8mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-12",
    name: "MS Gratings Heavy Duty",
    category: "mild-steel",
    description: "Heavy-duty steel gratings for industrial flooring and drainage. Load-bearing and durable.",
    image: require('../../assets/products/ms-gratings-new.jpg'),
    applications: ["Industrial Platforms", "Drainage Covers", "Walkways", "Trenches"],
    features: ["High Load Capacity", "Anti-Slip", "Drainage Friendly", "Long Lasting"],
    specifications: {
      materialStandard: "IS 5822",
      packaging: "Individual",
      testingCertificate: "Quality Certificate",
      brand: ["Tata Steel", "JSW Steel"],
      grades: ["Standard", "Heavy Duty"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-13",
    name: "Wire Rods",
    category: "mild-steel",
    description: "High-quality wire rods for drawing into wires. Used in various manufacturing processes.",
    image: require('../../assets/products/wire-rods-new.jpg'),
    applications: ["Wire Drawing", "Nail Manufacturing", "Fastener Production", "Spring Making"],
    features: ["Uniform Diameter", "Good Ductility", "Clean Surface", "Consistent Quality"],
    specifications: {
      materialStandard: "IS 2030",
      packaging: "Coil",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["5mm", "6mm", "8mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-14",
    name: "Forged Components",
    category: "mild-steel",
    description: "Custom forged steel components for heavy machinery. Superior strength through forging process.",
    image: require('../../assets/products/forged-components-new.jpg'),
    applications: ["Heavy Machinery", "Automotive Parts", "Industrial Equipment", "Construction Equipment"],
    features: ["High Strength", "Grain Refined", "Impact Resistant", "Custom Shapes"],
    specifications: {
      materialStandard: "IS 1875",
      packaging: "Individual",
      testingCertificate: "Certification",
      brand: ["Custom Forges", "JSW Steel", "Tata Steel"],
      grades: ["Medium Carbon", "High Carbon"],
      delivery: "Pan India",
      quality: "Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-15",
    name: "Chequered Plates MS",
    category: "mild-steel",
    description: "Anti-skid chequered plates for flooring and walkways. Provides excellent grip and safety.",
    image: require('../../assets/products/chequered-plates-new.jpg'),
    applications: ["Industrial Flooring", "Walkways", "Staircases", "Vehicle Flooring"],
    features: ["Anti-Skid Surface", "High Durability", "Easy to Clean", "Corrosion Resistant"],
    specifications: {
      materialStandard: "IS 2062",
      packaging: "Bundle",
      testingCertificate: "Mill Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["3mm", "5mm", "6mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "ms-16",
    name: "GP Sheets Galvanized",
    category: "mild-steel",
    description: "Galvanized plain sheets with zinc coating for corrosion protection. Ideal for roofing and cladding.",
    image: require('../../assets/products/galvanized-sheets-new.jpg'),
    applications: ["Roofing", "Wall Cladding", "Duct Work", "Industrial Enclosures"],
    features: ["Zinc Coated", "Weather Resistant", "Long Lasting", "Maintenance Free"],
    specifications: {
      materialStandard: "IS 4769",
      packaging: "Bundle",
      testingCertificate: "Zinc Coating Certificate",
      brand: ["Tata Steel", "JSW Steel", "SAIL"],
      grades: ["0.5mm", "0.75mm", "1mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  }
];

// Stainless Steel Products (15 products)
export const stainlessSteelProducts: LocalProduct[] = [
  {
    id: "ss-1",
    name: "SS 304 Plates Mirror Finish",
    category: "stainless-steel",
    description: "Premium grade SS 304 plates with mirror finish. Highly corrosion resistant for food and pharmaceutical industries.",
    image: require('../../assets/products/ss-mirror-plates-new.jpg'),
    applications: ["Food Processing", "Pharmaceutical Equipment", "Kitchen Equipment", "Decorative Applications"],
    features: ["Corrosion Resistant", "Hygienic Surface", "Easy to Clean", "Aesthetic Appeal"],
    stock: { available: true }
  },
  {
    id: "ss-2",
    name: "SS 316 Pipes Seamless",
    category: "stainless-steel",
    description: "Marine grade SS 316 seamless pipes with superior corrosion resistance. Ideal for chemical and marine applications.",
    image: require('../../assets/products/ss-pipes-new.jpg'),
    applications: ["Chemical Plants", "Marine Equipment", "Oil & Gas", "Pharmaceutical Piping"],
    features: ["Marine Grade", "Chloride Resistant", "High Temperature", "No Welded Seam"],
    stock: { available: true }
  },
  {
    id: "ss-3",
    name: "SS Coils 304 Grade",
    category: "stainless-steel",
    description: "SS 304 coils for fabrication and manufacturing. Excellent formability and weldability.",
    image: require('../../assets/products/ss-coils-new.jpg'),
    applications: ["Kitchen Sinks", "Appliances", "Architectural Features", "Industrial Equipment"],
    features: ["Good Formability", "Weldable", "Polishable", "Corrosion Resistant"],
    stock: { available: true }
  },
  {
    id: "ss-4",
    name: "SS Square Tubes Polished",
    category: "stainless-steel",
    description: "Polished stainless steel square tubes for architectural and decorative applications.",
    image: require('../../assets/products/ss-square-tubes-new.jpg'),
    applications: ["Handrails", "Balustrades", "Furniture", "Decorative Structures"],
    features: ["High Polish Finish", "Aesthetic Appeal", "Corrosion Proof", "Easy Maintenance"],
    stock: { available: true }
  },
  {
    id: "ss-5",
    name: "SS Round Bars 316",
    category: "stainless-steel",
    description: "Marine grade SS 316 round bars for precision machining in harsh environments.",
    image: require('../../assets/products/ss-round-bars-new.jpg'),
    applications: ["Marine Hardware", "Chemical Equipment", "Fasteners", "Valve Components"],
    features: ["Marine Grade", "Precision Ground", "Corrosion Resistant", "High Strength"],
    stock: { available: true }
  },
  {
    id: "ss-6",
    name: "SS Sheets 2B Finish",
    category: "stainless-steel",
    description: "Standard 2B finish stainless steel sheets for general fabrication. Cost-effective with good surface quality.",
    image: require('../../assets/products/ss-sheets-2b-new.jpg'),
    applications: ["General Fabrication", "Industrial Equipment", "Kitchen Equipment", "Architectural Panels"],
    features: ["Standard Finish", "Good Formability", "Weldable", "Cost Effective"],
    stock: { available: true }
  },
  {
    id: "ss-7",
    name: "SS Angles Equal & Unequal",
    category: "stainless-steel",
    description: "Stainless steel angle sections for structural and decorative applications.",
    image: require('../../assets/products/ss-angles-channels-new.jpg'),
    applications: ["Support Structures", "Frame Making", "Architectural Features", "Equipment Stands"],
    features: ["Rust Proof", "High Strength", "Aesthetic Appeal", "Easy Fabrication"],
    stock: { available: true }
  },
  {
    id: "ss-8",
    name: "SS Flat Bars 304",
    category: "stainless-steel",
    description: "Versatile SS 304 flat bars for various fabrication needs. Excellent corrosion resistance.",
    image: require('../../assets/products/ss-flat-bars-new.jpg'),
    applications: ["Hardware Manufacturing", "Brackets", "Support Structures", "Machine Parts"],
    features: ["Corrosion Resistant", "Easy to Machine", "Good Finish", "Weldable"],
    stock: { available: true }
  },
  {
    id: "ss-9",
    name: "SS Perforated Sheets",
    category: "stainless-steel",
    description: "Perforated stainless steel sheets for filtration and decorative applications.",
    image: require('../../assets/products/ss-perforated-mesh-new.jpg'),
    applications: ["Filters", "Architectural Screens", "Ventilation", "Decorative Panels"],
    features: ["Custom Perforation", "Rust Resistant", "Aesthetic Design", "Lightweight"],
    stock: { available: true }
  },
  {
    id: "ss-10",
    name: "SS Fittings 316L",
    category: "stainless-steel",
    description: "Marine grade SS 316L pipe fittings for critical applications.",
    image: require('../../assets/products/ss-fittings-new.jpg'),
    applications: ["Chemical Processing", "Marine Systems", "Food Processing", "Pharmaceutical"],
    features: ["Marine Grade", "Leak Proof", "Easy Installation", "Corrosion Resistant"],
    stock: { available: true }
  }
];

// Construction Materials (15 products)
export const constructionProducts: LocalProduct[] = [
  {
    id: "const-1",
    name: "Portland Cement OPC 53",
    category: "construction",
    description: "High-grade Ordinary Portland Cement 53 grade for superior strength concrete. Ideal for high-rise buildings and infrastructure.",
    image: require('../../assets/products/cement-new.jpg'),
    applications: ["High-Rise Buildings", "Bridges", "Dams", "Infrastructure Projects"],
    features: ["High Strength", "Fast Setting", "Low Heat of Hydration", "Superior Durability"],
    specifications: {
      materialStandard: "IS 12269 OPC 53 Grade",
      packaging: "50 Kg Bags",
      testingCertificate: "BIS Certification",
      brand: ["UltraTech", "ACC", "Ambuja", "Shree Cement", "JK Cement"],
      grades: ["OPC 53", "OPC 43", "PPC"],
      delivery: "Pan India",
      quality: "BIS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-2",
    name: "Portland Pozzolana Cement PPC",
    category: "construction",
    description: "Environment-friendly PPC cement with enhanced durability. Ideal for marine and mass concrete applications.",
    image: require('../../assets/products/ppc-cement-new.jpg'),
    applications: ["Marine Structures", "Mass Concrete", "Dams", "Underground Structures"],
    features: ["Eco-Friendly", "Low Heat Generation", "High Durability", "Sulfate Resistant"],
    specifications: {
      materialStandard: "IS 1489 Part 1 PPC",
      packaging: "50 Kg Paper Bags",
      testingCertificate: "BIS License & Test Reports",
      brand: ["UltraTech", "ACC", "Ambuja", "Shree Cement", "JK Cement", "Dalmia"],
      grades: ["PPC Grade", "Composite Cement", "Slag Cement"],
      delivery: "Pan India Network",
      quality: "BIS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-3",
    name: "20mm Aggregates Crushed Stone",
    category: "construction",
    description: "Premium 20mm crushed stone aggregates for concrete work. High strength and durability.",
    image: require('../../assets/products/aggregates-new.jpg'),
    applications: ["Concrete Mix", "Foundation Work", "Road Construction", "RCC Work"],
    features: ["High Strength", "Angular Shape", "Clean & Washed", "Graded Quality"],
    specifications: {
      materialStandard: "IS 383",
      packaging: "Bulk / Bags",
      testingCertificate: "Quality Report",
      brand: ["Local Quarries", "Premium Aggregates"],
      grades: ["10mm", "20mm", "40mm"],
      delivery: "Pan India",
      quality: "Standard",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-4",
    name: "AAC Blocks Autoclaved",
    category: "construction",
    description: "Eco-friendly Autoclaved Aerated Concrete blocks with excellent thermal insulation.",
    image: require('../../assets/products/aac-blocks-new.jpg'),
    applications: ["Walls", "Partitions", "High-Rise Buildings", "Earthquake Zones"],
    features: ["Lightweight", "Thermal Insulation", "Fire Resistant", "Eco-Friendly"],
    specifications: {
      materialStandard: "IS 2185 Part 1",
      packaging: "Bundle / Pallet",
      testingCertificate: "Quality Certificate",
      brand: ["Hindustan AAC", "Signi AAC", "Aacwells"],
      grades: ["3 inch", "4 inch", "6 inch"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-5",
    name: "Ready Mix Concrete M25 Grade",
    category: "construction",
    description: "Pre-mixed M25 grade concrete for beams, columns, and slabs. Quality assured.",
    image: require('../../assets/products/ready-mix-concrete-new.jpg'),
    applications: ["Beams", "Columns", "Slabs", "Foundation"],
    features: ["Quality Assured", "Consistent Mix", "Timely Delivery", "No Site Mixing"],
    specifications: {
      materialStandard: "IS 456",
      packaging: "Truck",
      testingCertificate: "Quality Certificate",
      brand: ["Local Suppliers", "RMC Companies"],
      grades: ["M15", "M20", "M25"],
      delivery: "Pan India",
      quality: "Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-6",
    name: "Plywood Marine Grade BWP",
    category: "construction",
    description: "Boiling Water Proof marine plywood for exterior applications. Waterproof bonding.",
    image: require('../../assets/products/plywood-marine-new.jpg'),
    applications: ["Exterior Shuttering", "Marine Applications", "Kitchen Cabinets", "Furniture"],
    features: ["Waterproof", "Termite Resistant", "High Strength", "Durable"],
    specifications: {
      materialStandard: "IS 303 BWP Grade",
      packaging: "Wooden Pallet",
      testingCertificate: "ISI Mark",
      brand: ["Century Ply", "Greenply", "Kitply", "National Plywood"],
      grades: ["12mm", "18mm", "25mm"],
      delivery: "Pan India",
      quality: "ISI Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-7",
    name: "Waterproofing Membrane Bitumen",
    category: "construction",
    description: "High-quality bitumen waterproofing membrane for roofs and terraces.",
    image: require('../../assets/products/waterproofing-new.jpg'),
    applications: ["Roof Waterproofing", "Terrace", "Basement", "Underground Structures"],
    features: ["Weather Resistant", "Flexible", "Easy Application", "Long Lasting"],
    specifications: {
      materialStandard: "IS 4889",
      packaging: "Roll",
      testingCertificate: "Quality Certificate",
      brand: ["Fosroc", "Pidilite", "Cico"],
      grades: ["Single Ply", "Double Ply"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-8",
    name: "White Cement Birla",
    category: "construction",
    description: "Premium white cement for finishing and decorative work. Bright white finish.",
    image: require('../../assets/products/white-cement-new.jpg'),
    applications: ["Wall Putty", "Floor Finish", "Decorative Work", "Repair Work"],
    features: ["Bright White", "Smooth Finish", "High Strength", "Quick Setting"],
    specifications: {
      materialStandard: "IS 12600",
      packaging: "25 Kg Bags",
      testingCertificate: "BIS Certification",
      brand: ["Birla", "Ultratech", "Cementco"],
      grades: ["Grade A", "Grade B"],
      delivery: "Pan India",
      quality: "BIS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-9",
    name: "Wall Putty Acrylic Based",
    category: "construction",
    description: "Acrylic-based wall putty for smooth wall finish. Water-resistant.",
    image: require('../../assets/products/wall-putty-new.jpg'),
    applications: ["Interior Walls", "Exterior Walls", "Ceiling", "Surface Preparation"],
    features: ["Smooth Finish", "Water Resistant", "Easy to Apply", "Crack Resistant"],
    specifications: {
      materialStandard: "IS 2645",
      packaging: "20 Kg Bags",
      testingCertificate: "Quality Certificate",
      brand: ["Birla", "JK", "Ultratech"],
      grades: ["Standard", "Premium"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "const-10",
    name: "Tile Adhesive Polymer Modified",
    category: "construction",
    description: "High-bond polymer modified tile adhesive for all types of tiles.",
    image: require('../../assets/products/tile-adhesive-new.jpg'),
    applications: ["Wall Tiling", "Floor Tiling", "Swimming Pools", "Exterior Tiling"],
    features: ["High Bond Strength", "Water Resistant", "Non-Slip", "Easy Application"],
    specifications: {
      materialStandard: "IS 15382",
      packaging: "20 Kg Bags",
      testingCertificate: "Quality Certificate",
      brand: ["Cico", "Fosroc", "Pidilite"],
      grades: ["Standard", "Premium"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  }
];

// Electrical Materials (10 products)
export const electricalProducts: LocalProduct[] = [
  {
    id: "elec-1",
    name: "Polycab FRLS Cables 2.5 sq mm",
    category: "electrical",
    description: "Flame Retardant Low Smoke cables for residential wiring. IS certified.",
    image: require('../../assets/products/polycab-frls-new.jpg'),
    applications: ["House Wiring", "Commercial Buildings", "Offices", "Apartments"],
    features: ["Fire Retardant", "Low Smoke Emission", "IS Certified", "Long Life"],
    specifications: {
      materialStandard: "IS 694 / IEC 60227",
      packaging: "Coil / Drum",
      testingCertificate: "BIS Certification",
      brand: ["Polycab", "Havells", "Finolex", "KEI", "RR Kabel"],
      grades: ["FRLS", "ZHFR", "XLPE"],
      delivery: "Pan India",
      quality: "ISI Marked",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-2",
    name: "Havells House Wire 1.5 sq mm",
    category: "electrical",
    description: "Standard house wiring cable for lighting circuits. Flexible and durable.",
    image: require('../../assets/products/havells-house-wire-new.jpg'),
    applications: ["Lighting Circuits", "Switch Boards", "Residential Wiring", "Small Appliances"],
    features: ["Flexible", "Tinned Copper", "Heat Resistant", "Quality Certified"],
    specifications: {
      materialStandard: "IS 694 / IEC 60227-4",
      packaging: "90m Coil / 180m Coil",
      testingCertificate: "ISI Mark & Test Certificate",
      brand: ["Havells", "Polycab", "Finolex", "KEI", "RR Kabel", "V-Guard"],
      grades: ["1.5 sq mm", "2.5 sq mm", "4 sq mm", "6 sq mm"],
      delivery: "Pan India",
      quality: "ISI Marked",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-3",
    name: "Legrand Modular Switches",
    category: "electrical",
    description: "Premium modular switches with sleek design and long-lasting performance.",
    image: require('../../assets/products/switches-sockets-new.jpg'),
    applications: ["Residential", "Commercial", "Offices", "Hotels"],
    features: ["Sleek Design", "Durable", "Easy Installation", "10 Year Warranty"],
    specifications: {
      materialStandard: "IS 3854 / IEC 60669",
      packaging: "Individual Box / Bulk Pack",
      testingCertificate: "ISI Mark & CE Certification",
      brand: ["Legrand", "Schneider", "Anchor Roma", "Goldmedal", "Havells"],
      grades: ["6A/16A Switch", "20A Switch", "32A Switch", "Bell Push"],
      delivery: "Pan India",
      quality: "ISI & CE Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-4",
    name: "LED Bulbs 9W Cool White",
    category: "electrical",
    description: "Energy-efficient LED bulbs with cool white light. Long-lasting.",
    image: require('../../assets/products/led-bulbs-new.jpg'),
    applications: ["Homes", "Offices", "Shops", "Outdoor"],
    features: ["Energy Efficient", "Long Life", "Bright Light", "Eco-Friendly"],
    specifications: {
      materialStandard: "IEC 60968",
      packaging: "Individual / Pack",
      testingCertificate: "Certification",
      brand: ["Philips", "Havells", "Crompton"],
      grades: ["6W", "9W", "12W"],
      delivery: "Pan India",
      quality: "Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-5",
    name: "LED Tube Lights 4 Feet",
    category: "electrical",
    description: "4-feet LED tube lights for commercial and industrial spaces.",
    image: require('../../assets/products/led-tubes-new.jpg'),
    applications: ["Offices", "Shops", "Factories", "Warehouses"],
    features: ["High Brightness", "Energy Saving", "Flicker Free", "Easy Installation"],
    specifications: {
      materialStandard: "IEC 60968",
      packaging: "Individual / Pack",
      testingCertificate: "Certification",
      brand: ["Philips", "Havells", "Crompton"],
      grades: ["18W", "20W", "24W"],
      delivery: "Pan India",
      quality: "Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-6",
    name: "MCB 32A C Curve Single Pole",
    category: "electrical",
    description: "Miniature Circuit Breaker for overload protection in electrical circuits.",
    image: require('../../assets/products/mcb-breakers-new.jpg'),
    applications: ["Distribution Boards", "Sub Circuits", "Appliance Protection", "Safety"],
    features: ["Trip Indication", "Quick Response", "Reliable", "IS Certified"],
    specifications: {
      materialStandard: "IS 8828 / IEC 60898",
      packaging: "Individual",
      testingCertificate: "Certification",
      brand: ["Schneider", "Legrand", "Havells"],
      grades: ["16A", "32A", "63A"],
      delivery: "Pan India",
      quality: "IS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-7",
    name: "RCCB 40A 30mA 4 Pole",
    category: "electrical",
    description: "Residual Current Circuit Breaker for earth leakage protection.",
    image: require('../../assets/products/rccb-breakers-new.jpg'),
    applications: ["Main Distribution", "Earth Leakage Protection", "Safety", "Wet Areas"],
    features: ["Life Safety", "Sensitive", "Auto Trip", "Reset Button"],
    specifications: {
      materialStandard: "IS 4428 / IEC 61008",
      packaging: "Individual",
      testingCertificate: "Certification",
      brand: ["Schneider", "Legrand", "Havells"],
      grades: ["30mA", "100mA", "300mA"],
      delivery: "Pan India",
      quality: "IS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-8",
    name: "PVC Conduit Pipes 25mm",
    category: "electrical",
    description: "Rigid PVC conduit pipes for electrical wiring protection.",
    image: require('../../assets/products/electrical-conduits-new.jpg'),
    applications: ["Concealed Wiring", "Wall Mounting", "Ceiling Wiring", "Industrial"],
    features: ["Impact Resistant", "Fire Retardant", "Easy to Install", "Economical"],
    specifications: {
      materialStandard: "IS 9537",
      packaging: "Bundle",
      testingCertificate: "Certificate",
      brand: ["Finolex", "Supreme", "Ashirwad"],
      grades: ["20mm", "25mm", "32mm"],
      delivery: "Pan India",
      quality: "ISO Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-9",
    name: "Junction Boxes IP65 Rated",
    category: "electrical",
    description: "Weatherproof junction boxes for outdoor electrical connections.",
    image: require('../../assets/products/junction-boxes-new.jpg'),
    applications: ["Outdoor Wiring", "Gardens", "Swimming Pools", "Industrial Areas"],
    features: ["Waterproof", "Dustproof", "Impact Resistant", "UV Resistant"],
    specifications: {
      materialStandard: "IEC 60529",
      packaging: "Individual",
      testingCertificate: "Certificate",
      brand: ["Finolex", "Legrand", "Havells"],
      grades: ["IP65", "IP67"],
      delivery: "Pan India",
      quality: "Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  },
  {
    id: "elec-10",
    name: "Distribution Board 12 Way",
    category: "electrical",
    description: "12-way metal distribution board for organized circuit distribution.",
    image: require('../../assets/products/distribution-board-new.jpg'),
    applications: ["Residential", "Commercial", "Small Industries", "Offices"],
    features: ["Organized", "Safe Design", "Easy Access", "Metal Enclosure"],
    specifications: {
      materialStandard: "IS 13947",
      packaging: "Individual",
      testingCertificate: "Certificate",
      brand: ["Schneider", "Legrand", "Havells"],
      grades: ["6 Way", "12 Way", "18 Way"],
      delivery: "Pan India",
      quality: "IS Certified",
      availability: "In Stock"
    },
    stock: { available: true }
  }
];

// Combine all products
export const allLocalProducts: LocalProduct[] = [
  ...featuredProducts,
  ...mildSteelProducts,
  ...stainlessSteelProducts,
  ...constructionProducts,
  ...electricalProducts
];

// Category helpers
export const categories = [
  { value: "all", label: "All", icon: "grid", color: "#6366f1" },
  { value: "mild-steel", label: "Mild Steel", icon: "construct", color: "#FF6B35" },
  { value: "stainless-steel", label: "Stainless Steel", icon: "diamond", color: "#4ECDC4" },
  { value: "construction", label: "Construction Materials", icon: "business", color: "#FFB84D" },
  { value: "electrical", label: "Electrical Materials", icon: "flash", color: "#9B59B6" },
];

// Get products by category
export const getProductsByCategory = (category: string): LocalProduct[] => {
  if (category === "all") return allLocalProducts;
  return allLocalProducts.filter(p => p.category === category);
};

// Search products
export const searchProducts = (query: string): LocalProduct[] => {
  const lowerQuery = query.toLowerCase();
  return allLocalProducts.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};

export default allLocalProducts;
