/*
  2027 campaign data, typed in from three documents:

  1. "APC Campaign Rally Calendar v1.2" — APC Presidential Campaign Council.
  2. "KOH Executive Master Activity Plan" — the Lagos itinerary.
  3. Circular APC/PCC/DG/XXVI X/23 of 3 November 2026 — rally guidelines.

  The rally calendar's cover page disagrees with its own master list in a few
  places (19 rallies in November, 3 presidential visits in December, 78 days).
  The master list is treated as the source of truth and every total on the
  site is counted from it, so the figures can never drift from the rows.

  Dates are ISO strings and parsed as local dates (see toDate), never with
  new Date('2026-11-07'), which reads as UTC midnight and shows the previous
  day for anyone west of Greenwich.
*/

export const toDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const ZONES = {
  NW: { label: 'North-West', colour: '#22A35A' },
  NE: { label: 'North-East', colour: '#E08A1E' },
  NC: { label: 'North-Central', colour: '#2B8FD6' },
  SW: { label: 'South-West', colour: '#8B5CF6' },
  SE: { label: 'South-East', colour: '#E5484D' },
  SS: { label: 'South-South', colour: '#14B8A6' },
};

// All 37 rallies, in date order. `president` marks the twelve he attends.
export const RALLIES = [
  { date: '2026-10-24', city: 'Kaduna', state: 'Kaduna', zone: 'NW', president: true, note: 'Official flag-off' },
  { date: '2026-11-02', city: 'Calabar', state: 'Cross River', zone: 'SS' },
  { date: '2026-11-03', city: 'Gombe', state: 'Gombe', zone: 'NE' },
  { date: '2026-11-04', city: 'Lafia', state: 'Nasarawa', zone: 'NC' },
  { date: '2026-11-05', city: 'Ado-Ekiti', state: 'Ekiti', zone: 'SW' },
  { date: '2026-11-07', city: 'Port Harcourt', state: 'Rivers', zone: 'SS', president: true },
  { date: '2026-11-09', city: 'Abakaliki', state: 'Ebonyi', zone: 'SE' },
  { date: '2026-11-10', city: 'Dutse', state: 'Jigawa', zone: 'NW' },
  { date: '2026-11-11', city: 'Akure', state: 'Ondo', zone: 'SW' },
  { date: '2026-11-12', city: 'Benin City', state: 'Edo', zone: 'SS' },
  { date: '2026-11-14', city: 'Jos', state: 'Plateau', zone: 'NC', president: true },
  { date: '2026-11-16', city: 'Damaturu', state: 'Yobe', zone: 'NE' },
  { date: '2026-11-17', city: 'Birnin Kebbi', state: 'Kebbi', zone: 'NW' },
  { date: '2026-11-18', city: 'Uyo', state: 'Akwa Ibom', zone: 'SS' },
  { date: '2026-11-19', city: 'Awka', state: 'Anambra', zone: 'SE' },
  { date: '2026-11-21', city: 'Ibadan', state: 'Oyo', zone: 'SW', president: true },
  { date: '2026-11-25', city: 'Maiduguri', state: 'Borno', zone: 'NE', president: true },
  { date: '2026-11-28', city: 'Enugu', state: 'Enugu', zone: 'SE', president: true },
  { date: '2026-11-30', city: 'Makurdi', state: 'Benue', zone: 'NC' },
  { date: '2026-12-01', city: 'Bauchi', state: 'Bauchi', zone: 'NE' },
  { date: '2026-12-02', city: 'Katsina', state: 'Katsina', zone: 'NW', president: true },
  { date: '2026-12-03', city: 'Abeokuta', state: 'Ogun', zone: 'SW' },
  { date: '2026-12-05', city: 'Sokoto', state: 'Sokoto', zone: 'NW', president: true },
  { date: '2026-12-07', city: 'Umuahia', state: 'Abia', zone: 'SE' },
  { date: '2026-12-08', city: 'Lokoja', state: 'Kogi', zone: 'NC' },
  { date: '2026-12-09', city: 'Osogbo', state: 'Osun', zone: 'SW' },
  { date: '2026-12-10', city: 'Ilorin', state: 'Kwara', zone: 'NC' },
  { date: '2026-12-12', city: 'Asaba', state: 'Delta', zone: 'SS', president: true },
  { date: '2026-12-14', city: 'Gusau', state: 'Zamfara', zone: 'NW' },
  { date: '2026-12-15', city: 'Yenagoa', state: 'Bayelsa', zone: 'SS' },
  { date: '2026-12-16', city: 'Minna', state: 'Niger', zone: 'NC' },
  { date: '2026-12-17', city: 'Kano', state: 'Kano', zone: 'NW', president: true },
  { date: '2026-12-19', city: 'Jalingo', state: 'Taraba', zone: 'NE' },
  { date: '2026-12-21', city: 'Abuja', state: 'FCT', zone: 'NC' },
  { date: '2026-12-30', city: 'Owerri', state: 'Imo', zone: 'SE' },
  { date: '2027-01-04', city: 'Yola', state: 'Adamawa', zone: 'NE', president: true, note: 'Phase two opens' },
  { date: '2027-01-09', city: 'Lagos', state: 'Lagos', zone: 'SW', president: true, note: 'Major closing rally' },
].map((r, i) => ({ ...r, no: i + 1 }));

