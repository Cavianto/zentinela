import { executeQuery } from "../lib/db"

// This script can be run to seed the database with initial blog posts

async function seedBlogPosts() {
  console.log("Seeding blog posts...")

  // Check if we already have blog posts
  const existingPosts = await executeQuery("SELECT COUNT(*) as count FROM blog_posts")
  if (existingPosts[0].count > 0) {
    console.log(`Database already has ${existingPosts[0].count} blog posts. Skipping seeding.`)
    return
  }

  // Create a test user if needed
  let authorId: string
  const existingUsers = await executeQuery("SELECT id FROM users LIMIT 1")

  if (existingUsers.length === 0) {
    console.log("Creating a test user...")
    const insertUserResult = await executeQuery(`
      INSERT INTO users (email, first_name, last_name)
      VALUES ('admin@zentinela.com', 'Admin', 'User')
      RETURNING id
    `)
    authorId = insertUserResult[0].id

    // Add user role
    await executeQuery(
      `
      INSERT INTO user_roles (user_id, role)
      VALUES ($1, 'superadmin')
    `,
      [authorId],
    )

    console.log(`Created test user with ID: ${authorId}`)
  } else {
    authorId = existingUsers[0].id
  }

  // Sample blog posts
  const blogPosts = [
    {
      title: "Understanding Digital Footprints: What You Leave Behind Online",
      slug: "understanding-digital-footprints",
      excerpt:
        "Every click, search, and post contributes to your digital footprint. Learn how to manage your online presence effectively.",
      content: `
# Understanding Digital Footprints: What You Leave Behind Online

In today's interconnected world, our online activities leave behind a trail of data known as a "digital footprint." This footprint consists of all the information about you that exists online as a result of your digital activity.

## What Makes Up Your Digital Footprint?

Your digital footprint includes:

- **Social media posts and interactions**
- **Online shopping habits**
- **Search engine queries**
- **Website visits**
- **App usage data**
- **Email communications**
- **Comments on forums and blogs**
- **Photos and videos you upload**

## Active vs. Passive Digital Footprints

There are two types of digital footprints:

### Active Digital Footprints
Information you deliberately share online, such as:
- Social media posts
- Blog comments
- Forum participation
- Online reviews

### Passive Digital Footprints
Information collected about you without your direct involvement:
- Browsing history tracked by cookies
- IP address logs
- Location data from mobile devices
- Data collected by apps running in the background

## Why Your Digital Footprint Matters

Your digital footprint can impact:

1. **Employment opportunities**: Many employers review candidates' online presence
2. **Personal relationships**: What you share online can affect how others perceive you
3. **Security and privacy**: Larger footprints create more opportunities for identity theft
4. **Financial decisions**: Some lenders review online activity as part of their assessment

## Managing Your Digital Footprint

Here are some strategies to manage your digital footprint effectively:

- **Audit your online presence** regularly by searching your name
- **Review privacy settings** on all platforms you use
- **Think before you post** - consider the long-term implications
- **Use strong, unique passwords** for different accounts
- **Be selective about the apps you install** and the permissions you grant
- **Consider using a VPN** for more private browsing
- **Regularly delete unused accounts** to reduce your online exposure

## Conclusion

Your digital footprint is an inevitable part of participating in the digital world. By understanding what contributes to it and taking proactive steps to manage it, you can maintain better control over your online presence and protect your privacy and reputation.

Remember that in the digital age, privacy requires ongoing attention and management. At Zentinela, we help organizations and individuals understand and manage their digital footprints through our comprehensive OSINT services.
      `,
      featured_image: "/blog/digital-footprint.jpg",
      tags: ["cybersecurity", "privacy", "digital footprint"],
    },
    {
      title: "The Rise of OSINT in Corporate Due Diligence",
      slug: "rise-of-osint-in-corporate-due-diligence",
      excerpt:
        "Open Source Intelligence (OSINT) is transforming how companies conduct background checks and due diligence. Learn why it matters.",
      content: `
# The Rise of OSINT in Corporate Due Diligence

Open Source Intelligence (OSINT) has emerged as a critical tool in corporate due diligence processes. As organizations face increasing pressure to thoroughly vet potential partners, employees, and investments, OSINT provides a powerful methodology for gathering and analyzing publicly available information.

## What is OSINT?

OSINT refers to intelligence collected from publicly available sources, including:

- **Social media platforms**
- **News articles and publications**
- **Government databases**
- **Corporate filings**
- **Academic papers**
- **Forums and discussion boards**
- **Websites and blogs**

Unlike traditional intelligence gathering, OSINT relies entirely on information that is legally accessible to the public, though it may require specialized tools and methodologies to collect and analyze effectively.

## Why OSINT Matters in Corporate Due Diligence

### 1. Comprehensive Risk Assessment

OSINT enables companies to develop a more complete picture of potential risks associated with:
- Business partners
- Acquisition targets
- Senior executive hires
- Vendors and suppliers

### 2. Cost-Effective Intelligence

Compared to traditional private investigation methods, OSINT can provide significant cost savings while delivering valuable insights. The information is already available—the key is knowing how to find, collect, and analyze it effectively.

### 3. Early Warning System

Regular OSINT monitoring can serve as an early warning system for:
- Reputation issues
- Regulatory concerns
- Security threats
- Competitive challenges

### 4. Global Reach

OSINT techniques can be applied across geographical boundaries, making them particularly valuable for companies operating internationally or considering expansion into new markets.

## OSINT Techniques in Corporate Due Diligence

Modern OSINT practitioners employ a variety of techniques:

- **Social media analysis**: Examining the online presence and connections of individuals and organizations
- **Dark web monitoring**: Checking for leaked credentials or mentions in illicit forums
- **Network mapping**: Understanding relationships between individuals and organizations
- **Historical data analysis**: Reviewing archived websites and historical statements
- **Sentiment analysis**: Gauging public perception and reputation

## Ethical and Legal Considerations

While OSINT relies on publicly available information, its use still requires careful attention to:

- **Privacy laws** such as GDPR in Europe
- **Legal boundaries** of information collection
- **Ethical use** of gathered intelligence
- **Verification** of information before making decisions

## The Future of OSINT in Due Diligence

As digital footprints continue to expand, OSINT will become increasingly central to corporate due diligence processes. Advances in artificial intelligence and machine learning are already enhancing the ability to collect and analyze vast amounts of open-source data quickly and effectively.

Organizations that develop robust OSINT capabilities—either in-house or through specialized partners like Zentinela—will gain a significant advantage in risk management and strategic decision-making.

## Conclusion

OSINT has transformed from a niche intelligence-gathering technique to an essential component of corporate due diligence. By leveraging publicly available information through structured methodologies, organizations can make more informed decisions, mitigate risks, and protect their interests in an increasingly complex business environment.
      `,
      featured_image: "/blog/osint-corporate.jpg",
      tags: ["OSINT", "due diligence", "corporate security", "risk management"],
    },
    {
      title: "Protecting Your Organization from Social Engineering Attacks",
      slug: "protecting-organization-from-social-engineering",
      excerpt:
        "Social engineering remains one of the most effective methods for breaching security. Learn how to defend your organization against these threats.",
      content: `
# Protecting Your Organization from Social Engineering Attacks

Despite advances in technical security measures, social engineering attacks continue to be one of the most effective methods for breaching organizational defenses. These attacks target human psychology rather than technical vulnerabilities, making them particularly dangerous and difficult to prevent.

## What is Social Engineering?

Social engineering refers to psychological manipulation techniques that trick people into making security mistakes or giving away sensitive information. Unlike technical hacking, social engineering exploits human behavior and decision-making.

## Common Social Engineering Techniques

### Phishing

Phishing involves sending fraudulent communications that appear to come from reputable sources, typically via email. These messages are designed to steal sensitive data or install malware.

**Example**: An email appearing to be from your IT department asking you to "verify your account details" by clicking a link and entering your credentials.

### Pretexting

Pretexting involves creating a fabricated scenario (a pretext) to engage a victim and gain their trust, ultimately leading them to divulge information or perform actions they shouldn't.

**Example**: A caller claiming to be from your bank's fraud department who needs to "verify" your account details due to "suspicious activity."

### Baiting

Baiting involves offering something enticing to pique curiosity and lure victims into a trap.

**Example**: USB drives labeled "Confidential Salary Information" left in company parking lots, containing malware that activates when plugged in.

### Quid Pro Quo

Similar to baiting, quid pro quo attacks promise a benefit in exchange for information or action.

**Example**: A caller offering free IT assistance in exchange for login credentials.

### Tailgating

Tailgating (or piggybacking) involves an unauthorized person following an authorized person into a secured area.

**Example**: An attacker carrying a heavy box asks an employee to hold the door open to a restricted area.

## The Psychology Behind Social Engineering

Social engineers exploit fundamental human tendencies:

- **Authority**: People tend to obey authority figures
- **Urgency**: Time pressure leads to hasty decisions
- **Scarcity**: Limited availability drives action
- **Familiarity**: People trust what seems familiar
- **Fear**: Strong emotions override rational thinking
- **Consensus**: People follow what others are doing

## Building Organizational Defenses

### 1. Comprehensive Training Programs

Develop regular, engaging security awareness training that:
- Uses real-world examples
- Includes simulated phishing exercises
- Rewards vigilance rather than punishing mistakes
- Updates content to reflect current threats

### 2. Establish Clear Security Policies

Create and enforce policies for:
- Handling sensitive information
- Verifying identities before sharing information
- Reporting suspicious activities
- Physical access procedures

### 3. Implement Technical Controls

While not foolproof, technical measures help:
- Email filtering and authentication
- Multi-factor authentication
- Least privilege access principles
- Regular security assessments

### 4. Create a Security-Conscious Culture

Foster an environment where:
- Security is everyone's responsibility
- Questions and skepticism are encouraged
- Reporting concerns is valued
- Leadership models secure behavior

### 5. Develop Response Protocols

Establish clear procedures for:
- Reporting potential social engineering attempts
- Containing and investigating incidents
- Communicating during security events
- Learning from incidents to prevent recurrence

## Conclusion

Social engineering attacks exploit human psychology rather than technical vulnerabilities, making them particularly challenging to defend against. By understanding the techniques used by attackers and implementing a multi-layered defense strategy that combines awareness training, clear policies, technical controls, and a security-conscious culture, organizations can significantly reduce their vulnerability to these threats.

Remember that security is an ongoing process, not a one-time project. Regular assessment, training, and adaptation are essential to maintaining effective defenses against the ever-evolving landscape of social engineering attacks.
      `,
      featured_image: "/blog/social-engineering.jpg",
      tags: ["cybersecurity", "social engineering", "security awareness", "phishing"],
    },
  ]

  // Insert blog posts
  for (const post of blogPosts) {
    console.log(`Creating blog post: ${post.title}`)

    await executeQuery(
      `
      INSERT INTO blog_posts (
        title, 
        slug, 
        excerpt, 
        content, 
        featured_image, 
        author_id,
        tags
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [post.title, post.slug, post.excerpt, post.content, post.featured_image, authorId, post.tags],
    )
  }

  console.log("Blog posts seeded successfully!")
}

// Run the seed function
seedBlogPosts().catch(console.error)
