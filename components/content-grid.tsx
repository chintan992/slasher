"use client"

import ContentCard from "./content-card"
import { motion } from "framer-motion"

interface ContentGridProps {
  items: any[]
  type: "movie" | "tv"
}

export default function ContentGrid({ items, type }: ContentGridProps) {
  if (!items.length) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((contentItem) => (
        <motion.div key={contentItem.id} variants={item}>
          <ContentCard item={contentItem} type={contentItem.media_type || type} className="w-full" />
        </motion.div>
      ))}
    </motion.div>
  )
}

