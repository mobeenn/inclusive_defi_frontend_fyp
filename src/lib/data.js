export const navLinks = [
   {
      name: "Dashboard",
      href: "/dashboard",
      icon: "/assets/icons/sidenav/home.svg",
      iconActive: "/assets/icons/sidenav/home-active.svg",
   },
   {
      name: "My Projects",
      href: "/dashboard/projects",
      icon: "/assets/icons/sidenav/projects.svg",
      iconActive: "/assets/icons/sidenav/projects.svg",
   },
   {
      name: "My Funding",
      href: "/dashboard/funding",
      icon: "/assets/icons/sidenav/funding.svg",
      iconActive: "/assets/icons/sidenav/funding-active.svg",
   },
   {
      name: "My Investments",
      href: "/dashboard/investments",
      icon: "/assets/icons/sidenav/funding.svg",
      iconActive: "/assets/icons/sidenav/funding-active.svg",
   },
   {
      name: "Chat",
      href: "/dashboard/chat",
      icon: "/assets/icons/sidenav/chat.svg",
      iconActive: "/assets/icons/sidenav/chat-active.svg",
   },
   {
      name: "Support",
      href: "/dashboard/support",
      icon: "/assets/icons/sidenav/support.svg",
      iconActive: "/assets/icons/sidenav/support-active.svg",
   },
   {
      name: "Stacking",
      href: "/dashboard/stake",
      icon: "/assets/icons/sidenav/stake.svg",
      iconActive: "/assets/icons/sidenav/stake-active.svg",
   },
   {
      name: "Swap",
      href: "/dashboard/swap",
      icon: "/assets/icons/sidenav/swap.svg",
      iconActive: "/assets/icons/sidenav/swap-active.svg",
   },
   {
      name: "Transaction History",
      href: "/dashboard/history",
      icon: "/assets/icons/sidenav/history.svg",
      iconActive: "/assets/icons/sidenav/history-active.svg",
   },
];

export const extraRoutes = [
   {
      name: "Update Profile",
      href: "/dashboard/update-profile",
   },
   {
      name: "Update Password",
      href: "/dashboard/update-password",
   },
   {
      name: "New Project",
      href: "/dashboard/add-new-project",
   },
   {
      name: "Edit Project",
      href: "/dashboard/add-new-project",
   },
];

// Creator Routes
export const creatorNavLinks = navLinks.filter(
   (item) => item.name !== "My Investments",
);
export const creatorAllRoutes = [...creatorNavLinks, ...extraRoutes];

// Investor Routes
export const investorNavLinks = navLinks.filter(
   (item) => item.name !== "My Projects" && item.name !== "My Funding",
);
export const investorAllRoutes = [...investorNavLinks, ...extraRoutes];

// Landing Page Nav Links
export const landingPageNavLinks = [
   {
      label: "Home",
      link: "/",
   },
   {
      label: "Explore Projects",
      link: "/projects",
   },
   {
      label: "Contact",
      link: "/contact",
   },
   {
      label: "FAQS",
      link: "/faqs",
   },
];

// Funding Data
export const fundingData = [
   {
      id: 1,
      projectHolder: {
         name: "Esthera Jackson",
         avatar: "/assets/images/user-temp.png",
      },
      projectTitle: "Aether Games",
      launchedDate: "10 March, 2023",
      status: "active",
      fundsRequired: "20000",
      amountFundedByYou: "4500",
   },
   {
      id: 2,
      projectHolder: {
         name: "Esthera Jackson",
         avatar: "/assets/images/user-temp.png",
      },
      projectTitle: "Aether Games",
      launchedDate: "10 March, 2023",
      status: "pending",
      fundsRequired: "20000",
      amountFundedByYou: "4500",
   },
   {
      id: 3,
      projectHolder: {
         name: "Esthera Jackson",
         avatar: "/assets/images/user-temp.png",
      },
      projectTitle: "Aether Games",
      launchedDate: "10 March, 2023",
      status: "completed",
      fundsRequired: "20000",
      amountFundedByYou: "4500",
   },
];

export const investorsData = [
   {
      id: 1,
      name: "Esthera Jackson",
      avatar: "/assets/images/user-temp.png",
      email: "esthera@simmmple.com",
      amount: 4500,
   },
   {
      id: 2,
      name: "Esthera Jackson",
      avatar: "/assets/images/user-temp.png",
      email: "esthera@simmmple.com",
      amount: 2000,
   },
   {
      id: 3,
      name: "Esthera Jackson",
      avatar: "/assets/images/user-temp.png",
      email: "esthera@simmmple.com",
      amount: 3200,
   },
];

// Partners
export const partners = [
   "/assets/landing/images/home/duolingo.png",
   "/assets/landing/images/home/microsoft.png",
   "/assets/landing/images/home/codecov-1.png",
   "/assets/landing/images/home/user-testing-1.png",
];

// Faqs
export const faqs = [
   {
      id: 1,
      question: "What is Inclusive DeFi LLC?",
      answer:
         "Inclusive DeFi LLC is a blockchain-powered crowdfunding platform that aims to democratize access to capital for underrepresented entrepreneurs.",
   },
   {
      id: 2,
      question: "How does Inclusive DeFi work?",
      answer:
         "Our platform allows entrepreneurs to create fundraising campaigns and connect with a diverse community of backers and investors who can contribute.",
   },
   {
      id: 3,
      question: "Who can use Inclusive DeFi's platform?",
      answer:
         "Inclusive DeFi's platform is open to entrepreneurs from all backgrounds, including women, minorities, LGBTQ+, and individuals from underserved communities. Investors interested in supporting diverse projects and fostering inclusivity are also welcome to join.",
   },
   {
      id: 4,
      question: "What types of projects can be funded on Inclusive DeFi?",
      answer:
         "Inclusive DeFi supports a wide range of projects across various industries, including technology startups, social enterprises, creative endeavors, and community initiatives. As long as the project aligns with our values of diversity, equity, and innovation, it can be funded on our platform.",
   },
   {
      id: 5,
      question:
         "How does Inclusive DeFi ensure transparency and security in crowdfunding?",
      answer:
         "Inclusive DeFi leverages blockchain technology to provide transparency and security in crowdfunding. Smart contracts and decentralized ledger technology enable transparent tracking of funds, ensuring that contributions are securely managed and allocated as intended.",
   },
   {
      id: 6,
      question:
         "What fees are associated with using Inclusive DeFi's platform?",
      answer:
         "Inclusive DeFi charges a small fee for fundraising campaigns conducted on our platform. The fee structure typically includes a percentage of the total funds raised, with variations based on the size and duration of the campaign. Additionally, premium services may be available for an additional fee.",
   },
   {
      id: 7,
      question:
         "How does Inclusive DeFi support its users throughout the crowdfunding process?",
      answer:
         "Inclusive DeFi offers comprehensive support to entrepreneurs and investors throughout the crowdfunding process. Our customer support team provides assistance with account setup, campaign management, and any questions or issues that arise along the way.",
   },
   {
      id: 8,
      question:
         "What measures does Inclusive DeFi take to ensure compliance with regulations?",
      answer:
         "Inclusive DeFi is committed to compliance with relevant laws and regulations governing crowdfunding, blockchain technology, and financial services. We work closely with legal advisors and regulatory experts to ensure that our platform operates in accordance with applicable standards and requirements.",
   },
];
