

'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import * as d3 from 'd3';
import { getAllCategories } from '@/lib/dataStore';

// All possible categories (master list)
const allCategories = [
  "Math", "Programming", "Watchmaking", "Drawing", "Woodworking", "Piano", "Health", "Science", "Games", "Miscellaneous"
];

// Predefined link relationships
const links = [
  { source: "Math", target: "Programming" },
  { source: "Math", target: "Science" },
  { source: "Math", target: "Drawing" },

  { source: "Programming", target: "Games" },
  { source: "Programming", target: "Science" },

  { source: "Drawing", target: "Piano" },
  { source: "Drawing", target: "Woodworking" },

  { source: "Piano", target: "Health" },
  { source: "Piano", target: "Watchmaking" },

  { source: "Woodworking", target: "Watchmaking" },

  { source: "Watchmaking", target: "Health" },

  { source: "Science", target: "Health" },

  { source: "Games", target: "Math" },

  { source: "Miscellaneous", target: "Games" },
  { source: "Miscellaneous", target: "Watchmaking" },
  { source: "Miscellaneous", target: "Drawing" }
];

export function InterestGraph() {
  const svgRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Get visited categories
    const visited = new Set(getAllCategories());

    // Create nodes with visited status
    const nodes = allCategories.map(cat => ({
      id: cat,
      visited: visited.has(cat)
    }));

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', 600)
      .attr('viewBox', '0 0 800 500');

    svg.selectAll('*').remove(); // Clear previous graph

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(130))
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(400, 250));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    node.append("circle")
      .attr("r", 15)
      .attr("fill", d => d.visited ? "#ff4d4f" : "#a6c8ff")
      .attr("stroke", "#5a6b7c")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        window.location.href = `/category/${encodeURIComponent(d.id)}`;
      });

    node.append("text")
      .attr("dx", 28)
      .attr("dy", 5)
      .text(d => d.id)
      .style("font-size", "14px")
      .style("fill", "#333");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
