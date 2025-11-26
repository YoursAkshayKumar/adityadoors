"use client";

// import { Image } from "antd";
import { useScrollAnimation } from "./hooks/use-scroll-animation";

const projects = [
  {
    id: 1,
    number: "01",
    name: "City Business Center",
    image:
      "http://windazo.like-themes.com/wp-content/uploads/2018/02/wood_gallery_01-380x550.jpg",
    description: "Premium wooden shutters for a Mediterranean-style villa.",
  },
  {
    id: 2,
    number: "02",
    name: "Fitness Club",
    image:
      "http://windazo.like-themes.com/wp-content/uploads/2018/02/wood_gallery_02-388x550.jpg",
    description: "Commercial-grade roller blinds for a modern office complex.",
  },
  {
    id: 3,
    number: "03",
    name: "Private Cottage",
    image:
      "	http://windazo.like-themes.com/wp-content/uploads/2018/02/wood_gallery_03-388x550.jpg",
    description: "Classic plantation shutters for a traditional country home.",
  },
  {
    id: 4,
    number: "04",
    name: "Hotel Reception",
    image:
      "	http://windazo.like-themes.com/wp-content/uploads/2018/02/wood_gallery_04-389x550.jpg",
    description: "Custom vertical blinds for a contemporary urban apartment.",
  },
];

export default function ProjectsSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 "
      style={{
        background: "linear-gradient(to bottom, #c8a45c 70%, white 30%)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="text-white text-sm font-medium mb-2">
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c2a21] mb-4">
            Where Quality Meets Vision
          </h2>
          <p className="text-[#3c2a21] max-w-3xl mx-auto">
           See the Transformation: Inspiring Spaces Created by Aditya Doors. Our finished projects showcase the precision and elegance we bring to homes and commercial spaces nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* {project.image} */}
                  {/* <Image alt="product" src={project.image} /> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-gold px-2 py-1 text-xs text-white mb-2">
                    {project.name}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {project.number}
                  </h3>
                  <p className="text-gray-200 text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
