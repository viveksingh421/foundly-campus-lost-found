/**
 * Sample Campus Data for Foundly
 * Includes 10 realistic campus lost & found reports with deliberate pairs:
 * - Pair 1: Hydro Flask Black Water Bottle (Lost item-01 vs Found item-02)
 * - Pair 2: Blue Spiral Notebook (Lost item-03 vs Found item-04)
 * - Pair 3: TI-84 Plus Calculator (Lost item-05 vs Found item-06)
 * - Plus diverse unpaired items: Student ID card, Anker charging cable, keys, backpack
 * All data is demo-only and clearly marked.
 */

export const SAMPLE_REPORTS = [
  {
    id: 'rep-01',
    type: 'lost', // 'lost' | 'found'
    title: 'Black Hydro Flask Water Bottle',
    category: 'bottles',
    color: 'Black',
    location: 'Main Library 2nd Floor (Quiet Study Room)',
    dateTime: '2026-10-15T14:30',
    description: '32oz wide-mouth insulated black flask. Has minor dent near bottom edge and matte finish.',
    privateDetails: 'Has a small scratch beneath the cap handle and sticker residue on the bottom base.',
    contactName: 'Alex R. (Student)',
    status: 'Potential Match', // 'Open' | 'Potential Match' | 'Claim Pending' | 'Returned' | 'Closed'
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-15T15:00:00Z',
    isSample: true
  },
  {
    id: 'rep-02',
    type: 'found',
    title: 'Black Metal Vacuum Flask',
    category: 'bottles',
    color: 'Black',
    location: 'Main Library 2nd Floor Carrel Desk',
    dateTime: '2026-10-15T17:15',
    description: 'Black insulated steel water bottle found left unattended on desk 214. Black cap with carry loop.',
    privateDetails: 'Small dent on bottom rim, faint glue residue on base where sticker was peeled off.',
    contactName: 'Campus Facilities Desk (Library)',
    status: 'Potential Match',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-15T17:30:00Z',
    isSample: true
  },
  {
    id: 'rep-03',
    type: 'lost',
    title: 'Blue Spiral Notebook (Organic Chemistry)',
    category: 'books',
    color: 'Blue',
    location: 'Science Complex Hall B',
    dateTime: '2026-10-16T11:00',
    description: 'Standard 3-subject Five Star blue notebook filled with handwritten reaction mechanisms.',
    privateDetails: 'First inner page has "CHEM 204 - Sec 3" written in green gel pen in top-right corner.',
    contactName: 'Priya K. (Undergraduate)',
    status: 'Potential Match',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-16T11:45:00Z',
    isSample: true
  },
  {
    id: 'rep-04',
    type: 'found',
    title: 'Blue Five Star Subject Notebook',
    category: 'books',
    color: 'Blue',
    location: 'Science Complex Common Atrium',
    dateTime: '2026-10-16T13:20',
    description: 'Thick blue spiral wire-bound notebook found on the wooden bench outside Chem Lecture Hall.',
    privateDetails: 'Contains detailed chemistry diagrams and green ink course notation on page 1.',
    contactName: 'Lab Tech Jordan M.',
    status: 'Potential Match',
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-16T13:45:00Z',
    isSample: true
  },
  {
    id: 'rep-05',
    type: 'lost',
    title: 'TI-84 Plus CE Graphing Calculator',
    category: 'electronics',
    color: 'Black',
    location: 'Engineering Building Room 302',
    dateTime: '2026-10-14T16:00',
    description: 'Black Texas Instruments graphing calculator with rechargeable battery and sliding cover.',
    privateDetails: 'Battery compartment cover has a faint silver permanent marker dot inside.',
    contactName: 'David S. (Sophomore)',
    status: 'Open',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-14T16:40:00Z',
    isSample: true
  },
  {
    id: 'rep-06',
    type: 'found',
    title: 'TI Graphing Calculator with Slide Case',
    category: 'electronics',
    color: 'Black',
    location: 'Engineering Hall 1st Floor Study Lounge',
    dateTime: '2026-10-15T09:10',
    description: 'Texas Instruments calculator found plugged into wall charger outlet near couches.',
    privateDetails: 'Small silver metallic mark inside slider track.',
    contactName: 'Eng Lab Assistant',
    status: 'Open',
    imageUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-15T09:30:00Z',
    isSample: true
  },
  {
    id: 'rep-07',
    type: 'lost',
    title: 'Navy Blue Student ID Card Holder & Lanyard',
    category: 'cards',
    color: 'Blue',
    location: 'Campus Dining Hall / Student Union',
    dateTime: '2026-10-16T12:45',
    description: 'Clear plastic badge sleeve on a navy campus spirit lanyard with swivel lobster clasp.',
    privateDetails: 'Includes a laundromat card and folded $10 note tucked behind the student ID.',
    contactName: 'Maya T. (Freshman)',
    status: 'Open',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-16T13:10:00Z',
    isSample: true
  },
  {
    id: 'rep-08',
    type: 'found',
    title: 'Black Compact Folding Umbrella',
    category: 'accessories',
    color: 'Black',
    location: 'Humanities Hall Lecture Room 101',
    dateTime: '2026-10-13T15:30',
    description: 'Small portable umbrella with rubberized curved handle and auto-open button.',
    privateDetails: 'Tag on inner rib says "Windproof 8-rib" with tiny red thread tied around wrist strap.',
    contactName: 'Humanities Dept Admin',
    status: 'Claim Pending',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-13T16:00:00Z',
    isSample: true
  },
  {
    id: 'rep-09',
    type: 'found',
    title: 'White USB-C Fast Charging Cable (Braided)',
    category: 'electronics',
    color: 'White',
    location: 'Student Recreation Center Gym Lockers',
    dateTime: '2026-10-17T08:00',
    description: '6ft heavy duty nylon braided USB-C to USB-C charging cord.',
    privateDetails: 'Has a small piece of blue painters tape wrapped near one connector head.',
    contactName: 'Rec Center Front Desk',
    status: 'Open',
    imageUrl: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-17T08:30:00Z',
    isSample: true
  },
  {
    id: 'rep-10',
    type: 'found',
    title: 'Set of Brass Keys on Mountain Carabiner',
    category: 'keys',
    color: 'Silver',
    location: 'North Parking Lot Bike Racks',
    dateTime: '2026-10-14T18:00',
    description: '3 keys total (2 brass door keys, 1 small padlock key) clipped to an orange anodized carabiner.',
    privateDetails: 'Padlock key has "Master 40" engraved; small bottle opener attached.',
    contactName: 'Campus Security Office',
    status: 'Returned',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-14T18:15:00Z',
    isSample: true
  },
  {
    id: 'rep-11',
    type: 'lost',
    title: 'Grey Herschel Settlement Backpack',
    category: 'bags',
    color: 'Grey',
    location: 'Bus Stop #4 (University Ave)',
    dateTime: '2026-10-16T17:45',
    description: 'Heather grey backpack with exposed brass zippers and front pocket with key clip.',
    privateDetails: 'Inside zipper pouch contains a pack of peppermint gum and silver keys with blue lanyard.',
    contactName: 'Marcus L. (Senior)',
    status: 'Open',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-10-16T18:30:00Z',
    isSample: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'bottles', label: 'Water Bottles & Tumblers' },
  { id: 'electronics', label: 'Electronics & Chargers' },
  { id: 'books', label: 'Notebooks & Textbooks' },
  { id: 'cards', label: 'IDs, Cards & Wallets' },
  { id: 'keys', label: 'Keys & Keychains' },
  { id: 'bags', label: 'Backpacks & Bags' },
  { id: 'accessories', label: 'Accessories & Apparel' },
  { id: 'other', label: 'Other Items' }
];

