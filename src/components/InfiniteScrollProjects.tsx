"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Project = {
  title: string;
  desc: string;
  img?: string;
};

type Props = {
  projects: Project[];
  repeat?: number;
};

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export default function InfiniteScrollProjects({
  projects,
  repeat = 21,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // Centrage initial
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const center =
      (container.scrollWidth / repeat) * Math.floor(repeat / 2);
    container.scrollLeft = center;
  }, [repeat, projects]);

  // Scroll automatique
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let autoScrollInterval: NodeJS.Timeout;

    autoScrollInterval = setInterval(() => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += 2;
      }
    }, 16);

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [isHovered, isDragging]);

  // Recentre uniquement si on n'est pas en hover ou drag
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isHovered || isDragging) return;
      const maxScroll = container.scrollWidth;
      const visibleWidth = container.offsetWidth;
      const center =
        (maxScroll / repeat) * Math.floor(repeat / 2);
      if (container.scrollLeft < visibleWidth * 2) {
        container.scrollLeft = center;
      } else if (container.scrollLeft > maxScroll - visibleWidth * 2) {
        container.scrollLeft = center;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isHovered, isDragging, repeat, projects]);

  // Drag manuel
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    container.addEventListener("mousedown", onMouseDown);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="p-8">
      <div
        ref={scrollRef}
        className="flex space-x-8 pb-4 pt-4 cursor-grab select-none overflow-visible"
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          userSelect: "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array(repeat)
          .fill(projects)
          .flat()
          .map((project, idx) => (
            <div
              key={idx}
              className="bg-background border border-gray-200 dark:border-neutral-800 shadow-md rounded-2xl min-w-[260px] max-w-[280px] p-0 flex flex-col items-stretch transition-transform duration-200 hover:scale-105 hover:shadow-xl overflow-hidden"
              style={{ height: 320 }}
            >
              {project.img && (
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-[140px] object-cover rounded-t-xl select-none"
                  style={{ display: "block" }}
                  draggable={false}
                />
              )}
              <div className="flex flex-col flex-1 items-center px-6 py-4">
                <h4 className="text-lg font-bold mb-2 text-center text-foreground">{project.title}</h4>
                <p className="mb-2 text-center text-muted-foreground">{project.desc}</p>
                <button
                  className="mt-auto px-4 py-2 bg-gray-900 text-white rounded font-semibold transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none shadow"
                  onClick={() => router.push(`/projet/${slugify(project.title)}`)}
                  tabIndex={0}
                >
                  Lire plus
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}