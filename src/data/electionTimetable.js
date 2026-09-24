/*
  2027 General Election timetable.

  Transcribed from public/General-Election-Timetable-2027.docx. Every date and
  activity below comes from that document — none are inferred, and none were
  added to fill gaps.

  The source lists most activities under one of two tracks. They arrive run
  together in the DOCX ("Presidential and National AssemblySubmission of
  Forms…"), so `track` and `activity` are split apart here for display; the
  wording itself is unchanged.

  One row is cut off mid-sentence IN THE SOURCE DOCUMENT — the 29 Aug 2026
  presidential nomination-forms entry ends at "…13D and". Its governorship
  counterpart (26 Sep 2026) carries the full list, so the intended text is
  obvious, but it is left exactly as supplied rather than completed here.
  `truncatedInSource` marks it so nobody later mistakes it for a typo.
*/

export const TIMETABLE_META = {
  title: '2027 General Election Timetable',
  source: 'Independent National Electoral Commission (INEC)',
  fileUrl: '/General-Election-Timetable-2027.docx',
  fileName: 'General-Election-Timetable-2027.docx',
  fileType: 'DOCX',
  fileSize: '16 KB',
};

export const TRACKS = {
  general: 'All elections',
  presidential: 'Presidential & National Assembly',
  governorship: 'Governorship & State Assembly',
};

export const TIMETABLE = [
  { date: '11 Feb 2026', track: 'general', activity: 'Notice of Election' },
  { date: '1 – 21 Apr 2026', track: 'general', activity: "Submission of Political Parties' Register to the Commission" },
  { date: '23 Apr – 30 May 2026', track: 'general', activity: 'Conduct of Party Primaries and Resolution of Disputes' },
  { date: '27 Jun – 11 Jul 2026', track: 'presidential', activity: 'Submission of Forms EC9, EC9A, 9B and 9E on online nomination portal' },
  { date: '18 Jul – 8 Aug 2026', track: 'governorship', activity: 'Submission of Forms EC9, EC9A, 9B and 9E on online nomination portal' },
  { date: '1 Aug 2026', track: 'presidential', activity: 'Publication of Personal Particulars of Candidates (EC9) by the Commission' },
  { date: '19 Aug 2026', track: 'presidential', activity: 'Commencement of Campaign by Political Parties in Public' },
  { date: '22 Aug 2026', track: 'presidential', activity: 'Last day for withdrawal by candidate(s)/replacement of withdrawn candidate(s) by Political Parties' },
  { date: '29 Aug 2026', track: 'governorship', activity: 'Publication of Personal Particulars of Candidates (EC9) by the Commission' },
  { date: '29 Aug 2026', track: 'presidential', activity: 'Last day for submission of Nomination forms (EC13A, 13B, 13C, 13D and', truncatedInSource: true },
  { date: '9 Sep 2026', track: 'governorship', activity: 'Commencement of Campaign by Political Parties' },
  { date: '12 Sep 2026', track: 'presidential', activity: 'Publication of final list of nominated candidates by the Commission' },
  { date: '19 Sep 2026', track: 'governorship', activity: 'Last day for withdrawal by candidate(s)/replacement of withdrawn candidate(s) by Political Parties' },
  { date: '26 Sep 2026', track: 'governorship', activity: 'Last day for submission of Nomination forms (EC13A, 13B, 13C, 13D and 13E) by Political Parties' },
  { date: '10 Oct 2026', track: 'governorship', activity: 'Publication of final list of nominated candidates by the Commission' },
  { date: '10 Dec 2026', track: 'presidential', activity: 'Last day for submission of names of polling agents to the Electoral Officer of the Local Government Area by Political Parties' },
  { date: '15 Dec 2026', track: 'general', activity: 'Publication of the official register of voters by the Commission' },
  { date: '29 Dec 2026', track: 'general', activity: 'Publication of Notice of Poll by the Commission' },
  { date: '6 Jan 2027', track: 'governorship', activity: 'Last day for submission of names of polling agents to the Electoral Officer of the Local Government Area by Political Parties' },
  { date: '14 Jan 2027', track: 'presidential', activity: 'Last day of Campaign by political parties' },
  { date: '16 Jan 2027', track: 'presidential', activity: 'Date of Election', isPoll: true },
  { date: '4 Feb 2027', track: 'governorship', activity: 'Last day for campaigns by Political Parties' },
  { date: '6 Feb 2027', track: 'governorship', activity: 'Date of Election', isPoll: true },
];

/* The two polling days, pulled from the table rather than written twice. */
export const POLL_DATES = TIMETABLE.filter((e) => e.isPoll);
