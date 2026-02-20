
import React, { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi2"; // <--- THIS LINE IS CRITICAL
import { CATEGORIES, MOCK_TASKS } from "../data/mockData";

export default function Dashboard() {
  // --- 1. STATE DEFINITIONS ---
  const [tasks, setTasks] = useState(MOCK_TASKS || []);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");

  // --- 2. DERIVED STATE ---
  const hasFilters = !!(selectedCategory || selectedUrgency || search);

  // --- 3. HELPER FUNCTIONS ---
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedUrgency("");
    setSearch("");
  };

  // --- 4. FILTERING LOGIC ---
  useEffect(() => {
    let filtered = [...MOCK_TASKS];

    if (search) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    if (selectedUrgency) {
      filtered = filtered.filter(t => t.urgency === selectedUrgency);
    }

    setTasks(filtered);
  }, [search, selectedCategory, selectedUrgency]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Available Tasks</h1>
        <p className="text-gray-500 text-sm">Find work in your community</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <HiIcons.HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 rounded-xl border flex items-center gap-2 ${
            showFilters ? "bg-blue-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          <HiIcons.HiAdjustmentsHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Filter Tasks</h3>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-red-500 flex items-center gap-1">
                <HiIcons.HiXMark /> Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Categories */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs border ${
                      selectedCategory === cat.id ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-categories */}
            {selectedCategory && (
              <div className="pt-3 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Specific Needs</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.subCategories?.map(sub => (
                    <button 
                      key={sub} 
                      onClick={() => setSearch(sub)}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px]"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                task.urgency === 'EMERGENCY' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {task.urgency}
              </span>
              <span className="font-bold text-green-600">₹{task.budget}</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{task.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{task.description}</p>
            <button className="w-full py-2 bg-gray-900 text-white rounded-xl text-sm font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}