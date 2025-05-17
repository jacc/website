import PageLayout from "@/components/PageLayout";
import { getTinkeringProjects } from "@/server/tinkering";
import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { group, item } from "@/utilities/constants";
import { useState, useEffect } from "react";

interface Props {
  projects: {
    id: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    link?: string;
    isActive?: boolean;
  }[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectsData = getTinkeringProjects();
  const sortedProjects = projectsData.sort((a, b) => {
    const dateA = parseISO(a.date);
    const dateB = parseISO(b.date);
    return dateB.getTime() - dateA.getTime(); // Sorts in descending order (newest first)
  });
  return {
    props: {
      projects: sortedProjects,
    },
  };
};

export default function Tinkering({ projects }: Props) {
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [highlightedProjectId, setHighlightedProjectId] = useState<
    string | null
  >(null);

  // Filter projects based on the showOnlyActive state
  const filteredProjects = showOnlyActive
    ? projects.filter((p) => p.isActive)
    : projects;

  // Group projects by month using the filtered list
  const groupedProjects = filteredProjects.reduce((acc, project) => {
    const month = format(parseISO(project.date), "MMMM yyyy");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedProjectId(hash); // Set highlight if element found
      } else {
        setHighlightedProjectId(null); // No element for hash, remove highlight
      }
    } else {
      setHighlightedProjectId(null); // No hash, remove highlight
    }
  }, [projects, typeof window !== "undefined" ? window.location.hash : ""]); // Re-run if projects or hash changes

  return (
    <PageLayout>
      <motion.div variants={group}>
        <motion.h1
          variants={item}
          className="text-2xl font-serif font-bold mb-12"
        >
          Tinkering
        </motion.h1>
        <motion.div variants={item} className="mb-8">
          <button
            onClick={() => setShowOnlyActive(!showOnlyActive)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {showOnlyActive ? "Show All Projects" : "Show Active Projects Only"}
          </button>
        </motion.div>
        <div className="relative flex">
          {/* SVG Patterned Vertical Line */}
          <div className="absolute inset-y-0 left-0 w-1.5 pointer-events-none z-0">
            <svg className="h-full w-full" aria-hidden="true">
              <defs>
                <pattern
                  id="timeline-notch-pattern"
                  width="6"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 0H6M0 8H6"
                    className="stroke-gray-300/60"
                    strokeWidth={1}
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#timeline-notch-pattern)"
              />
            </svg>
          </div>
          <div className="flex-1 pl-6">
            {Object.entries(groupedProjects).map(([month, monthProjects]) => (
              <motion.div key={month} variants={item} className="mb-6 relative">
                {/* Month Notch and Label */}
                <motion.div
                  variants={group}
                  className="relative flex items-center mb-4"
                  style={{ minHeight: 40 }}
                >
                  <div
                    className="absolute top-1/2 h-0.5 bg-gray-700 dark:bg-white/75 z-10"
                    style={{ left: "-24px", width: "28px" }}
                  />
                  <motion.span
                    variants={item}
                    className="relative z-20 text-lg font-bold font-serif text-gray-900 dark:text-white/75 px-2 py-1"
                    style={{ marginLeft: "4px" }}
                  >
                    {month}
                  </motion.span>
                </motion.div>
                {/* Projects for the month, indented */}
                <motion.div
                  variants={group}
                  className="flex flex-col gap-5 ml-2.5"
                >
                  {monthProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      id={project.id}
                      variants={item}
                      className="flex-1"
                    >
                      <div
                        className={`
                          border bg-[#FAFAFA] dark:bg-[#191919]
                          border-[#F5F5F5] dark:border-[#2A2A2A]
                          rounded-2xl p-5 min-w-[250px]
                          transition-all duration-300
                          ${
                            highlightedProjectId === project.id
                              ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-[#FAFAFA] dark:ring-offset-[#191919]"
                              : ""
                          }
                        `}
                      >
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-serif font-medium">
                            {project.title}
                          </h3>
                          {project.isActive && (
                            <span className="ml-3 flex h-2 w-2 relative items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs border bg-[#ececec] dark:bg-[#0f0f0f] border-[#e1e1e1] dark:border-[#212121] rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-sm text-blue-600 hover:underline inline-block"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
