"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-md overflow-hidden">
        {/* Image Container avec bordure décorative */}
        <div className="relative p-3 pb-0">
          {/* Bordure colorée animée */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6] via-[#26A69A] to-[#F9A825] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

          {/* Image wrapper */}
          <div className="relative bg-white rounded-md overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay gradient au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0077B6] via-[#0077B6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Social icons - apparaissent au hover au centre */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center text-[#0077B6] hover:bg-[#F9A825] hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center text-[#0077B6] hover:bg-[#26A69A] hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info section avec fond et design */}
        <div className="relative pt-4 pb-5 px-4 text-center">
          {/* Ligne décorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0077B6] rounded-full transform -translate-y-1/2" />

          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            {member.name}
          </h3>
          <p className="text-sm text-[#0077B6] font-medium">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
