import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Network, Sparkles, Terminal, Code2 } from "lucide-react";
import { skillsData, skillCategories, type SkillCategory, type SkillNode } from "../../data/skills";

export function SkillConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<SkillNode>(skillsData[0]); // Default to C++

  // Filter nodes based on category
  const filteredNodes = skillsData.filter((node) =>
    selectedCategory === "all" ? true : node.category === selectedCategory
  );

  // Determine which nodes and connections are highlighted
  const activeNodeConnections = activeNode ? activeNode.connections : [];
  const hoveredNode = skillsData.find((s) => s.id === hoveredNodeId);
  const highlightedConnectionIds = hoveredNode
    ? [hoveredNode.id, ...hoveredNode.connections]
    : [activeNode.id, ...activeNodeConnections];

  // SVG dimensions for coordinates (-100 to 100 space mapped to 0-800, 0-500)
  const mapCoord = (val: number, maxRange: number) => ((val + 100) / 200) * maxRange;

  return (
    <div className="w-full bg-[#111114] border border-[#26262e] rounded-2xl p-6 md:p-10 text-[#f4f1eb] shadow-xl overflow-hidden">
      {/* Top Header & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#212128]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#00f0ff] mb-2">
            <Network size={15} />
            <span>Interactive Skill Constellation</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Knowledge Graph & Synergies
          </h3>
          <p className="text-xs text-[#888892] mt-1">
            Click or hover nodes to explore inter-dependencies across systems, AI, and graphics.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-full border transition-all ${
              selectedCategory === "all"
                ? "bg-[#00f0ff] text-[#111114] font-medium border-[#00f0ff]"
                : "bg-[#181820] text-[#a0a0aa] border-[#2d2d38] hover:border-[#444455]"
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-[#111114] font-medium border-white"
                  : "bg-[#181820] text-[#a0a0aa] border-[#2d2d38] hover:border-[#444455]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Constellation Canvas + Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* SVG Constellation Network Canvas */}
        <div className="lg:col-span-8 relative bg-[#0b0b0e] border border-[#1e1e26] rounded-xl p-4 md:p-6 flex items-center justify-center min-h-[380px] md:min-h-[440px] overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-h-[460px] select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradDull" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#333340" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22222c" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Network Edges */}
            {skillsData.map((node) => {
              const x1 = mapCoord(node.x, 800);
              const y1 = mapCoord(node.y, 500);

              return node.connections.map((targetId) => {
                const targetNode = skillsData.find((s) => s.id === targetId);
                if (!targetNode) return null;

                const x2 = mapCoord(targetNode.x, 800);
                const y2 = mapCoord(targetNode.y, 500);

                const isEdgeActive =
                  highlightedConnectionIds.includes(node.id) &&
                  highlightedConnectionIds.includes(targetId);

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isEdgeActive ? "url(#lineGradCyan)" : "url(#lineGradDull)"}
                    strokeWidth={isEdgeActive ? 2 : 1}
                    strokeDasharray={isEdgeActive ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                );
              });
            })}

            {/* Render Constellation Nodes */}
            {filteredNodes.map((node) => {
              const cx = mapCoord(node.x, 800);
              const cy = mapCoord(node.y, 500);
              const isSelected = activeNode.id === node.id;
              const isConnected = activeNode.connections.includes(node.id);
              const isHovered = hoveredNodeId === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Outer Pulsing Halo when active */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="18"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      opacity="0.75"
                      className="animate-spin origin-center"
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />
                  )}

                  {/* Core Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : isConnected ? 8 : 6}
                    fill={isSelected ? "#00f0ff" : isConnected ? "#f59e0b" : "#2a2a36"}
                    stroke={isSelected ? "#ffffff" : isConnected ? "#f59e0b" : "#444458"}
                    strokeWidth={isSelected ? 3 : 1.5}
                    filter={isSelected || isConnected ? "url(#glow)" : undefined}
                    className="transition-all duration-200"
                  />

                  {/* Node Text Label */}
                  <text
                    x={cx}
                    y={cy + 20}
                    textAnchor="middle"
                    fill={isSelected ? "#00f0ff" : isConnected ? "#f59e0b" : "#9999a8"}
                    fontSize={isSelected ? 12 : 10}
                    fontFamily="DM Mono, monospace"
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="select-none pointer-events-none transition-all duration-200"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick HUD indicator bottom left */}
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#666675] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>NODES ACTIVE: {filteredNodes.length} / 14</span>
          </div>
        </div>

        {/* Selected Skill Inspector Card */}
        <div className="lg:col-span-4 bg-[#16161d] border border-[#2a2a35] rounded-xl p-6 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#242430]">
              <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase bg-[#00f0ff]/10 text-[#00f0ff] rounded-full border border-[#00f0ff]/20">
                {activeNode.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[#777785]">ID: {activeNode.id}</span>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <Terminal size={20} className="text-[#00f0ff]" />
                  <span>{activeNode.name}</span>
                </h4>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${
                    activeNode.proficiency === "Project Experience"
                      ? "bg-green-500/15 text-green-400 border-green-500/30"
                      : activeNode.proficiency === "Working Knowledge"
                      ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {activeNode.proficiency}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#b5b5c0] leading-relaxed">
                {activeNode.summary}
              </p>
            </div>

            {/* Interconnected Constellation Nodes */}
            <div className="mt-6 pt-4 border-t border-[#242430]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#888898] block mb-2">
                DIRECT CONNECTIONS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.connections.map((connId) => {
                  const connNode = skillsData.find((s) => s.id === connId);
                  if (!connNode) return null;
                  return (
                    <button
                      key={connId}
                      onClick={() => setActiveNode(connNode)}
                      className="px-2.5 py-1 text-xs font-mono bg-[#20202a] hover:bg-[#282836] text-[#e0e0e8] hover:text-[#00f0ff] rounded-md border border-[#303040] transition-colors"
                    >
                      {connNode.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Footer hint */}
          <div className="mt-6 pt-4 border-t border-[#242430] flex items-center justify-between text-xs font-mono text-[#777785]">
            <span className="flex items-center gap-1.5 text-[#00f0ff]">
              <Code2 size={13} />
              <span>Computational Core</span>
            </span>
            <span>No Fake % Bars</span>
          </div>
        </div>
      </div>
    </div>
  );
}
