import hero from '../assets/promise/koh-hero.jpg';
import engineer from '../assets/promise/koh-engineer.jpg';
import president from '../assets/promise/koh-president.jpg';
import runningMate from '../assets/promise/running-mate.jpg';
import people from '../assets/promise/pillar-people.jpg';
import renewal from '../assets/promise/pillar-renewal.jpg';
import opportunity from '../assets/promise/pillar-opportunity.jpg';
import machinery from '../assets/promise/pillar-machinery.jpg';
import inclusion from '../assets/promise/pillar-inclusion.jpg';
import security from '../assets/promise/pillar-security.jpg';
import everyday from '../assets/promise/pillar-everyday.jpg';

/*
  The Lagos PROMISE (Ìlérí Èkó): Dr Kadri Obafemi Hamzat's 2027–2031
  manifesto, from the abridged "online" edition.

  Pledge wording is the manifesto's own; only obvious typesetting slips were
  fixed ("a fordable", stray ligatures, a doubled sentence). Each pledge keeps
  the manifesto's own label: a "commitment" is a firm promise, an "aspiration"
  a stated goal. Photos come from the same document.
*/

export const PROMISE_META = {
  title: 'The Lagos PROMISE',
  yoruba: 'Ìlérí Èkó',
  candidate: 'Dr Kadri Obafemi Hamzat',
  office: 'APC Candidate for Governor of Lagos State, 2027',
  subtitle: 'A 2027–2031 manifesto for building a state that lasts',
  slogan: 'Lagos… Forward Together',
  closing: 'This is our Lagos. Èkó ò ní bàjé.',
  start: 'The work begins on 29 May 2027.',
  fullUrl: 'https://koh2027.ng/',
  hero,
  president,
  engineer,
};

export const PREFACE =
  'I am an engineer. I have spent 20 years in the service of this state, and I have learned one thing above all others: a promise only has value when it is kept.';

export const MILESTONES = [
  { date: '27 April 2026', text: 'Endorsed by President Bola Ahmed Tinubu, GCFR' },
  { date: '21 May 2026', text: 'Won the APC governorship primary election' },
  { date: '29 May 2027', text: 'The work begins' },
];

export const ETHOS = [
  { name: 'Ìtẹ́ríba', meaning: 'Respect', text: 'That people are owed respect by the state, and not the other way around.' },
  // The PDF repeats the Ìtẹ́ríba line under Iṣẹ́ (a typesetting slip), so no text is shown for it.
  { name: 'Iṣẹ́', meaning: 'Work', text: '' },
  { name: 'Òtítọ́', meaning: 'Truth', text: 'That a government which will not publish the truth about its own performance has already decided to fail quietly.' },
];

export const PRINCIPLES = [
  { title: 'Measure before you promise', text: 'No commitment in this Promise stands without a baseline.' },
  { title: 'Instrument the city', text: 'Decisions will be made against data, or they will be deferred until the data exists.' },
  { title: 'Build systems, not projects', text: 'Fund the weakest link rather than the most visible one, and budget for lifecycle costs from day one.' },
  { title: 'Publish and be judged', text: 'Publish the targets, review them independently, and face the public in every IBILE division.' },
];

export const RUNNING_MATE = {
  name: 'Princess Damilola Sonayon James',
  role: 'Running mate',
  photo: runningMate,
  lines: [
    'A daughter of the royal house of Kweme Kingdom, Badagry West. In Egun, Sonayon means “tomorrow is bright”.',
    'An environmental, social and governance risk consultant, she ran the Light Up Project as Supervisory Councillor in Badagry West, bringing solar lighting to underserved communities.',
    'Deputy Woman Leader of the party in Lagos State, and the first person of Badagry extraction to be running mate to a governorship candidate.',
  ],
};

