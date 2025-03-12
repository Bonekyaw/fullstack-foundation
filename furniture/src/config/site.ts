const links = {
  x: "https://twitter.com/sample",
  github: "https://github.com/sample/furniture",
  githubAccount: "https://github.com/sample",
  discord: "https://discord.com/users/sample",
};

export const siteConfig = {
  name: "Furniture Shop",
  description: "A Furniture Shopp build with react router.",
  links,
  mainNav: [
    {
      title: "Products",
      card: [
        {
          title: "Wooden",
          href: "/products?categories=1",
          description: "comfortable with Wooden furniture.",
        },
        {
          title: "Bamboo",
          href: "/products?categories=2",
          description: "Build your own Bamboo furniture.",
        },
        {
          title: "Metal",
          href: "/products?categories=3",
          description: "Buy our latest metal furniture.",
        },
      ],
      menu: [
        {
          title: "Services",
          href: "services",
        },
        {
          title: "Blog",
          href: "blogs",
        },
        {
          title: "About Us",
          href: "about",
        },
      ],
    },
  ],
  footerNav: [
    {
      title: "Furniture Types",
      items: [
        {
          title: "Seating",
          href: "/types/seating",
          external: true,
        },
        {
          title: "Lying",
          href: "/types/lying",
          external: true,
        },
        {
          title: "Entertainment",
          href: "/types/entertainment",
          external: true,
        },
        {
          title: "Tables",
          href: "/types/tables",
          external: true,
        },
        {
          title: "Storage",
          href: "/types/storage",
          external: true,
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "X",
          href: links.x,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
      ],
    },
    {
      title: "Partner",
      items: [
        {
          title: "Shoppy",
          href: "https://shoppy.com",
          external: true,
        },
        {
          title: "Poppy",
          href: "https://poppy.com",
          external: true,
        },
        {
          title: "Talkie",
          href: "https://talkie.com",
          external: true,
        },
        {
          title: "coffee",
          href: "https://coffee.com",
          external: true,
        },
      ],
    },
  ],
};
