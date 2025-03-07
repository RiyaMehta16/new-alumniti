import React from "react";
import QuestionPage from "./QuestionPage";

function Question() {
  const accordionItems = [
    {
      title: "Who can create a profile?",
      content:
        "Students, alumni, and faculty members are welcome to create a profile.",
    },
    {
      title: "Are the mentors only from our college?",
      content:
        "No, mentors can come from various institutions and industries, bringing diverse expertise.",
    },
    {
      title: "How does the AI feature enhance the platform?",
      content:
        "AI helps by recommending relevant connections, mentors, and resources based on your profile and interests.",
    },

    {
      title: "How do I find a mentor?",
      content:
        "You can search for mentors based on their expertise, industry, or field of study, and send them a request to connect.",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center mt-[100px] text-indigo-100">
        <QuestionPage items={accordionItems} />
      </div>
    </div>
  );
}

export default Question;
