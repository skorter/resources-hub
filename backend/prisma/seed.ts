import prisma from "../src/prisma.ts";

const socials = [
  {
    title: "@careersbychris",
    description:
      "Career coaching, resume tips, and job-search advice from Christian Lovell.",
    url: "https://www.instagram.com/careersbychris/",
  },
  {
    title: "@designmotionhq",
    description:
      "UI/UX pattern breakdowns covering design systems, states, and motion.",
    url: "https://www.instagram.com/designmotionhq/",
  },
  {
    title: "@frontendjoe",
    description:
      "Frontend tutorials and code snippets in HTML, CSS, JavaScript, and React.",
    url: "https://www.instagram.com/frontendjoe/",
  },
  {
    title: "@zanderwhitehurst",
    description:
      "UX/UI tutorials, Figma tips, and AI design tools from the founder of Memorisely.",
    url: "https://www.instagram.com/zanderwhitehurst/",
  },
  {
    title: "@junaid_jamel",
    description:
      "Coding tutorials and app build-alongs from a software engineer and co-founder.",
    url: "https://www.instagram.com/junaid_jamel/",
  },
  {
    title: "@setupsai",
    description: "Daily tech and AI tips from creator Tony Chen.",
    url: "https://www.instagram.com/setupsai/",
  },
  {
    title: "@greatfrontend",
    description:
      "Front-end interview preparation trusted by engineers worldwide.",
    url: "https://www.instagram.com/greatfrontend/",
  },
  {
    title: "@startuxdesign",
    description:
      "Quick UX/UI tips and real-world lessons for design beginners.",
    url: "https://www.instagram.com/startuxdesign/",
  },
  {
    title: "@the_codingsloth",
    description: "Casual, practical coding and software videos.",
    url: "https://www.instagram.com/the_codingsloth/",
  },
  {
    title: "@thedesignely",
    description: "UI animations, game UI, and creative interaction design.",
    url: "https://www.instagram.com/thedesignely/",
  },
  {
    title: "@zachex",
    description: "Brand and UX design tutorials from the founder of Hexart.",
    url: "https://www.instagram.com/zachex/",
  },
  {
    title: "@meghanakumthekar_",
    description:
      "Design student sharing UI experiments and everyday designer life.",
    url: "https://www.instagram.com/meghanakumthekar_/",
  },
];

for (const social of socials) {
  await prisma.resource.create({
    data: {
      ...social,
      type: "Social",
      logo: "https://geticon.dev/?url=instagram.com",
    },
  });
}
