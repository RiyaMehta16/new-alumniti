"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import logo from "../../Assets/logo2.jpg"; // Ensure these images are correctly imported
import { useInView } from "framer-motion"; // For visibility detection

export const ParallaxScroll = ({ className }) => {
  // const containerRef = useRef(null);
  const { scrollYProgress } = useScroll(); // Global scroll progress
  const { inView, ref } = useInView({
    triggerOnce: false, // Trigger once when entering the viewport
    threshold: 0.5, // Trigger when 10% of the component is in view
  });

  // Map vertical scroll progress to horizontal movement
  const translateX = useTransform(scrollYProgress, [0.1, 1], ["0%", "-50%"]);

  const cards = [
    {
      id: 1,
      title: "AI-Powered Mentor Matching",
      description:
        "Our platform uses advanced AI algorithms to connect students with alumni who share similar career goals, expertise, and interests, ensuring meaningful mentorship opportunities.",
      illustration: logo,
    },
    {
      id: 2,
      title: "Integrated Communication Tools",
      description:
        "Stay connected with secure messaging and video calling features. Real-time communication between students and alumni helps foster stronger relationships and better guidance.",
      illustration: logo,
    },
    {
      id: 3,
      title: "Customizable Portfolio Creator",
      description:
        "Create and showcase academic and professional achievements with personalized portfolio templates, giving students a digital presence that impresses potential employers.",
      illustration: logo,
    },
    {
      id: 4,
      title: "Job Board & Event Management",
      description:
        "Access exclusive job and internship listings, as well as career events tailored to students. Alumni can also contribute by posting opportunities and events directly on the platform.",
      illustration: logo,
    },
    {
      id: 5,
      title: "Collaboration Hub",
      description:
        "Encourage teamwork and innovation by joining or creating collaborative projects with fellow students and alumni. Share knowledge, solve problems, and build professional relationships.",
      illustration: logo,
    },
    {
      id: 6,
      title: "AI Chatbot Mentor",
      description:
        "Get instant answers to common queries related to career advice, academic challenges, and more. The AI-powered chatbot provides 24/7 assistance to students.",
      illustration: logo,
    },
    {
      id: 7,
      title: "Dedicated Platform for Tier 3 Colleges",
      description:
        "Specially designed to bridge the gap for Tier 3 institutions, offering them a dedicated space for alumni engagement, mentorship, and career development opportunities.",
      illustration: logo,
    },
    {
      id: 8,
      title: "Cloud Infrastructure & Media Management",
      description:
        "Leveraging AWS for cloud infrastructure and Cloudinary for media management, ensuring a seamless and scalable platform experience for all users.",
      illustration: logo,
    },
    {
      id: 9,
      title: "Real-Time Video Interactions",
      description:
        "Powered by Twilio, students and alumni can engage in real-time video calls for mentoring, interviews, and more, making networking and career guidance more accessible.",
      illustration: logo,
    },
    {
      id: 10,
      title: "Sustainable Digital Ecosystem",
      description:
        "Building a sustainable ecosystem for lifelong learning and mentorship that not only helps students but also fosters alumni engagement, creating long-term value for institutions.",
      illustration: logo,
    },
  ];
  return (
    <div
      ref={ref} // Attach the visibility trigger
      className={`relative  mb-20 h-[40rem] w-[90%] text-center mx-auto overflow-y-hidden ${className}`}
    >
      {/* Horizontally moving container */}
      <motion.div
        style={{ x: translateX }}
        className="flex space-x-10 w-[500%] px-10 py-40"
      >
        {cards.map((card) => (
          <div key={card.id} className="w-[30vw]  flex-shrink-0">
            <Card
              title={card.title}
              description={card.description}
              illustration={card.illustration}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