export const POLLS = [
  { date: '2027-01-16', label: 'Presidential & National Assembly Election', short: 'Presidential' },
  { date: '2027-02-06', label: 'Governorship & State Assembly Election', short: 'Governorship' },
];

/*
  The Lagos itinerary. `kind` drives the filter chips; `confirmed` maps the
  plan's Approved / Pending column (shown publicly as Confirmed / To be
  confirmed). The plan's "Mon 2 Nov — State Assignment" row has no programme
  or venue, so it is left out.
*/
export const KINDS = {
  rally: 'Rallies',
  townhall: 'Town halls',
  engagement: 'Engagements',
  poll: 'Election days',
};

const TH = (date, lga, district) => ({
  date,
  time: '11:00 AM',
  title: `Town Hall: ${lga} LGA`,
  venue: 'Venue to be announced',
  note: district,
  kind: 'townhall',
});

export const LAGOS_ITINERARY = [
  { date: '2026-11-03', time: '12:00 PM', title: 'Nigerian Society of Engineers (NSE), Lagos', venue: 'Oyebolu Engineering Resource Centre, beside Works Department, University of Lagos', note: 'Engineers and technical professionals', kind: 'engagement' },
  { date: '2026-11-03', time: '3:00 PM', title: 'Iyaloja Market', venue: 'Sunday Adigun House', kind: 'engagement' },
  { date: '2026-11-04', time: '10:00 AM', title: 'Special Duties: CDC / CDA', venue: 'GRA Campaign Office', kind: 'engagement' },
  { date: '2026-11-04', time: '12:30 PM', title: 'Investment Community Parley & Fundraiser with Aztran Global Investments Limited', venue: 'The Art Hotel, Oniru, Lagos', kind: 'engagement' },
  { date: '2026-11-04', time: '5:00 PM', title: 'Hamzat Omo Oba: Biopic', venue: 'Ikeja City Mall', kind: 'engagement' },
  { date: '2026-11-05', time: '10:00 AM', title: 'Ekiti State Rally', venue: 'Ado-Ekiti, Ekiti State', kind: 'rally', confirmed: true },
  { date: '2026-11-05', time: '11:00 AM', title: 'Women in Management, Business and Public Service', venue: 'Eko Hotels and Suites', kind: 'engagement' },
  { date: '2026-11-05', time: '6:00 PM', title: 'CANEX WKND (5–8 Nov)', venue: 'National Theatre, Iganmu', kind: 'engagement' },
  { date: '2026-11-06', time: '10:00 AM', title: 'Churches in Ajeromi-Ifelodun', venue: 'Ajeromi-Ifelodun', kind: 'engagement' },
  { date: '2026-11-06', time: '10:00 AM', title: 'Opening Ceremony, 40th Lagos International Trade Fair', venue: 'Banquet Hall, TBS', kind: 'engagement' },
  { date: '2026-11-07', time: '10:00 AM', title: 'Voluntary Youth Organisations Assembly', venue: 'Campus Mini Stadium, Lagos Island', note: 'Keynote speaker; National Youth Council of Nigeria', kind: 'engagement' },
  { date: '2026-11-07', time: '12:00 PM', title: 'Faith-Based Engagement (East)', venue: 'Babajide Sanwo-Olu Market, Ketu', kind: 'engagement' },
  { date: '2026-11-08', time: '6:00 PM', title: '2027 Elections Debate Consortium: Governorship Debate', venue: 'The Hub by IALA, House of His Glory, Plot 18 Providence Road, Maria, Lekki', kind: 'engagement' },

  TH('2026-11-09', 'Epe', 'Lagos East'),
  TH('2026-11-09', 'Ibeju-Lekki', 'Lagos East'),
  TH('2026-11-09', 'Apapa', 'Lagos Central'),
  TH('2026-11-09', 'Eti-Osa', 'Lagos Central'),
  TH('2026-11-09', 'Ikeja', 'Lagos West 1'),
  TH('2026-11-09', 'Agege', 'Lagos West 1'),
  TH('2026-11-09', 'Badagry', 'Lagos West 2'),
  TH('2026-11-09', 'Ojo', 'Lagos West 2'),
  { date: '2026-11-10', time: '10:00 AM', title: 'Lagos Lodge Commissioning', venue: 'Asokoro, Abuja', kind: 'engagement' },
  { date: '2026-11-11', time: '10:00 AM', title: 'Ondo State Rally', venue: 'Akure, Ondo State', kind: 'rally', confirmed: true },
  { date: '2026-11-12', time: '10:00 AM', title: 'Senatorial Rally: Lagos East', venue: 'Epe Playing Ground', kind: 'rally' },
  { date: '2026-11-14', time: '8:00 AM', title: 'Walk for Fitness: Public Service Week', venue: 'Adeyemi Bero Auditorium, Alausa, Ikeja', kind: 'engagement' },
  { date: '2026-11-15', time: '5:00 PM', title: 'Meeting with Fundraising Committee', venue: 'Venue to be announced', kind: 'engagement' },

  TH('2026-11-16', 'Ikorodu', 'Lagos East'),
  TH('2026-11-16', 'Kosofe', 'Lagos East'),
  TH('2026-11-16', 'Lagos Island', 'Lagos Central'),
  TH('2026-11-16', 'Lagos Mainland', 'Lagos Central'),
  TH('2026-11-16', 'Ifako-Ijaiye', 'Lagos West 1'),
  TH('2026-11-16', 'Alimosho', 'Lagos West 1'),
  TH('2026-11-16', 'Amuwo-Odofin', 'Lagos West 2'),
  TH('2026-11-16', 'Ajeromi-Ifelodun', 'Lagos West 2'),
  { date: '2026-11-17', time: '10:00 AM', title: 'Guest Speaker, 38th Convocation Lecture of Yaba College of Technology', venue: 'Yusuf Grillo Auditorium, Yaba College of Technology', kind: 'engagement' },
  { date: '2026-11-18', time: '6:00 PM', title: 'KOH-NECT: An Evening of Connection', venue: 'Zaza Lagos, Victoria Island', kind: 'engagement' },
  { date: '2026-11-18', time: 'TBC', title: 'Assembly of Awori Groups', venue: 'Awori House, Oregun', kind: 'engagement' },
  { date: '2026-11-19', time: '10:00 AM', title: 'Senatorial Rally: Lagos Central', venue: 'Teslim Balogun Stadium', kind: 'rally' },
  { date: '2026-11-20', time: '11:00 AM', title: 'FinTech Town Hall', venue: 'The George Hotel, Ikoyi', kind: 'townhall' },
  { date: '2026-11-20', time: 'TBC', title: 'Meeting with Body of Professionals', venue: 'Venue to be announced', kind: 'engagement' },
  { date: '2026-11-21', time: '10:00 AM', title: 'Oyo State Rally', venue: 'Ibadan, Oyo State', kind: 'rally', confirmed: true },
  { date: '2026-11-21', time: '11:00 AM', title: 'Keynote Speaker: Council of Chief Imams and Ulama', venue: 'Main Auditorium, University of Lagos', kind: 'engagement' },

  TH('2026-11-23', 'Somolu', 'Lagos East'),
  TH('2026-11-23', 'Surulere', 'Lagos Central'),
  TH('2026-11-23', 'Mushin', 'Lagos West 1'),
  TH('2026-11-23', 'Oshodi-Isolo', 'Lagos West 1'),
  { date: '2026-11-24', time: '9:00 AM', title: 'Building a Future-Ready Health Workforce', venue: 'Eko Hotel, Victoria Island', kind: 'engagement' },
  { date: '2026-11-26', time: '10:00 AM', title: 'BRF Group', venue: 'Venue to be announced', kind: 'engagement' },
  { date: '2026-11-27', time: '10:00 AM', title: 'Ayewa Music Group', venue: 'Victoria Event Centre, Assibiff Road, Alausa, Ikeja', kind: 'engagement' },
  { date: '2026-11-28', time: '10:00 AM', title: 'Senatorial Rally: Lagos West 1', venue: 'Sky Power', kind: 'rally' },

  { date: '2026-12-01', time: '11:00 AM', title: 'Lawyers Guild', venue: 'Providence Hotel, GRA, Ikeja', kind: 'engagement' },
  { date: '2026-12-01', time: '7:00 PM', title: 'LBBS Dinner', venue: 'Venue to be announced', kind: 'engagement' },
  { date: '2026-12-02', time: 'TBC', title: 'Formal Sector Summit', venue: 'Venue to be announced', note: 'Business leaders, professionals, entrepreneurs and organised private-sector groups', kind: 'engagement' },
  { date: '2026-12-03', time: '10:00 AM', title: 'Ogun State Rally', venue: 'Abeokuta, Ogun State', kind: 'rally', confirmed: true },
  { date: '2026-12-04', time: 'TBC', title: 'Women Summit', venue: 'Venue to be announced', note: 'Date: first week of December. High-level meeting with women in business and the professions', kind: 'engagement' },
  { date: '2026-12-09', time: '10:00 AM', title: 'Osun State Rally', venue: 'Osogbo, Osun State', kind: 'rally', confirmed: true },
  { date: '2026-12-12', time: '10:00 AM', title: 'Senatorial Rally: Lagos West 2', venue: 'Ijanikin Playground', kind: 'rally' },
  { date: '2026-12-17', time: '10:00 AM', title: 'Youth Rally', venue: 'Onikan Stadium', kind: 'rally' },

  { date: '2027-01-07', time: '10:00 AM', title: 'Oloja Day', venue: 'Agege', kind: 'engagement' },
  { date: '2027-01-09', time: '10:00 AM', title: 'Lagos State Rally', venue: 'Lagos State', note: 'Major closing rally, with the President', kind: 'rally', confirmed: true, highlight: true },
  { date: '2027-01-14', time: '10:00 AM', title: 'State Mega Rally', venue: 'Teslim Balogun Stadium', kind: 'rally' },
  { date: '2027-01-16', time: 'All day', title: 'Presidential Election', venue: 'Nationwide', kind: 'poll', highlight: true },
  { date: '2027-02-01', dateEnd: '2027-02-04', time: '10:00 AM', title: 'Door-to-Door Engagement', venue: 'Statewide', kind: 'engagement' },
  { date: '2027-02-06', time: 'All day', title: 'Governorship & State Assembly Election', venue: 'Lagos State', kind: 'poll', highlight: true },
];

