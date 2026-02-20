// data/mockData.js
export const CATEGORIES = [
  {
    id: "plumbing",
    label: "Plumber",
    icon: "🔧",
    // Changed 'types' to 'subCategories' to match Dashboard logic
    subCategories: ["Tap Leakage", "Pipe Leakage", "Toilet Blockage", "Geyser Install"],
    checklist: ["2-3+ Years Exp", "Check License", "Ask for Warranty", "Verify Visiting Charges"],
    placeholder: "Mention: Problem type, if tools are provided, and urgency."
  },
  {
    id: "electrical",
    label: "Electrician",
    icon: "⚡",
    subCategories: ["Wiring", "MCB/Fuse Repair", "Fan/AC Install", "Socket Repair"],
    checklist: ["ITI/Diploma Certified", "Safety Gear usage", "Work Warranty", "Original Spare Parts"],
    placeholder: "Mention: Type of electrical fault and if it's an emergency."
  },
  // ADDED MISSING CATEGORIES USED IN MOCK_TASKS
  {
    id: "medical",
    label: "Medical Help",
    icon: "🏥",
    subCategories: ["Medicine Pickup", "Elderly Care", "First Aid"],
    checklist: ["Verify IDs", "Clear Instructions", "Urgent Response"],
    placeholder: "Mention medicines required or patient condition."
  },
  {
    id: "cleaning",
    label: "Cleaning",
    icon: "🧹",
    subCategories: ["Deep Cleaning", "Bathroom", "Kitchen", "Sofa Cleaning"],
    checklist: ["Check for Tools", "Verify Ratings", "Punctuality"],
    placeholder: "Mention number of rooms and specific areas."
  },
  {
    id: "shifting",
    label: "Shifting",
    icon: "🚛",
    subCategories: ["Furniture Moving", "House Shifting", "Packing"],
    checklist: ["Manpower needed", "Vehicle size", "Floor number"],
    placeholder: "Mention floor number and list of heavy items."
  },
  {
    id: "tech",
    label: "Tech Repair",
    icon: "💻",
    subCategories: ["Laptop Repair", "Mobile Repair", "Software Install"],
    checklist: ["Original Parts", "Experience", "Data Privacy"],
    placeholder: "Mention Brand and Model of the device."
  },
  {
    id: "teaching",
    label: "Tutor",
    icon: "📚",
    subCategories: ["School (K-10)", "Competitive (JEE/NEET)", "Coding (C++/DSA)", "Engineering"],
    checklist: ["Demo Class", "Subject Expertise", "Weekly Tests", "Mode (Online/Offline)"],
    placeholder: "Mention: Subject, Class/Year, and specific topics."
  },
  {
    id: "gardening",
    label: "Gardening",
    icon: "🌱",
    subCategories: ["Lawn Mowing", "Trimming", "Planting", "Pest Control"],
    checklist: ["Tools status", "Plant knowledge", "Experience"],
    placeholder: "Mention garden size and specific work needed."
  }
];

// Add this below your CATEGORIES array in mockData.js

export const MOCK_USERS = [
  {
    id: "u1",
    name: "Parth Patil",
    phone: "9876543210",
    password: "password123", // AuthContext looks for this to validate login
    role: "worker",
    skills: ["Plumbing", "Electrical"],
    rating: 4.8,
    tasksCompleted: 12,
    tasksPosted: 2,
    location: "Sangli",
    avatar: "https://ui-avatars.com/api/?name=Parth+Patil",
    createdAt: "2025-10-20T10:00:00Z",
  },
  {
    id: "u2",
    name: "John Doe",
    phone: "1234567890",
    password: "password123",
    role: "client",
    skills: [],
    rating: 4.5,
    tasksCompleted: 0,
    tasksPosted: 5,
    location: "Pune",
    avatar: null,
    createdAt: "2025-11-01T08:30:00Z",
  }
];

// If you have tasks, export them too so they don't cause errors later
export const MOCK_TASKS = [];

// ... MOCK_USERS and MOCK_TASKS remain the same but ensure 
// all 'category' strings match the 'id' fields above.