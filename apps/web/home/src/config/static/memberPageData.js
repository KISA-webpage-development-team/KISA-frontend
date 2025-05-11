// president, operations, public_relations are destructured from members object

const members_2024 = {
  // Presidents
  presidents: [
    {
      name: "Jaemin Jeon",
      major: "Computer Science",
      year: "2025",
      role: ["President"],
    },
    {
      name: "Jin Wook Shin",
      major: "Computer Engineering",
      year: "2026",
      role: ["Vice President - OP"],
    },
    {
      name: "Seoyeon Han",
      major: "Computer Science",
      year: "2025",
      role: ["Vice President - PR"],
    },
  ],
  //   OP team
  operations: [
    {
      name: "Jihyun Park",
      major: "Economics",
      year: "2025",
      role: ["Finance"],
    },
    {
      name: "Jisang Um",
      major: "IOE",
      year: "2026",
      role: ["Operational Support"],
    },
    // Event Planning
    {
      name: "Yoon Sung Ji",
      major: "Computer Science",
      year: "2025",
      role: ["Event Planning"],
    },
    {
      name: "Yoonseo Shin",
      major: "Computer Science",
      year: "2026",
      role: ["Web Development", "Event Planning"],
    },
    {
      name: "Sophia Chang",
      major: "Robotics",
      year: "2027",
      role: ["Event Planning"],
    },
    {
      name: "Jessica Moon",
      major: "Undecided",
      year: "2027",
      role: ["Event Planning"],
    },
    {
      name: "Haeun Lee",
      major: "BHS",
      year: "2028",
      role: ["Event Planning"],
    },
    {
      name: "Junhee Han",
      major: "Undecided",
      year: "2028",
      role: ["Event Planning"],
    },
    // Web Development
    {
      isLead: true,
      name: "Dongsub Kim",
      major: "Computer Science",
      year: "2023",
      role: ["Web Development Lead"],
    },
    {
      name: "Jioh In",
      major: "Computer Science",
      year: "2028",
      role: ["Web Development"],
    },
    {
      name: "Hannah Lee",
      major: "Data Science",
      year: "2027",
      role: ["Web Development"],
    },
    {
      name: "Yunseong Na",
      major: "Computer Science",
      year: "2026",
      role: ["Web Development"],
    },
    // Outreach
    {
      isLead: true,
      name: "Seungmin Shin",
      major: "Statistics",
      year: "2025",
      role: ["Outreach Lead"],
    },
    {
      name: "Wookwan Kwon",
      major: "Computer Science",
      year: "2024",
      role: ["Outreach"],
    },
    {
      name: "Junho Lee",
      major: "Education",
      year: "2028",
      role: ["Outreach"],
    },
    {
      name: "Dongeun Kim",
      major: "Data Science",
      year: "2028",
      role: ["Web Development", "Outreach"],
    },
    {
      name: "Rachel Lee",
      major: "BME",
      year: "2028",
      role: ["Outreach"],
    },
    {
      name: "Minjun Hur",
      major: "BME",
      year: "2026",
      role: ["Outreach"],
    },
  ],
  //   PR team
  public_relations: [
    // Design
    {
      isLead: true,
      name: "Jungin Hwang",
      major: "Computer Science",
      year: "2026",
      role: ["Design Lead / Web UI Design"],
    },
    {
      name: "Kelly Koo",
      major: "BHS & Art and Design",
      year: "2027",
      role: ["Design"],
    },
    {
      name: "Soomin Kang",
      major: "Undeclared",
      year: "2028",
      role: ["Design"],
    },
    {
      name: "Lauren Kim",
      major: "Computer Science",
      year: "2026",
      role: ["Web Development", "Design"],
    },
    // Social Media/Marketing
    {
      name: "Hyeri Lee",
      major: "Electrical Engineering",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Chaeyoung Kim",
      major: "Biomedical Engineering",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Hyowon Ko",
      major: "Statistics",
      year: "2027",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Cloe Jung",
      major: "Psychology",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Younghyun Choi",
      major: "Psychology",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Joowon Kang",
      major: "Psychology",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Sarah Kim",
      major: "Neuroscience",
      year: "2027",
      role: ["Social Media/Marketing"],
    },
  ],
};

const members_2023 = {
  // Presidents
  presidents: [
    {
      name: "Wookwan Kwon",
      major: "Computer Science",
      year: "2024",
      role: ["President"],
    },
    {
      name: "Yuri Hong",
      major: "Electrical Engineering",
      year: "2026",
      role: ["Vice President - OP"],
    },
    {
      name: "Siwon Lee",
      major: "Communication & Media",
      year: "2024",
      role: ["Vice President - PR"],
    },
  ],
  // OP team
  operations: [
    {
      name: "Jihyun Park",
      major: "Economics",
      year: "2025",
      role: ["Finance"],
    },
    {
      name: "Kyungmin Inn",
      major: "Computer Engineering",
      year: "2027",
      role: ["Operational Support"],
    },
    // Event Planning
    {
      name: "Yoon Sung Ji",
      major: "Computer Science",
      year: "2025",
      role: ["Event Planning"],
    },
    {
      name: "Jinwook Shin",
      major: "Computer Engineering",
      year: "2026",
      role: ["Event Planning"],
    },
    {
      name: "Jaemin Jeon",
      major: "Computer Science",
      year: "2025",
      role: ["Event Planning"],
    },
    {
      name: "Jisang Um",
      major: "IOE",
      year: "2026",
      role: ["Operational Support"],
    },
    // Web Development
    {
      isLead: true,
      name: "Dongsub Kim",
      major: "Computer Science",
      year: "2023",
      role: ["Web Development Lead"],
    },
    {
      name: "Jioh In",
      major: "Computer Science",
      year: "2028",
      role: ["Web Development"],
    },
  ],
  //   PR team
  public_relations: [
    // Design
    {
      isLead: true,
      name: "Chaeyoon Park",
      major: "STAMPS",
      year: "2025",
      role: ["Design Lead"],
    },
    {
      name: "Kelly Koo",
      major: "BHS",
      year: "2027",
      role: ["Design"],
    },
    {
      name: "Jade Byeon",
      major: "STAMPS & Statistics",
      year: "2026",
      role: ["Design"],
    },
    {
      name: "Jungin Hwang",
      major: "Computer Science",
      year: "2026",
      role: ["Design"],
    },
    // Social Media/Marketing
    {
      name: "Hyeri Lee",
      major: "Electrical Engineering",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Chaeyoung Kim",
      major: "Biomedical Engineering",
      year: "2026",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Hyowon Ko",
      major: "Statistics",
      year: "2027",
      role: ["Social Media/Marketing"],
    },
    {
      name: "Stella Han",
      major: "Computer Science",
      year: "2025",
      role: ["Social Media/Marketing"],
    },
    // Outreach
    {
      isLead: true,
      name: "Yoonjoo Lee",
      major: "Art History & Philosophy",
      year: "2025",
      role: ["Outreach Lead"],
    },
    {
      name: "Huymin Lee",
      major: "Data Science & Statistics",
      year: "2024",
      role: ["Outreach"],
    },
    {
      name: "Jooyoung Chung",
      major: "Political Science & Pre-Med",
      year: "2024",
      role: ["Outreach"],
    },
    {
      name: "Seungmin Shin",
      major: "Statistics",
      year: "2025",
      role: ["Outreach"],
    },
    {
      name: "Sophia Jang",
      major: "Robotics",
      year: "2027",
      role: ["Outreach"],
    },
  ],
};

export { members_2024, members_2023 };