export const CIRCULAR = {
  ref: 'APC/PCC/DG/XXVI X/23',
  date: '3 November 2026',
  title: 'Guidelines on Participation at Campaign Rallies',
  from: 'Senator Abdulaziz Yari Abubakar (Marafan Sokoto), Director-General, APC Presidential Campaign Council',
  image: '/campaign/pcc-rally-guidelines-circular.jpg',
  purpose:
    'Rallies exist to energise the APC base in the States and zones, and to carry the achievements of His Excellency, the President, to the electorate.',
  rules: [
    {
      who: 'Ministers & political appointees',
      rule: 'Attend only the rallies held in their home States, and focus on grassroots mobilisation across their polling units, wards and LGAs.',
    },
    {
      who: 'Members of the PCC',
      rule: 'Attend only home-State rallies, deliver their Directorate’s approved Work Plan, and mobilise at polling unit, ward and LGA level.',
    },
    {
      who: 'NWC members',
      rule: 'Concentrate on party duties and mobilisation in their own States and zones, and attend the rallies in their home States.',
      exception: 'Except the National Chairman, National Secretary, National Women’s Leader, National Youth Leader and National Organising Secretary.',
    },
    {
      who: 'Directorates without rally roles',
      rule: 'Stay focused on implementing their approved Work Plans and Budgets.',
    },
    {
      who: 'Our candidates',
      rule: 'The Council will raise the visibility of APC State Assembly, House of Representatives and Senatorial candidates at the rallies.',
    },
  ],
};

export const RALLY_CALENDAR_PDF = '/campaign/APC-Campaign-Rally-Calendar.pdf';
