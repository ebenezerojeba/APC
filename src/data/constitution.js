/*
  APC Constitution — content transcribed verbatim from the supplied document,
  public/APC-Constitution-Refined.docx.

  Rules this file follows, and that edits should keep following:

  - Provisions are reproduced word for word. Nothing is paraphrased,
    summarised, re-ordered or explained.
  - The nesting under "dynamic foreign policy" is preserved. Those four
    clauses are sub-clauses of one aim, not aims in their own right, and
    flattening them would misstate the document.
  - "Board of Trustees" appears under BOTH Party Organs and Other Bodies.
    That is what the document says; it is not a duplication error.
  - No version number or publication date is recorded, because the document
    states neither. Do not add them unless the source does.
*/

export const CONSTITUTION_META = {
  title: 'APC Constitution',
  description:
    'The constitutional framework of the All Progressives Congress — its aims and objectives, the obligations and rights of members, how the Party is organised, and the powers of its organs.',
  fileName: 'APC-Constitution-Refined.docx',
  fileUrl: '/APC-Constitution-Refined.docx',
  fileType: 'DOCX',
  fileSize: '17.8 KB',
  category: 'Official Party Document',
};

export const MOTTO = 'JUSTICE, PEACE AND UNITY';
export const SLOGAN = 'CHANGE';

/* The seven levels, given their own shape so the hierarchy can be drawn. */
export const PARTY_LEVELS = [
  'The Polling Unit',
  'The Ward',
  'The Local Government Area/Area Council',
  'The Senatorial District',
  'The State',
  'The Zone',
  'The National',
];

export const LEVELS_NOTE =
  'Each of these levels shall have a functional secretariat, except the Senatorial District and Polling Unit.';

export const SECTIONS = [
  {
    id: 'aims',
    number: '01',
    title: 'Aims and Objectives',
    lead: 'The aims and objectives of the Party shall be:',
    items: [
      'To promote and foster the unity, political stability and national consciousness of the people of Nigeria.',
      'To promote true federalism in the Federal Republic of Nigeria.',
      'To organize Chapters of the Party throughout the Federal Republic of Nigeria and beyond.',
      'To sponsor eligible candidates and canvass for votes for election into all elective offices in all tiers of government.',
      'To consciously pursue the implementation of the policies and programmes of the Party through its members appointed or elected into government, legislative houses and Boards throughout the Federation.',
      'To evolve, develop and promote an economic policy direction which guarantees public participation in, and where necessary, control of the major means of production, distribution and exchange.',
      'To protect the interest of farmers, workers, women, youth and persons with Disabilities in Nigeria and to faithfully strive to obtain for them the greatest possible return for their labour and full participation in the Nigerian enterprise.',
      "To promote and uphold the practice of internal democracy at all levels of the Party's organisation.",
      'To institutionalise, maintain and foster representative democracy, discipline and strict observance of rule of law in the Federation of Nigeria.',
      'To co-operate with any political or other organisations whose aims and objectives are in harmony with those of the Party and in conformity with the provisions of the Constitution of the Federal Republic of Nigeria.',
      'To actively condemn and resist all forms of oppression and exploitation of Nigerians.',
      'To promote social, political and economic freedoms and the general welfare of the people, with a view to permanently ensuring the establishment of peace, freedom, dignity of labour, equity, fraternity and happiness for all the people of Nigeria.',
      'To foster and defend the freedom of the Press and the fundamental freedoms and human rights of all Nigerians and the people of the world in general.',
      {
        text: 'To pursue a dynamic foreign policy aimed at:',
        children: [
          'Friendly and reciprocal relations with other countries.',
          'Good governance and democratic freedom for people of African descent and all other oppressed peoples throughout the world.',
          'Promotion of cultural values of black peoples all over the world; and',
          'Maintenance of international peace, harmony and cooperation.',
        ],
      },
      'To work consciously to promote the development of science, technology and local expertise.',
      'To do anything ancillary or conducive to the promotion of the aforementioned aims and objectives.',
    ],
  },
  {
    id: 'obligations',
    number: '02',
    title: 'Rules and Obligations',
    items: [
      "Members of the Party shall be obliged to affirm the Party's aims and objectives and conduct themselves in a manner that shall not bring the Party to public odium and disrepute. Members of the Party shall also observe the rules and regulations embedded in this Constitution.",
      'Members shall pay, as at and when due, all dues and levies as may be prescribed by any organ of the Party authorised so to do.',
      'Members shall participate in the activities of the Party, e.g. election campaigns, rallies, fund raising, functions, meetings, etc.',
    ],
  },
  {
    id: 'rights',
    number: '03',
    title: 'Rights and Privileges',
    items: [
      'Only fully registered and financially up-to-date members of the Party shall have the right to vote and be voted for into any of the elective positions, subject to the provisions made for such elections pursuant to this Constitution or other laws or regulations. Consequently, non-financial members shall not enjoy the above rights.',
      'Subject to (i) above, members shall enjoy the privileges of the Party and shall be entitled to be appointed to any committee of the Party on the approval of the Executive Committees of the Party at the various levels.',
      'Upon resignation or expulsion, a member shall be legally obliged to return to the Party all its properties in his or her possession.',
    ],
  },
  {
    id: 'organisation',
    number: '04',
    title: 'Party Organisation',
    lead: 'There shall be seven levels of Party organization, namely:',
    levels: PARTY_LEVELS,
    note: LEVELS_NOTE,
    items: [],
  },
  {
    id: 'organs',
    number: '05',
    title: 'Party Organs',
    lead: 'The Party shall have the following fourteen principal organs:',
    items: [
      'National Convention',
      'Board of Trustees',
      'National Executive Committee',
      'National Working Committee',
      'Zonal Committee',
      'State Congress',
      'State Executive Committee',
      'State Working Committee',
      'Senatorial District Committee',
      'Local Government Area/Area Council Congress',
      'The Local Government Area/Area Council Executive Committee',
      'The Ward Congress',
      'The Ward Executive Committee',
      'The Polling Unit Committee',
    ],
  },
  {
    id: 'other-bodies',
    number: '06',
    title: 'Other Bodies',
    lead: 'The Party shall have the following other bodies:',
    items: [
      'Board of Trustees',
      'National Caucus',
      'Zonal Caucus',
      'State Caucus',
      'Local Government Area/Area Council Caucus',
    ],
  },
  {
    id: 'powers',
    number: '07',
    title: 'Powers of Party Organs',
    lead:
      'The final authority of the Party shall rest with the National Convention, which shall have the powers to:',
    items: [
      'Ratify policies and programmes of the Party.',
      'Elect or remove National Officers of the Party.',
      'Elect the Presidential Candidate of the Party.',
      'Receive reports from the National Executive Committee and from any other Committee and/or organ of the Party, and take appropriate decisions on the reports and/or recommendations.',
      'Amend the Constitution of the Party from time to time as the need may arise.',
      'Delegate any of its powers to the Board of Trustees, National Executive Committee or to any other organ of the Party.',
      'Take any action as may be conducive to the promotion of the aims and objectives of the Party as laid down in this Constitution.',
      "Appoint External Auditors to audit the Party's accounts for its consideration.",
      'Exercise such other powers and authority as are vested in it by this Constitution.',
      'Ratify the minimum rate of annual subscription to be paid by Members and the proportion of income from subscriptions to be remitted to the National Office of the Party.',
    ],
  },
];
