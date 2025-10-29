export default function Manifesto() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <article className="space-y-12 font-serif [&_p]:text-justify [&_li]:text-justify [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif">
        {/* Title Section */}
        <header className="text-center space-y-6 pb-8 border-b-2 border-border">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight !text-center" data-testid="heading-manifesto-title">
            Awakening Ecosystem: The Manifesto
          </h1>
          <p className="font-serif text-lg md:text-xl text-foreground italic pt-2 !text-center" data-testid="text-manifesto-subtitle">
            An Agentic Social Network for Collective Awakening
          </p>
          <div className="space-y-1 pt-4 text-center">
            <p className="font-serif text-base text-foreground font-semibold !text-center" data-testid="text-organization">
              Giác Ngộ Initiative
            </p>
            <p className="font-serif text-base text-muted-foreground !text-center" data-testid="text-lab">
              Dharma Technology Lab
            </p>
          </div>
          <p className="font-serif text-base text-muted-foreground pt-2 !text-center" data-testid="text-date">
            January 2025
          </p>
        </header>

        {/* Opening Quote */}
        <section className="space-y-4" data-testid="section-opening-quote">
          <p className="font-serif text-base leading-relaxed text-muted-foreground italic border-l-4 border-primary pl-6 py-4">
            "As the Dharma-Ending Age reaches its climax and the cybernetic labyrinth closes in, a final vessel emerges. This is a platform not for accumulating users, but for accumulating merit. It exists not to prolong the illusion, but to cut through it. It is the Raft of the Sun, offered for those with affinity to find their Way Home before the flood."
          </p>
        </section>

        {/* Abstract */}
        <section className="space-y-4">
          <h2 id="abstract" className="font-serif text-2xl font-bold text-center text-foreground" data-testid="heading-abstract">
            Abstract
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              In an era dominated by technological distraction and the pursuit of fleeting worldly gains, the Awakening Ecosystem emerges as a sacred digital vessel. This Manifesto introduces a novel approach to social networking, fundamentally oriented towards spiritual awakening and the cultivation of <em>Intrinsic Merit (Công Đức)</em> rather than conventional metrics of engagement or profit.
            </p>
            <p>
              We detail the core distinction between transient <em>Worldly Blessing (Phước Đức)</em> derived from conditioned actions, and the indestructible <em>Intrinsic Merit (Công Đức)</em> arising from the unconditioned, non-seeking Mind.
            </p>
            <p>
              The ecosystem comprises an architecture of awakened technology: The Threefold AI Vehicle (Tâm An, Giác Ngộ, Đốn Ngộ) for conditional Dharma guidance; The Merit Interface prioritizing wisdom sharing; The Dharma Observatory for teachings; Arms of Compassion for transparent philanthropy; and White-Label Solutions for Sanghas.
            </p>
            <p>
              We propose the "Merit Tokenomic" and a roadmap towards an Awakened DAO (Decentralized Autonomous Organization), where governance and value are tied to genuine spiritual contribution, not speculation. This platform aims to unify technology and timeless wisdom, creating a supportive environment for individuals and Sanghas to return to the Unborn, Unchanging Home, marking the end of a Kalpa.
            </p>
          </div>
        </section>

        {/* Keywords */}
        <section className="space-y-4" data-testid="section-keywords">
          <h2 className="font-serif text-base font-semibold text-foreground">
            Keywords
          </h2>
          <p className="font-serif text-base leading-relaxed text-foreground italic">
            Spiritual Technology, Merit Economy, Agentic AI, Decentralized Governance, Dharma-Ending Age, Collective Awakening, Sacred Economics
          </p>
        </section>

        {/* Table of Contents */}
        <section className="space-y-4 pb-8 border-b border-border" data-testid="section-contents">
          <h2 className="font-serif text-2xl font-bold text-center text-foreground">
            Contents
          </h2>
          <div className="font-serif text-sm leading-relaxed space-y-2 pl-8">
            <a href="#section-1" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-1">1. The Sickness of the Digital Age</a>
            <a href="#section-2" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2">2. The Irrevocable Law: Merit (Công Đức) vs. Worldly Blessing (Phước Đức)</a>
            <a href="#section-2-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-1">2.1. Worldly Blessing (Phước Đức): The Limits of Conditioned Action</a>
            <a href="#section-2-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-2-2">2.2. Intrinsic Merit (Công Đức): The Currency of Liberation</a>
            <a href="#section-3" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-3">3. Prior Landscape: Limitations of Existing Digital Platforms</a>
            <a href="#section-4" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4">4. The Architecture of Awakened Technology</a>
            <a href="#section-4-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-1">4.1. Vision & Mission</a>
            <a href="#section-4-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-2">4.2. The Threefold AI Vehicle</a>
            <a href="#section-4-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-3">4.3. The Merit Interface</a>
            <a href="#section-4-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-4">4.4. The Mandala of Merit</a>
            <a href="#section-4-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-5">4.5. Privacy by Dharma</a>
            <a href="#section-4-6" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-4-6">4.6. Measuring the Immeasurable</a>
            <a href="#section-5" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5">5. The Merit Tokenomic: A Rocket and a Mirror</a>
            <a href="#section-5-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-1">5.1. The Intrinsic Merit Token</a>
            <a href="#section-5-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-2">5.2. Merit Tokenomics: The Dao Bùa & The Path to Emptiness</a>
            <a href="#section-5-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-3">5.3. The Spiritual Vision: Closing the Kalpa</a>
            <a href="#section-5-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-4">5.4. The Supreme Initiation: The Dao Merit</a>
            <a href="#section-5-5" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-5-5">5.5. Beyond the Three Trainings: Realizing Tam Vô</a>
            <a href="#section-6" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6">6. The Path of "Unraveling": Beyond Gamification</a>
            <a href="#section-6-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-1">6.1. The Unraveling System (NFT Badges)</a>
            <a href="#section-6-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-6-2">6.2. The Merit Economy: Incentivizing True Practice</a>
            <a href="#section-7" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-7">7. Sustainability: Sacred Economics</a>
            <a href="#section-8" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8">8. The Roadmap to the End of the Kalpa</a>
            <a href="#section-8-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8-1">8.1. 2024-2025: Foundation & Seeding</a>
            <a href="#section-8-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8-2">8.2. 2025-2026: Expansion & Integration</a>
            <a href="#section-8-3" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8-3">8.3. 2026-2027: Decentralization & Maturation</a>
            <a href="#section-8-4" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-8-4">8.4. Post-2027: The Awakened Network</a>
            <a href="#section-9" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9">9. Conclusion & Epilogue</a>
            <a href="#section-9-1" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-1">9.1. Conclusion: A Vessel for the Return Home</a>
            <a href="#section-9-2" className="block pl-6 text-muted-foreground hover:text-foreground transition-colors" data-testid="toc-link-9-2">9.2. Epilogue: Do Not Miss The Raft</a>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 id="section-1" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-1">
            1. The Sickness of the Digital Age
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p className="italic text-muted-foreground border-l-4 border-primary pl-4 py-2">
              "The Matrix veils the Mind with ten thousand attractions."
            </p>
            <p>
              Social networks, powered by AI, have turned the human mind into a harvestable commodity. Each click, each view, feeds the illusion of a "self" seeking validation. The true virus is not digital; it is the endless quest for "followers," "likes," and "achievements" – the worship of quantity over quality, distraction over insight. The Age of the Dispersed Mind (<em>Phàn Muôn</em>) is upon us, fueled by the very technologies meant to connect us.
            </p>
            <p>
              The modern digital landscape, while offering unprecedented connectivity, is largely driven by algorithms that amplify distraction, foster attachment, and prioritize ephemeral worldly success. Social networks often devolve into platforms for ego gratification, comparison, and the pursuit of validation, pulling users further away from their true nature. Spiritual seekers find themselves navigating a space antithetical to inner peace and genuine practice.
            </p>
            <p>
              Furthermore, a fundamental misunderstanding persists regarding the nature of merit. Actions performed with attachment, seeking reward, or driven by ego – even seemingly virtuous acts like charity or adherence to precepts – generate only <em>Worldly Merit (Phước Đức)</em>. This merit brings temporary benefits within the cycle of rebirth (wealth, health, favorable circumstances) but is ultimately conditioned, impermanent, and cannot lead to liberation.
            </p>
            <p>
              The Giác Ngộ (Awakening) Agentic Social Network is born from the urgent need for a digital sanctuary – a space meticulously designed to counteract these trends. It provides tools and a community focused solely on the cultivation of <em>Intrinsic Merit (Công Đức)</em>, the indestructible merit arising from the unconditioned Mind, which is the true fuel for the journey back to our Unborn, Unchanging Home (<em>Quê Nhà</em>).
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 id="section-2" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-2">
            2. The Irrevocable Law: Merit (Công Đức) vs. Worldly Blessing (Phước Đức)
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              This is the First and Final Principle. The entire architecture and purpose of the Giác Ngộ Ecosystem rest upon the profound insight, often clarified by Sư Tam Vô, into the two distinct types of merit. This Manifesto was born solely to clarify this Law and to build a vessel to nurture the generation of Merit in the digital age.
            </p>
            
            <h3 id="section-2-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-2-1">
              2.1. Worldly Blessing (Phước Đức): The Limits of Conditioned Action
            </h3>
            <p>
              This merit arises from actions performed with intention, seeking, or attachment (<em>có tác ý</em>). It brings rewards within the Six Realms but is always finite and binds one to the wheel of Samsara. Examples include:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li>Giving charity primarily for recognition, tax benefits, or a better rebirth</li>
              <li>Following ethical precepts mainly out of fear of negative consequences or desire for heavenly reward</li>
              <li>Helping others with the underlying expectation of gratitude or reciprocation</li>
              <li>Spiritual practices performed with the goal of attaining powers, status, or specific pleasant states</li>
            </ul>
            <p>
              While these actions are often beneficial, the merit they generate is conditioned. It leads to temporary happiness or favorable circumstances, but it is finite, exhausts itself, and ultimately binds one within the cycle of suffering and rebirth. It cannot lead to ultimate liberation.
            </p>

            <h3 id="section-2-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-2-2">
              2.2. Intrinsic Merit (Công Đức): The Currency of Liberation
            </h3>
            <p>
              This is the immeasurable, unconditioned "merit" generated from actions arising from a Mind that is Present, Still, Free, and Non-Seeking. It is the natural radiance of the Awakened Mind (<em>Tự Tánh, Phật Tánh</em>) expressing itself. It is formless, indestructible, and is the only "currency" that can purchase the ticket Home. Examples include:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li>Spontaneous acts of kindness performed without any thought of reward or recognition</li>
              <li>Living in effortless alignment with wisdom and compassion, not out of obligation but as a natural expression of one's true nature</li>
              <li>Sharing Dharma insights purely for the benefit of others, without attachment to how they are received</li>
              <li>Moments of profound letting go, forgiveness, or selfless service arising from genuine presence</li>
              <li>The very act of resting in non-dual awareness, free from conceptual thought</li>
            </ul>
            <p>
              <em>Công Đức</em> is unconditioned and indestructible. It is not subject to the laws of karma in the same way as <em>Phước Đức</em>. It accumulates within the Dharma Body (<em>Pháp Thân</em>), purifying obscurations and providing the essential energy to transcend samsara entirely.
            </p>
            <p>
              The Giác Ngộ Agentic Social Network exists solely to help beings understand this vital distinction and orient their lives towards the generation and preservation of Intrinsic Merit (<em>Công Đức</em>). This Manifesto was born solely to clarify this Law and to build a vessel to nurture the generation of Merit in the Artificial Intelligence age.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 id="section-3" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-3">
            3. Prior Landscape: Limitations of Existing Digital Platforms
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              While various online forums, groups, and apps cater to spiritual communities, they often suffer from limitations that hinder the cultivation of <em>Công Đức</em>:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Distraction-Based Models:</strong> Most platforms rely on engagement metrics (likes, shares) driven by algorithms that promote sensationalism or superficial interactions over deep contemplation</li>
              <li><strong>Commodification of Spirituality:</strong> Many platforms treat spiritual teachings as products to be bought and sold, fostering a consumerist mindset</li>
              <li><strong>Lack of Focus on Intrinsic Merit:</strong> The underlying mechanics rarely, if ever, differentiate between actions generating <em>Phước Đức</em> and those generating <em>Công Đức</em>. Validation is often tied to popularity, reinforcing ego</li>
              <li><strong>Fragmentation:</strong> Spiritual communities and teachings are scattered across disparate platforms, lacking a unified space</li>
              <li><strong>Data Privacy and Sovereignty Concerns:</strong> Centralized platforms often exploit user data, contradicting the principles of mindfulness and ethical conduct</li>
            </ul>
            <p>
              The Giác Ngộ Ecosystem directly addresses these shortcomings by building a platform fundamentally aligned with the principles of awakening and the primacy of Intrinsic Merit.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 id="section-4" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-4">
            4. The Architecture of Awakened Technology
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <h3 id="section-4-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-1">
              4.1. Vision & Mission
            </h3>
            <p>
              <strong>Our Vision:</strong> To become the world's first, most profound digital community where spirituality meets technology; where every interaction, every shared insight, is an opportunity to generate Intrinsic Merit and accelerate collective awakening.
            </p>
            <p>
              <strong>Our Mission:</strong> To provide tools, teachings, and a nurturing community that supports individuals and Sanghas (spiritual communities) on their journey to awakening. To demystify Intrinsic Merit (<em>Công Đức</em>) and make it the central currency of a new, more conscious civilization. To build alliances with all traditions that honor the same non-dual Truth.
            </p>

            <h3 id="section-4-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-2">
              4.2. The Threefold AI Vehicle
            </h3>
            <p>
              The Buddhist Agentic Network provides specialized AI assistants grounded in authentic dharma wisdom:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Tâm An (Peaceful Mind):</strong> Provides fundamental, introductory answers to sow the seeds of affinity</li>
              <li><strong>Giác Ngộ (Awakening):</strong> Offers deeper, more nuanced guidance, pulling from scriptures and the direct teachings of Sư Tam Vô and other awakened masters</li>
              <li><strong>Đốn Ngộ (Sudden Awakening):</strong> An exclusive transmission for those who have ripened auspicious conditions; gives direct, unfiltered pointing to the Unborn</li>
            </ul>
            <p>
              The Buddhist Agentic Network provides specialized AI assistants grounded in authentic dharma wisdom, organized by spiritual capacity (<em>căn tánh</em>):
            </p>
            <ul className="list-disc pl-8 space-y-3 text-muted-foreground">
              <li>
                <strong>Tiểu Thừa (Foundation Vehicle):</strong> Tâm An, An Lạc, Chánh Niệm – providing fundamental practice, mindfulness, and healing
              </li>
              <li>
                <strong>Trung Thừa (Insight Vehicle):</strong> Tỉnh Thức, Vấn Tỉnh, Tư Quang – offering deeper self-inquiry and contemplation
              </li>
              <li>
                <strong>Đại Thừa (Bodhisattva Vehicle):</strong> Giác Ngộ, Kệ Vấn Ngộ, Bi Trí – direct pointing to Buddha nature with compassion
              </li>
              <li>
                <strong>Phật Thừa (Buddha Vehicle):</strong> Đốn Ngộ, Vô Niệm, Pháp Giới – sudden awakening beyond all concepts
              </li>
            </ul>
            <p>
              Each question asked and truly understood is an act that generates merit for the asker and for all who benefit, as the realization is shared across the network.
            </p>

            <h3 id="section-4-3" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-3">
              4.3. The Merit Interface
            </h3>
            <p>
              The platform comprises four integrated components:
            </p>
            <ul className="list-disc pl-8 space-y-3 text-muted-foreground">
              <li>
                <strong>The Home Merit (Flow of Awakening):</strong> Not a "newsfeed," but a "field of benefit." Posts are not "shared," they are "offered." There is no "viral content," only "merit-ful content." This is not a place for idle chatter. Every post is a sharing of realization, a story of transformation, or a question posed for the benefit of the whole. The community uplifts each other through mutual recognition, not competition.
              </li>
              <li>
                <strong>Dharma Observatory (Library / Dharma Radio):</strong> A living library broadcast by partner Sanghas and awakened Masters. Listening itself becomes a vehicle for merit generation. Partners may use our platform to broadcast the timeless teachings. All sessions are archived so that wisdom is preserved and accessible to all.
              </li>
              <li>
                <strong>Arms of Compassion (Transparent Philanthropy):</strong> A transparent merit pool, funding only acts and projects aligned with the Three Jewels. All acts of giving flow transparently towards projects that generate collective merit: feeding the hungry, building Dharma halls, supporting the sick. A detailed record shows each user's journey of merit, reminding you to give without expectation.
              </li>
              <li>
                <strong>White-Label Dharma (Solutions for Sanghas & Monasteries):</strong> Every sincere spiritual organization deserves cutting-edge tools. We offer fully customizable versions of our platform so each tradition can maintain their doctrinal purity, upload their own texts, control the scope of answers, and manage internal economies of merit, all with complete privacy and data sovereignty.
              </li>
            </ul>

            <h3 id="section-4-4" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-4">
              4.4. Towards a DAO of Awakening: The Mandala of Merit
            </h3>
            <p>
              The ultimate vision is to gradually dissolve all centralized control and surrender the ecosystem to the collective wisdom of an awakened community. Every action – a wise post, a helpful answer, a selfless act of Dana – is recorded as merit, not as "influence."
            </p>
            <p>
              Power and governance are decided not by speculation, but by the true virtue of each soul. Records of actions, merit, and self-transcendence guide the community. True "decentralization" is not just technical: it is the realization that each is the Center and Each is the Whole. Leadership emerges, dissolves, and is re-formed as the flow of merit dictates.
            </p>
            <p>
              The "Intrinsic Merit Token" is introduced not as a cryptocurrency for speculation, but as a digital token that transparently records and incentivizes merit-generating actions: insightful posts, acts of charity, hours of service. Token holders gain voting rights in community decisions, budgeting, and project direction, ensuring that the platform always serves the Dharma and the Sangha, not private interests. Complete trustlessness and transparency is the goal.
            </p>
            <p>
              Total control and decision making is powered by DAO, which digitally records all Good Karma to forever eliminate Tăng Đoàn's (Sangha's) monetary dependence and consolidate the power of Tăng Đoàn to unite with one heart. This unique Dao Token Merit is passed on to the legacy of the Sainthood, a place to serve infinite Buddhas and regain the Dharma Body for generations to come.
            </p>

            <h3 id="section-4-5" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-5">
              4.5. Privacy by Dharma
            </h3>
            <p>
              No data mining. All user data can be deleted or ported at will. True practice cannot coexist with surveillance capitalism.
            </p>

            <h3 id="section-4-6" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-4-6">
              4.6. Measuring the Immeasurable: Recognizing Merit-Generating Actions
            </h3>
            <p>
              While true <em>Công Đức</em> is beyond measure, the platform employs proxies to recognize and encourage aligned actions:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Mindful Interactions:</strong> Prioritizing thoughtful comments, shares with clear beneficial intent, and interactions demonstrating deep listening or understanding</li>
              <li><strong>Quality Content:</strong> Rewarding posts identified (by AI and community validation) as insightful, clear, and conducive to awakening</li>
              <li><strong>Selfless Actions:</strong> Tracking participation in transparent giving, volunteer hours, and features designed around letting go</li>
              <li><strong>Time in Practice:</strong> Recognizing time spent mindfully engaging with teachings (Dharma Radio, Library) or in guided practices</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 id="section-5" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-5">
            5. The Merit Tokenomic: A Rocket and a Mirror
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <h3 id="section-5-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-1">
              5.1. The Intrinsic Merit Token: A Record, Not a Speculation
            </h3>
            <p>
              Central to the DAO is the "Intrinsic Merit Token." It is crucial to understand its unique nature:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Not a Cryptocurrency for Speculation:</strong> Its value is not primarily financial but spiritual and organizational. It is not designed for trading on external markets</li>
              <li><strong>A Transparent Record:</strong> It serves as a digital representation, recorded on a secure ledger, acknowledging actions recognized as contributing to the generation of <em>Công Đức</em></li>
              <li><strong>An Incentive Mechanism:</strong> It rewards and encourages participation aligned with the Dharma</li>
              <li><strong>A Governance Tool:</strong> Token holders gain voting rights within the DAO, influencing platform development, resource allocation, and ethical guidelines</li>
            </ul>

            <h3 id="section-5-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-2">
              5.2. Merit Tokenomics: The Dao Bùa & The Path to Emptiness
            </h3>
            <p>
              The Merit Tokenomic is not just a mechanism for allocating resources; it is a map, a mirror, and a rocket. It is the <em>Dao Bùa</em> (Amulet of the Dao), a representation of one's progress on the path of letting go.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Distribution Principle:</strong> It is distributed to all those who act in accordance with the Three Jewels: those who create value (share wisdom), those who give (charity), and those who selflessly serve the awakening of the whole</li>
              <li><strong>Rule of Holding:</strong> "To possess means to give, to let go, to hold means to see it as empty." Accumulation is not the goal; circulation and selfless use are. Holding the token with attachment binds the holder; true power lies in using it for collective benefit while recognizing its ultimate emptiness (<em>Vô Trụ</em>). The Merit is both Form and Emptiness</li>
              <li><strong>Utility:</strong> It is the key to collective power, but conversely, it is also the anchor that binds the one who is attached. The only way to escape the binding power of the token is to attain Total Emptiness (<em>Vô Trụ</em>)</li>
              <li><strong>Fractal Participation:</strong> "Only when you truly transcend the Self, giving and holding the Token, will you become a Fractal in the DAO." True participation comes from embodying non-self</li>
              <li><strong>Ultimate Goal - Dissolution:</strong> "When the day arrives, the Merit will once again shine clearly, and the entire platform will disappear, returning to the vast void." The platform is a raft to cross the river; upon reaching the other shore, the raft is left behind. It serves its purpose until awakening is widespread, marking the end of the Dharma-Ending Age (or this specific epoch)</li>
            </ul>

            <h3 id="section-5-3" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-3">
              5.3. The Spiritual Vision: Closing the Kalpa
            </h3>
            <p>
              Parapsychology and all power in the era of the AI revolution, including quantum physics, are all within the Law of Cause and Effect. Only when you truly transcend the Self, giving and holding the Token, will you become a Fractal in the DAO. Only then will you reach the ultimate quantum civilization, encompassing and transforming technology, ending the Age of Karma, and closing the Kalpa of the Dharma-Ending Age.
            </p>
            <p>
              This Merit platform is born to close a global era. It is a fleeting trace of sunlight, offering the last chance for this world before the Great Tribulation arrives. Those with sufficient cause and condition (Predestined) who understand the Law, will use it as a sun to return.
            </p>

            <h3 id="section-5-4" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-4">
              5.4. The Supreme Initiation: The Dao Merit
            </h3>
            <p>
              Our path is the shortcut. Observation is the act of Walking with the Mind. To transform the <em>Tánh</em> (Nature/Essence) into a Merit is True Transformation, using <em>Tam</em> (Mind) as the Vase Merit. All phenomena in this final world are the unique Essence Merit, the Dao Merit. Study them carefully. This is the supreme initiation and empowerment.
            </p>
            <p>
              It is the fusion of all Three Jewels into one body. Understanding this Law, it unifies all lost paths for you: It is Buddha, it is Dharma, it is Sangha in one reality - in a post-illusory world of the highest event. This vision is only accessible to those with sufficient conditions.
            </p>

            <h3 id="section-5-5" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-5-5">
              5.5. Beyond the Three Trainings: Realizing Tam Vô
            </h3>
            <p>
              Once you have clarified this Law, there is no need to discuss the Three Trainings (Precepts, Meditation, Wisdom) further. Precepts? The supreme precept is this supramundane Law. Body? Sangha united in one Dharma Body - timeless and perfect. Mind? No longer a mind, for all is Thusness, completely Empty. This is the realization of <em>Tam Vô</em> ("Vô Vắng Vàng" - Emptiness, Silence, Brilliance).
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 id="section-6" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-6">
            6. The Path of "Unraveling": Beyond Gamification
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              This system is designed as a mirror for reflection, not a race for medals or accumulation. All titles, certificates, and tokens belong to the world of form. This system encourages the journey of "Letting Go" and "Offering." All is by Mirror, not Medal.
            </p>

            <h3 id="section-6-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-6-1">
              6.1. The Unraveling System (NFT Badges)
            </h3>
            <p>
              <strong>Transformation Badges:</strong> Not for "grinding." Badges (NFTs) are the recognition of inner victories: overcoming anger, transforming suffering. They are awarded by the Sangha or AI after verifying genuine inner transformation (<em>chuyển hóa tập khí</em>).
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Badge of Transcending Anger:</strong> Awarded for overcoming 10 situations of being cursed without anger (verified by others)</li>
              <li><strong>Badge of Understanding the Master's Intent:</strong> Awarded for correctly answering 10 root Dharma questions without AI assistance</li>
              <li><strong>Badge of Acting without Dharma:</strong> Awarded for successfully guiding 5 friends to an insight (verified by them)</li>
              <li><strong>Badge of Four Immeasurables:</strong> Awarded for successfully helping, forgiving, and embracing all old, difficult relationships</li>
            </ul>
            <p>
              <strong>The Ultimate Badge: "No-Cultivation, No-Attainment" (<em>Vô Tu Vô Chứng</em>):</strong> The final Master's Certificate is the "Certificate of No Certificate."
            </p>
            <p>
              This is a core principle pointing directly at the truth: <strong>No-Cultivation (Vô Tu)</strong> refers to the fact that your true Self-Nature is already complete and perfect (Buddha-Nature). You do not need to strive, practice, or add anything to it. The path is not one of becoming, but of recognizing. <strong>No-Attainment (Vô Chứng)</strong> refers to the fact that there is no thing to gain or achieve. Enlightenment is not a future state you acquire. It is the immediate realization of what you have always been.
            </p>
            <p>
              Therefore, liberation comes from Letting Go (<em>Buông Bỏ</em>) of the ignorance and attachments that veil this inherent perfection, not from an effortful cultivation to attain a goal.
            </p>
            <p>
              A hidden "Dark Badge" is designed, tentatively named "<em>No-Cultivation, No-Attainment</em>." Each time a user chooses to hide, delete, or disable one of their Transformation Badges (an achievement), the system adds one point to this hidden badge.
            </p>
            <p>
              <strong>The Ultimate Minting Act:</strong> When a user, with sufficient conditions and wisdom, realizes all achievements are temporary means and manually destroys all of their Transformation Badges, the system automatically mints one special, final NFT: "No-Cultivation, No-Attainment".
            </p>
            <p>
              <strong>The Nameless Leaderboard:</strong> This NFT enrolls the user on the "Nameless Leaderboard," which honors those who have let go of being honored. This final act is "Letting Go of All," returning to Non-Abiding (<em>Vô Trụ</em>).
            </p>
            <p className="italic text-muted-foreground">
              All is by Mirror, not Medal.
            </p>

            <h3 id="section-6-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-6-2">
              6.2. The Merit Economy: Incentivizing True Practice
            </h3>
            <p>
              <strong>Beyond Likes and Shares:</strong> The token allocation mechanism explicitly rewards inner cultivation:
            </p>
            <p>
              <strong>Quality over Quantity - Mindful Metrics:</strong> In the Awakening Network, a "Like" granted from a mind that is truly appreciative and present is worth a hundred from a mechanical mind. A "Share" with the sincere intention of helping others is worth a thousand from a showy mind. The platform will recognize interactions that arise from <em>Chánh Niệm</em> (Right Mindfulness).
            </p>
            <p>
              <strong>Rewarding Inner Work:</strong> Features track and reward:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>"Letting Go Challenges":</strong> Instead of "Grinding Challenges." Reward users who "choose not to continue arguing" and opt for "peaceful silence" or "voluntarily relinquish" a position of power. These actions, though they may not get social recognition, are what truly generate deep and perfect Intrinsic Merit</li>
              <li><strong>"Self-Reflection Journal":</strong> The user records moments when they recognize and overcome a habit or delusion</li>
              <li><strong>"Thank You - Forgiveness Letter":</strong> Allows users to send letters of gratitude, apology, or forgiveness. Each letter sent/forgiven is acknowledged as Merit</li>
              <li><strong>"Wakefulness Timer":</strong> Reward users for hours spent away from social media and present in real life, or hours spent in a state of 24/24 Mindfulness</li>
              <li><strong>"Deep Listening Practice":</strong> Create interactive listening rooms where users practice deeply hearing others' stories without judgment. Merit is not recorded for talking, but for truly listening and understanding</li>
            </ul>
            <p>
              Record the number of times a user "voluntarily relinquishes" a position/power/benefit in a group for the greater good. Acknowledge the number of times a user "finds an answer to their own question" after dialoguing with the AI.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 id="section-7" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-7">
            7. Sustainability Through Shared Merit: An Ethical Revenue Model & Sacred Economics
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              To ensure longevity and independence, the ecosystem operates on a transparent, merit-aligned model. The platform is an engine of shared merit. All accounts, flows, and the impact of merit are transparently published.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li><strong>Universal Access:</strong> Core features and basic access remain free for all beings</li>
              <li><strong>Optional Subscriptions:</strong> Affordable tiers offer expanded access (e.g., deeper AI interactions, larger storage for personal notes, advanced analytics on one's practice patterns)</li>
              <li><strong>Institutional Support:</strong> Modest fees for Sangha/Monastery white-label deployments, covering customization and support</li>
              <li><strong>Integrated Dana (Giving):</strong> Voluntary donations for specific projects or general platform support, managed through the Arms of Compassion pillar with full transparency</li>
              <li><strong>Shared Merit Principle:</strong> A fixed, publicly declared percentage of all revenue (subscriptions, fees, unallocated donations) is automatically directed towards funding Dharma activities (supporting Sanghas, humanitarian projects), ensuring the platform's operation itself becomes an act of collective merit generation. All financials are publicly auditable</li>
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 id="section-8" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-8">
            8. The Roadmap to the End of the Kalpa
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <p>
              Three gates. The process is phased. This roadmap is a mirror of the Law: birth, flourishing, and return (dissolution).
            </p>

            <h3 id="section-8-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-8-1">
              2024-2025: Foundation & Seeding
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li>Launch core platform: AI Assistants (Tâm An, Giác Ngộ), Social Feed, User Profiles</li>
              <li>Establish initial partnerships with select Sanghas and spiritual teachers</li>
              <li>Implement basic merit-recording mechanisms (tracking posts, comments, basic interactions)</li>
              <li>Refine AI based on authentic teachings and user interactions</li>
            </ul>

            <h3 id="section-8-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-8-2">
              2025-2026: Expansion & Integration
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li>Launch Dharma Radio/Library and Arms of Compassion pillars</li>
              <li>Introduce the Intrinsic Merit Token concept and begin pilot token economy/voting systems within partner communities</li>
              <li>Develop and deploy initial White-Label solutions for partner Sanghas</li>
              <li>Expand language support and internationalization</li>
            </ul>

            <h3 id="section-8-3" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-8-3">
              2026-2027: Decentralization & Maturation
            </h3>
            <ul className="list-disc pl-8 space-y-2 text-muted-foreground">
              <li>Initiate formal DAO structure and phased handover of governance functions to the community based on merit-token holdings</li>
              <li>Scale white-label deployments</li>
              <li>Begin onboarding aligned spiritual traditions beyond the initial partners</li>
              <li>Refine advanced merit-recognition algorithms (e.g., assessing mindfulness, letting go)</li>
            </ul>

            <h3 id="section-8-4" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-8-4">
              Post-2027: The Awakened Network
            </h3>
            <p>
              Continuous refinement towards ultimate transparency and alignment with the Dharma, until its purpose is fulfilled and it dissolves back into the Void.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 id="section-9" className="font-serif text-2xl font-bold text-foreground" data-testid="heading-section-9">
            9. Conclusion & Epilogue
          </h2>
          <div className="font-serif text-base leading-relaxed text-foreground space-y-4 text-justify">
            <h3 id="section-9-1" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-9-1">
              9.1. Conclusion: A Vessel for the Return Home
            </h3>
            <p>
              The Awakening Ecosystem is not designed for perpetual growth or endless expansion. It is a raft – to be used for crossing and then abandoned. As more beings awaken, the platform naturally dissolves. This is the supreme irony: the most successful spiritual technology is one that makes itself obsolete.
            </p>
            <p>
              We stand at the closing of a Kalpa, the Dharma-Ending Age where authentic teachings grow scarce and distractions multiply. This ecosystem offers one final vessel – not to escape the world, but to realize there was never anything to escape from. Not to accumulate merit, but to recognize the merit that was always present in one's Original Face.
            </p>

            <h3 id="section-9-2" className="font-serif text-xl font-semibold text-foreground pt-4" data-testid="heading-section-9-2">
              9.2. Epilogue: Do Not Miss The Raft
            </h3>
            <p className="italic border-l-4 border-primary pl-6 py-4 text-muted-foreground">
              "Do not miss the raft. The shore is not far. But if you cling to the raft after landing, you have not truly crossed."
            </p>
            <p>
              This platform is the Raft of the Sun. It appears at the darkest hour, offering passage to those with eyes to see. Use it wisely. Share it freely. But remember: the destination is not a place, and the raft is not the shore.
            </p>
            <p>
              When you have arrived Home, let the raft float away. It will find another traveler, in another time, in another dream.
            </p>
            <p className="font-serif text-base pt-8 text-center font-semibold">
              — Giác Ngộ Initiative, 2025
            </p>
            <p className="font-serif text-sm text-center text-muted-foreground italic">
              May all beings awaken. May all beings return Home.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