// Headline figures, each taken from a pledge below.
export const BIG_NUMBERS = [
  { value: '3,500', unit: 'MW', label: 'Grid power into homes by 2031, up from about 1,000' },
  { value: '6M', unit: '', label: 'More Lagosians with clean water every day' },
  { value: '1M', unit: '', label: 'Young people trained in technology skills in 4 years' },
  { value: '9,000', unit: '', label: 'Doctors in the public system, with 2 new General Hospitals' },
  { value: '95%', unit: '', label: 'Waste-collection coverage by 2030' },
  { value: '6,800', unit: 'km', label: 'Fibre network, up from 2,700 km' },
  { value: '11', unit: '', label: 'New electric ferries across the lagoon' },
  { value: '50%', unit: '', label: 'Of every state enterprise programme reserved for women-led businesses' },
];

const C = (title, text) => ({ title, text, type: 'commitment' });
const A = (title, text) => ({ title, text, type: 'aspiration' });

export const PILLARS = [
  {
    letter: 'P',
    name: 'People First',
    colour: '#008A44',
    photo: people,
    photoAlt: 'Dr Kadri Obafemi Hamzat with pupils at a technical workshop',
    chapters: [
      {
        code: 'P.1',
        title: 'Our Health, Our Dignity',
        quote: 'The dignity of a family rests on the health of its members, and no Lagosian should have to choose between care and ruin. We will not leave anyone behind.',
        pledges: [
          C('the Vulnerable', 'Drive malaria below 1 per cent toward pre-elimination, cut maternal mortality to 200 per 100,000, lift Non-Communicable Diseases (NCD) screening to 90 per cent, and open community mental health units in all 5 divisions by 2031.'),
          A('Care on Lagos Soil', 'Make every grade of care available in Lagos and reverse outbound medical tourism, through the Lagos Cancer Diagnosis Centre Ikeja (LAG-CDI), Medipark, Massey, Odan, Ketu-Ejirin and the wider specialist network.'),
          C('Systems', 'Reach 9,000 doctors, open 2 new General Hospitals, increase the flagship Primary Health Care Centres to 120 and the Maternal and Child Centres to 15 by 2031.'),
          C('the Healthcare Economy', 'Expand Ilera Eko coverage to 30 per cent, stand up the single-umbrella Health Systems Strengthening Window, and advance drug and vaccine sovereignty through LASEMDA and LASMIIZO.'),
          C('Expansion', 'Expand General Hospitals such as Alimosho, Odan and Ikorodu by up to 50 per cent by 2031 to cater for the rising population.'),
        ],
      },
      {
        code: 'P.2',
        title: 'The Lagos Mind',
        quote: 'The wealth of a state lies in the minds of its people. We will form, retain and renew the Lagos mind, so that every child learns and every worker can earn.',
        pledges: [
          C('Foundations', 'Deepen EKOEXCEL across all public primary schools and extend it into secondary education, so every Lagos child continues to read, write and reason in an organised and measurable way.'),
          A('Skills', 'Align technical and vocational training with the real economy and scale the AI Workforce Transformation Programme, so skills lead to work. Complete Meiran Technical College and build two more at Ibeju-Lekki and Badagry.'),
          A('the Lagos Mind', 'Strengthen the universities and the research base, and renew the teachers, trainers and lecturers who carry the system.'),
          A('Equity', 'Guarantee every child in every division a fair start, whatever their parents’ income, language or ability, significantly reducing out-of-school children.'),
        ],
      },
      {
        code: 'P.3',
        title: 'Safe Communities',
        quote: 'Safety is the first promise government makes to the citizen. I promise Lagosians that no one will be above the law and no one will be beneath the protection of the law.',
        pledges: [
          C('the Neighbourhood', 'Extend the Neighbourhood Safety Agency into every locality across the 20 local governments and 37 council development areas.'),
          C('Prevention', 'Scale CACCOV across schools, markets, motor parks and faith communities, so the strongest safety outcome is the crime that never happens.'),
          C('the Citizen Voice', 'Answer every safety complaint against a published standard of 24-hour acknowledgement, 7-day response and 30-day resolution.'),
          C('the Survivor', 'Expand the Sexual Assault Referral Centre network across every IBILE division, with survivor-centred care.'),
        ],
      },
      {
        code: 'P.4',
        title: 'Citizen Service',
        quote: 'Government must be felt at the gate of the citizen, carried into the daily life of Lagos. We will receive every Lagosian at the front door with a standard they can hold us to.',
        pledges: [
          C('the Front Door', 'Establish a satellite secretariat in Badagry, Ikorodu, Lagos Island and Epe, so residents are served in their own division rather than always travelling to Ikeja.'),
          C('the Citizen Voice', 'Acknowledge every citizen’s complaint within 24 hours, respond within 7 days, and resolve routine matters within 30 days through the Hamzat Compact Citizens’ Voice.'),
        ],
      },
    ],
  },
  {
    letter: 'R',
    name: 'Renewal',
    colour: '#0239AE',
    photo: renewal,
    photoAlt: 'Ikeja train station on the Lagos Red Line',
    chapters: [
      {
        code: 'R.1',
        title: 'Building Greater Lagos',
        quote: 'What we build with discipline lasts a generation, and an engineer measures a government by what stands and by what still works. We will build Lagos to last.',
        pledges: [
          C('Roads and Bridges', 'Rehabilitate the state road network and restore the bridge stock to a published standard, so Lagosians drive on roads that hold and cross bridges that endure.'),
          C('the Junction', 'Run a standing junction improvement programme, starting with ten named priority sites, and restore traffic signals statewide within the first year.'),
          C('Rail', 'Complete the Blue Line to Okokomaiko and link the Red Line and Blue Line at the National Theatre, Iganmu.'),
        ],
      },
      {
        code: 'R.2',
        title: 'IMOLE: The Lagos Power Promise',
        quote: 'Lagos cannot satisfy its power needs using generators. The next phase of this state is the one in which our power becomes our own, reliable and affordable in every home.',
        pledges: [
          A('Light', 'Increase grid power into households from 1,000 megawatts to about 3,500 by 2031.'),
          C('the Market', 'Stand up LASERC and a phased Lagos electricity market in 4 dated stages, in partnership with EKEDC and Ikeja Electric.'),
          C('the Renewable Pathway', 'Expand embedded generation in the industrial parks and carry the Solar Villages legacy into a statewide renewable and mini-grid pathway.'),
        ],
      },
      {
        code: 'R.3',
        title: 'Water',
        quote: 'The first measure of a public health system is whether the water that runs in the household is safe.',
        pledges: [
          C('the Tap', 'Expand treatment through Adiyan Phase II and rehabilitate the waterworks, so 6 million more Lagosians have clean water every day.'),
          C('the Regulator', 'Improve the Lagos Water Regulatory Commission to hold quality, tariff and service to account.'),
          C('the Water Tariff', 'Deliver water at a tariff the working household can afford, with district-level measurement, wider metering, faster leak detection, billing and complaint resolution.'),
        ],
      },
      {
        code: 'R.4',
        title: 'ILE MIMO: The Clean Ground Promise',
        quote: 'A bag of waste dumped into a drain can become a flood for an entire community. We will build the system that keeps Lagos clean, its drains clear and its households dry.',
        pledges: [
          C('Collection', 'Reach 95 per cent waste-collection coverage by 2030 through the 5-tier community system, with 4 transfer stations, 1 material recovery facility and 1 waste-to-energy facility.'),
          C('Clear Drains', 'Sustain the primary and secondary drainage programme and the Emergency Flood Abatement Gang (EFAG).'),
          C('Resilience', 'Protect the coast and low-lying communities through the Climate Action and Resilience Plan and early-warning cooperation, so households stay dry in the rains.'),
        ],
      },
    ],
  },
  {
    letter: 'O',
    name: 'Opportunity',
    colour: '#D97706',
    photo: opportunity,
    photoAlt: 'A Lagos fresh-food market hall',
    chapters: [
      {
        code: 'O.1',
        title: 'Enterprise, Industry and Trade',
        quote: 'Lagos is a city of enterprise, and its future depends on whether trade, industry, technology and investment grow together. We will widen opportunity, deepen production and make Lagos the leading business gateway in Africa.',
        pledges: [
          A('Investment', 'Grow annual investment from about ₦1 trillion toward ₦5 trillion by 2031 through the Invest in Lagos platform and its Deal Book.'),
          A('the Million', 'Scale formal MSMEs from about 120,000 toward 1 million by 2031, backed by the ₦10 billion LASMECO finance programme and a formalisation pipeline.'),
          C('the Parks', 'Deliver the 4 industrial parks at Epe, Badagry, Ikorodu and Ojo under the Industrial Policy 2025–2030.'),
          C('the Women-Led Floor', 'Reserve at least 50 per cent of the beneficiaries of every state enterprise programme, including the LASMECO window, for women-led businesses: published and audited, not asserted.'),
        ],
      },
      {
        code: 'O.2',
        title: 'Feeding Lagos',
        tagline: 'Growing, moving, storing and securing the food of the megacity.',
        pledges: [
          A('the Plate', 'Raise food self-sufficiency from about 5 per cent through local production, aquaculture and backward integration with the Nigerian agricultural base.'),
          C('the Cold Chain', 'Operationalise the 420-hectare Lagos Food Logistics Hub and the cold-chain network to cut post-harvest loss.'),
          C('Supply', 'Sustain the Produce-for-Lagos offtake guarantee and the Bulk Food Company, and bring mid-level fresh-food hubs to all 20 local governments.'),
        ],
      },
      {
        code: 'O.3',
        title: 'Maritime and the Blue Economy',
        quote: 'We will turn the coast and the lagoon into a working Blue Economy.',
        pledges: [
          C('the Waterways', 'Expand the LASWA ferry network and the OMI EKO partnership across the inland waterways.'),
          C('the Seafarer Pathway', 'Build a Lagos seafarer development pathway with the Maritime Academy and federal regulators, so Lagosians are trained, certified, given sea time and placed on international vessels.'),
          A('Value', 'Retain maritime, shipping and marine-services value in the Lagos economy, and deepen aquaculture and fisheries along the frontage and lagoon.'),
        ],
      },
      {
        code: 'O.4',
        title: 'The Lagos Stage and Culture',
        quote: 'Lagos is the cultural capital of Africa. We will protect her heritage, open her artistic ambition to the world, and turn culture into jobs and pride.',
        pledges: [
          C('the Stage', 'Build the Lagos Creative Economy Window and the infrastructure that grows Nollywood, music and fashion into a paying creative economy.'),
          C('Heritage', 'Protect the heritage inventory and run a structured Lagos Cultural Calendar around the Eyo and Gelede festivals.'),
          C('Tourism', 'Strengthen the Lagos Tourism Board and turn the cultural inheritance into a visitor economy.'),
        ],
      },
      {
        code: 'O.5',
        title: 'IMO: Future Ready Lagos',
        quote: 'We will make Lagos the producer, not only the consumer, of technology in Africa.',
        pledges: [
          C('Training', 'Train one million young people in 4 years in technology skills, matched with jobs.'),
          C('Connectivity', 'Take fibre from 2,700 km to 6,800 km at 1 Gbps and lower broadband costs, connecting schools, hospitals, hubs and underserved communities.'),
          A('the Builder', 'Make Lagos the best place in Africa to build a company, through LASRIC finance and a First-Buyer Government Innovation Policy.'),
          C('Sovereignty', 'Stand up the cyber-security centre and the data governance framework, retain public value locally, and make Lagos a producer of technology.'),
          C('the First Buyer', 'Direct 10 per cent of government procurement toward Lagos-developed innovations, so the state is the first customer of its own companies.'),
          C('the Innovation Agency', 'Make LASRIC a full innovation agency with matching grants and research commercialisation support, underpinned by a Lagos State Innovation Bill and a regulatory sandbox.'),
          C('What We Invent', 'Establish a Lagos Patent Bank, working to World Intellectual Property Organization frameworks, so intellectual property created in Lagos is owned in Lagos.'),
        ],
      },
      {
        code: 'O.6',
        title: 'The Lagos Treasury',
        quote: 'Every commitment in this Promise is a Naira commitment. We will raise the revenue with discipline, plan the spending with rigour, and manage the debt with restraint.',
        pledges: [
          C('Revenue', 'Grow Internally Generated Revenue by expanding the tax net without increasing taxes, keeping Lagos fiscally independent.'),
          C('Restraint', 'Issue sovereign instruments only within a sustainable debt-service threshold, with published use of proceeds.'),
          C('One Treasury', 'Keep every named instrument inside the consolidated Lagos Treasury, with one audit and one Citizens’ Observatory.'),
        ],
      },
    ],
  },
  {
    letter: 'M',
    name: 'Machinery of Government',
    colour: '#6D28D9',
    photo: machinery,
    photoAlt: 'Dr Kadri Obafemi Hamzat with members of the Lagos judiciary',
    chapters: [
      {
        code: 'M.1',
        title: 'ADEHUN: The Lagos Compact',
        quote: 'Government must be felt at the gate of the citizen, in the local council and the traditional institution as much as in Alausa.',
        pledges: [
          C('the Public Service', 'Deliver a merit-based, performance-driven, technology-enabled public-service reform.'),
          C('the Compact', 'Operationalise the 6-node Hamzat Compact across every chapter of the PROMISE.'),
          C('the Council', 'Deepen cooperative engagement with the Lagos State Council of Obas and Chiefs across every division.'),
          C('the Economic Council', 'Set up a Lagos State Economic Council where the Governor and EXCO members meet LG and LCDA chairmen regularly for synergy and peer review.'),
        ],
      },
      {
        code: 'M.2',
        title: 'Lagos Justice',
        quote: 'We will make Lagos justice fair, fast and within reach of every citizen.',
        pledges: [
          C('the Nearer Court', 'Raise the civil jurisdiction of the Magistrates’ Courts from ₦10 million to ₦50 million, expand the Magistrates’ Court estate across the divisions, and invest in the magistracy.'),
          C('Legal Access', 'Extend legal aid through the Office of the Public Defender and the Citizens’ Mediation Bureau across every division.'),
          C('Forensic Justice', 'Deepen the DNA Forensic Centre, Sexual Assault Referral Centre forensics and the cyber-forensic architecture.'),
        ],
      },
      {
        code: 'M.3',
        title: 'Digital Government',
        quote: 'We will make the Lagos government one connected, digital service for every citizen.',
        pledges: [
          C('the Benchmark', 'Hold Lagos digital government to the standard of the leading digital governments, with published delivery dashboards.'),
        ],
      },
      {
        code: 'M.4',
        title: 'The Hamzat Compact',
        quote: 'A promise unmeasured is a promise unkept. We will publish every commitment, audit every naira, hear every division, and give every citizen the standing to hold the government to its word.',
        pledges: [
          C('the Charter', 'Publish a Service Charter for every Ministry, Department and Agency, with service standards and response times.'),
        ],
      },
    ],
  },
  {
    letter: 'I',
    name: 'Inclusion',
    colour: '#DB2777',
    photo: inclusion,
    photoAlt: 'Pupils learning on laptops in a Lagos classroom',
    chapters: [
      {
        code: 'I.1',
        title: 'Obìnrin Èkó: Women and Gender',
        quote: 'The mother of Lagos is the maker of Lagos. We will protect the dignity of every Lagos woman, keep the door open for the girl-child, and secure her safety, her health and her economic agency.',
        pledges: [
          C('Safety', 'Deepen the Domestic and Sexual Violence Agency and the Family Support Units, so every Lagos woman is safe in the home, the workplace, the school and the street.'),
          C('Agency', 'Scale women-led enterprise through the ₦10 billion LASMECO window and the Employment Trust Fund, with a 50 per cent women-led floor.'),
        ],
      },
      {
        code: 'I.2',
        title: 'Ọmọ Èkó: Youth and Sport',
        quote: 'A megacity is the stage on which her young people perform. We will keep the door open for the youth, build the field for the athlete, and turn the demographic dividend into jobs, skill and pride.',
        pledges: [
          C('Work', 'Deliver youth employment and entrepreneurship through the Graduate Internship Placement Programme and the Lagos State Employment Trust Fund.'),
          C('the Field', 'Continue renewing the stadia and sports infrastructure while building grassroots sport across every division.'),
        ],
      },
      {
        code: 'I.3',
        title: 'Dignity, Universal Access and Elders',
        pledges: [
          C('Rights', 'Strengthen the Lagos State Office for Disability Affairs and the disability-rights legislative pipeline.'),
          C('Universal Design', 'Build universal design into every public asset and the transport system.'),
          C('the Elder', 'Deliver healthy-ageing programmes and ensure the delivery of pension and welfare services.'),
        ],
      },
      {
        code: 'I.4',
        title: 'The Protection of Every Lagos Child',
        quote: 'We will give the protection of children a single owner, a single front door and a standard the state can be held to.',
        pledges: [
          C('the Named Owner', 'Establish a dedicated legal entity with a named executive accountable for the protection of every child in Lagos.'),
          C('the Single Front Door', 'Stand up a co-located multi-agency safeguarding hub with one 24-hour intake and joint assessment within 48 hours.'),
          C('the Safe Institution', 'Audit every children’s care institution and school annually, and require criminal background checks.'),
        ],
      },
      {
        code: 'I.5',
        title: 'The Inclusive Informal Economy',
        quote: 'The trader who opens before dawn and closes after dark is not outside the Lagos economy. She is the Lagos economy. We will build a state that can see her, serve her and count her.',
        pledges: [
          C('Formalisation', 'Make formalising an advantage through the Business Formalisation Incentive and a one-stop registration route.'),
          C('the Fair Levy', 'Confront the levies that fall hardest on petty traders and micro-enterprises.'),
          C('the Modern Market', 'Modernise market infrastructure, sanitation and safety.'),
        ],
      },
      {
        code: 'I.6',
        title: 'One Lagos',
        quote: 'A Promise is delivered when the dividend reaches every Lagosian, in every IBILE division, of every gender, ability, language, faith and circumstance. We will build one Lagos in which no Lagosian is invisible.',
        pledges: [
          A('Pluralism', 'Protect the cultural, ethnic and faith pluralism that defines Lagos.'),
          C('the Margin', 'Reach the lagoon-side, riverine and informal-settlement communities with the full PROMISE.'),
          C('the Diaspora', 'Engage the Lagos diaspora as a state asset.'),
        ],
      },
    ],
  },
  {
    letter: 'S',
    name: 'Security & Resilience',
    colour: '#EB001F',
    photo: security,
    photoAlt: 'Lagos fire and rescue trucks on parade',
    chapters: [
      {
        code: 'S.1',
        title: 'The Safety of Lagos',
        quote: 'The first responsibility of a government is to ensure that her citizens can go about their daily activities without any fear.',
        pledges: [
          C('Community Safety', 'Deepen the Neighbourhood Safety Agency and treat the citizen as a co-architect of safety.'),
          C('Smart Policing', 'Deploy CCTV, drones, the central command and predictive policing as a force multiplier.'),
          C('the Officer', 'Deepen officer welfare, accommodation and training across the security and emergency services.'),
        ],
      },
      {
        code: 'S.2',
        title: 'Resilient Lagos',
        quote: 'We will defend the coast, adapt the city to a changing climate, and protect the Lagosian whose home floods every rainy season.',
        pledges: [
          C('the Coast', 'Deliver coastal defence and flood resilience along the 180 km frontage, protecting lagoon-side and low-lying communities.'),
          A('Clean Air', 'Improve air quality, expand green space, and plant trees aggressively across every division.'),
        ],
      },
      {
        code: 'S.3',
        title: 'Disaster Preparedness and Emergency Response',
        quote: 'We will build a Lagos that is ready for the storm surge, the building collapse, the chemical incident and the public-health emergency, before they arrive.',
        pledges: [
          C('Readiness', 'Enhance LASEMA and the Emergency Operations Centre as the 24/7 coordinating spine across all 9 hazard categories, from road accidents and fire to flood and building collapse.'),
          C('the First Responder', 'Strengthen the Fire and Rescue Service and the Ambulance Service, with pre-hospital emergency medicine.'),
          C('Early Warning', 'Build the multi-hazard early-warning, risk-mapping and hazard-register architecture.'),
          C('the Community', 'Deliver community preparedness and drills through the Lagos Emergency Preparedness Window.'),
        ],
      },
      {
        code: 'S.4',
        title: 'Smart Lagos',
        tagline: 'Not simply a digital city, but a smart city, where technology improves everyday life and every decision is guided by reliable evidence.',
        pledges: [],
      },
    ],
  },
  {
    letter: 'E',
    name: 'Everyday Dignity',
    colour: '#0E7490',
    photo: everyday,
    photoAlt: 'A Lagos Homes housing estate',
    chapters: [
      {
        code: 'E.1',
        title: 'Home for Lagos',
        quote: 'The dignity of a household begins with the dignity of a roof. We will make decent shelter affordable.',
        pledges: [
          C('the Roof', 'Deliver affordable housing through the Ministry of Housing, LSDPC and LBIC, with more Lagos Homes estates in the Badagry, Epe and Ikorodu divisions.'),
          C('the Mortgage', 'Deliver a home-ownership pathway at 10 per cent down and single-digit interest.'),
          C('the Plan', 'Deliver planned, climate-resilient growth under the Lagos State Master Plan to 2050.'),
          C('the Long-Resident', 'Protect long-resident communities in urban renewal through dignified consultation.'),
          C('the Fair Rent', 'Collaborate with private developers and LSDPC to increase housing stock at affordable prices.'),
        ],
      },
      {
        code: 'E.2',
        title: 'Lagos in Motion',
        quote: 'The megacity that moves is the megacity that lives. We will ensure that rail, ferry, road and Bus Rapid Transit operate as one connected system.',
        pledges: [
          A('Rail', 'Complete the Blue Line to Okokomaiko and connect it to the Red Line at the National Theatre, while pursuing funding for the Green Line with MOFI.'),
          C('the Bus', 'Expand and reform Bus Rapid Transit and the bus network across every division.'),
          C('the Ferry', 'Scale the OMI EKO ferry architecture by bringing 11 new electric ferries onto the lagoon, cutting pollution and the cost of water transport.'),
          C('One Ticket', 'Integrate rail, bus and ferry under one transport card, with accessible, road-safe mobility for all.'),
          C('Terminals', 'Build bus terminals across IBILE.'),
        ],
      },
      {
        code: 'E.3',
        title: 'Cost of Living',
        quote: 'The dignity of a household is measured at the household budget.',
        pledges: [
          A('Income', 'Lift the income of every working household through the MSME, entrepreneurship and cooperative pipelines.'),
          C('the Fair Tax', 'Harmonise the levies, taxes and fees paid by small businesses.'),
        ],
      },
    ],
  },
];

export const PLEDGE_COUNT = PILLARS.reduce(
  (n, p) => n + p.chapters.reduce((m, c) => m + c.pledges.length, 0),
  0,
);
export const CHAPTER_COUNT = PILLARS.reduce((n, p) => n + p.chapters.length, 0);