export const LOCATIONS = [
  'All Locations',
  'Main Library 2nd Floor (Quiet Study Room)',
  'Main Library 2nd Floor Carrel Desk',
  'Science Complex Hall B',
  'Science Complex Common Atrium',
  'Engineering Building Room 302',
  'Engineering Hall 1st Floor Study Lounge',
  'Campus Dining Hall / Student Union',
  'Humanities Hall Lecture Room 101',
  'Student Recreation Center Gym Lockers',
  'North Parking Lot Bike Racks',
  'Bus Stop #4 (University Ave)',
  'Design & Architecture Studio',
  'Other / Campus Grounds'
];

export const STATUS_OPTIONS = [
  { id: 'Open', label: 'Open', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
  { id: 'Potential Match', label: 'Potential Match', color: 'bg-lime-dim text-midnight-950 border-lime-border' },
  { id: 'Claim Pending', label: 'Claim Pending', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
  { id: 'Returned', label: 'Returned', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
  { id: 'Closed', label: 'Closed', color: 'bg-midnight-500/10 text-midnight-600 border-midnight-200' }
];

export const SAMPLE_CLAIMS = [
  {
    id: 'claim-101',
    reportId: 'rep-08',
    itemTitle: 'Black Compact Folding Umbrella',
    claimantName: 'Sarah Jenkins (Student #8821)',
    claimantContact: 'sarah.j@campus.edu',
    evidenceDescription: 'The umbrella has a subtle red thread tied around the wrist strap from when my roommate marked it, and the inside rib has windproof lettering.',
    status: 'Pending Verification', // 'Pending Verification' | 'Approved' | 'Resolved / Returned' | 'Rejected'
    submittedAt: '2026-10-14T10:30:00Z',
    isSample: true
  }
];
