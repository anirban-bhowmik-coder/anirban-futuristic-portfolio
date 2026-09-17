import { motion } from "motion/react";
import { Trophy, Award, ShieldCheck, Target, ArrowUpRight } from "lucide-react";
import { achievements } from "../../data/achievements";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#d8ff42] text-[#111114]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#111114]/20">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#111114] uppercase block mb-3 font-semibold">
              06 / COMPETITIONS & RECOGNITION
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.85]">
              BUILD.<br />
              <em className="font-serif italic font-normal text-[#111114]/80">COMPETE.</em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base text-[#111114]/90 font-medium leading-relaxed">
              Demonstrating computational grit under pressure. Nationally evaluated cybersecurity engineering
              and high academic benchmark standing.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111114] text-[#f4f1eb] rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#22222c]">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-[#d8ff42]" />
                    <span className="text-xs font-mono tracking-wider uppercase text-[#d8ff42] font-bold">
                      {item.milestone}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#888894]">{item.year}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-6">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#888898] uppercase tracking-wider mt-1">
                  {item.organization}
                </p>

                <p className="text-sm md:text-base text-[#b0b0b8] leading-relaxed mt-4">
                  {item.description}
                </p>

                <div className="mt-6 bg-[#181822] p-4 rounded-xl border border-[#262634]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d8ff42] block mb-1">
                    ENGINEERING OUTCOME:
                  </span>
                  <p className="text-xs text-[#c0c0ca] leading-relaxed">
                    {item.impact}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#22222c] flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-mono bg-[#20202c] text-[#d8ff42] rounded-full border border-[#303040]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
