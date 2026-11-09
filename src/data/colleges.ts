/**
 * ODISHA COMPREHENSIVE DEDUPLICATED COLLEGES DIRECTORY
 * 286 Institutions across all 30 districts of Odisha
 */

export interface OdishaCollegeItem {
  id: string;
  name: string;
  shortName: string;
  district: string;
  city: string;
  type: string;
  address: string;
  domains: string[];
  status?: string;
  source?: string;
  createdAt?: string;
}

export const ALL_ODISHA_COLLEGES: OdishaCollegeItem[] = [
  {
    "id": "clg-adarsha-college-of-engineering",
    "name": "Adarsha College of Engineering",
    "shortName": "ACE Angul",
    "district": "Angul",
    "city": "Saradhapur",
    "type": "ENGINEERING",
    "address": "Saradhapur, Angul - 759122",
    "domains": [
      "adarshacollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ajay-binay-institute-of-technolo",
    "name": "Ajay Binay Institute of Technology",
    "shortName": "ABIT Cuttack",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "ENGINEERING",
    "address": "CDA Sector 1, Cuttack - 753014",
    "domains": [
      "abit-edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-all-india-institute-of-medical-s",
    "name": "All India Institute of Medical Sciences Bhubaneswar",
    "shortName": "AIIMS Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "MEDICAL",
    "address": "Sijua, Patrapada, Bhubaneswar, Khordha - 751019",
    "domains": [
      "aiimsbhubaneswar.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-anusupa-degree-college",
    "name": "Anusupa Degree College",
    "shortName": "Anusupa Degree College",
    "district": "Cuttack",
    "city": "Ansupa",
    "type": "DEGREE",
    "address": "Saranda, Ansupa, Cuttack - 754032",
    "domains": [
      "anusupacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-aryan-institute-of-engineering-a",
    "name": "Aryan Institute of Engineering and Technology",
    "shortName": "AIET Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Arya Vihar, Barakuda, Khordha - 752050",
    "domains": [
      "aryan.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-asbm-university",
    "name": "ASBM University",
    "shortName": "ASBM University",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Shiksha Vihar, Bhola, Chandaka, Bhubaneswar - 754012",
    "domains": [
      "asbm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-aska-science-college",
    "name": "Aska Science College",
    "shortName": "Aska Science College",
    "district": "Ganjam",
    "city": "Aska",
    "type": "DEGREE",
    "address": "Aska, Ganjam - 761110",
    "domains": [
      "ascasciencecollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-athamallik-degree-college",
    "name": "Athamallik Degree College",
    "shortName": "Athamallik Degree College",
    "district": "Angul",
    "city": "Athamallik",
    "type": "DEGREE",
    "address": "Athamallik, Angul - 759125",
    "domains": [
      "athamallikcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-badriprasad-institute-of-technol",
    "name": "Badriprasad Institute of Technology",
    "shortName": "BIT Sambalpur",
    "district": "Sambalpur",
    "city": "Debaipali",
    "type": "ENGINEERING",
    "address": "Debaipali, Sason, Sambalpur - 768200",
    "domains": [
      "bpit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bahugram-degree-college",
    "name": "Bahugram Degree College",
    "shortName": "Bahugram Degree College",
    "district": "Cuttack",
    "city": "Bahugram",
    "type": "DEGREE",
    "address": "Bahugram, Cuttack - 754200",
    "domains": [
      "bahugramcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-baji-rout-memorial-college",
    "name": "Baji Rout Memorial College",
    "shortName": "BRM College Bhuban",
    "district": "Dhenkanal",
    "city": "Bhuban",
    "type": "DEGREE",
    "address": "Bhuban, Dhenkanal - 759017",
    "domains": [
      "brmcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-balaji-institute-of-technology-a",
    "name": "Balaji Institute of Technology and Science",
    "shortName": "BITS Gunupur",
    "district": "Rayagada",
    "city": "Gunupur",
    "type": "ENGINEERING",
    "address": "Gunupur, Rayagada - 765022",
    "domains": [
      "bitsgunupur.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-balasore-college",
    "name": "Balasore College",
    "shortName": "Balasore College",
    "district": "Balasore",
    "city": "Balasore",
    "type": "DEGREE",
    "address": "Balasore - 756001",
    "domains": [
      "balasorecollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-balasore-college-of-engineering-",
    "name": "Balasore College of Engineering and Technology",
    "shortName": "BCET Balasore",
    "district": "Balasore",
    "city": "Sergarh",
    "type": "ENGINEERING",
    "address": "Sergarh, Balasore - 756060",
    "domains": [
      "bcetbalasore.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-banki-autonomous-college",
    "name": "Banki Autonomous College",
    "shortName": "Banki Autonomous College",
    "district": "Cuttack",
    "city": "Banki",
    "type": "DEGREE",
    "address": "Banki, Cuttack - 754008",
    "domains": [
      "bankicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bapuji-college-chhendipada",
    "name": "Bapuji College, Chhendipada",
    "shortName": "Bapuji College",
    "district": "Angul",
    "city": "Chhendipada",
    "type": "DEGREE",
    "address": "Chhendipada, Angul - 759124",
    "domains": [
      "bapujicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-barrister-ranjit-mohanty-interna",
    "name": "Barrister Ranjit Mohanty International Institute of Technology",
    "shortName": "BRMIIT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gothapatna, Bhubaneswar, Khordha - 751003",
    "domains": [
      "brmiit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-berhampur-city-college",
    "name": "Berhampur City College",
    "shortName": "Berhampur City College",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "DEGREE",
    "address": "Ambapua, Berhampur, Ganjam - 760010",
    "domains": [
      "berhampurcitycollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhadrak-autonomous-college",
    "name": "Bhadrak Autonomous College",
    "shortName": "Bhadrak Autonomous College",
    "district": "Bhadrak",
    "city": "Bhadrak",
    "type": "DEGREE",
    "address": "Bhadrak - 756100",
    "domains": [
      "bhadrakcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhadrak-institute-of-engineering",
    "name": "Bhadrak Institute of Engineering and Technology",
    "shortName": "BIET Bhadrak",
    "district": "Bhadrak",
    "city": "Barapada",
    "type": "ENGINEERING",
    "address": "Barapada, Bhadrak - 756113",
    "domains": [
      "bietbhadrak.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhima-bhoi-medical-college-and-h",
    "name": "Bhima Bhoi Medical College and Hospital",
    "shortName": "BBMCH Balangir",
    "district": "Balangir",
    "city": "Balangir",
    "type": "MEDICAL",
    "address": "Balangir - 767001",
    "domains": [
      "bbmchbalangir.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhubaneswar-college-of-engineeri",
    "name": "Bhubaneswar College of Engineering",
    "shortName": "BCE Khajuria",
    "district": "Khordha",
    "city": "Khajuria",
    "type": "ENGINEERING",
    "address": "Khajuria, Khordha - 752050",
    "domains": [
      "bce.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhubaneswar-engineering-college",
    "name": "Bhubaneswar Engineering College",
    "shortName": "BEC Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "At-Paniora, NK Nagar, Gramadiha, Jatni, Khordha - 752050",
    "domains": [
      "becbbsr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhubaneswar-institute-of-industr",
    "name": "Bhubaneswar Institute of Industrial Technology",
    "shortName": "BIIT Janla",
    "district": "Khordha",
    "city": "Janla",
    "type": "ENGINEERING",
    "address": "Janla, Bhubaneswar, Khordha - 752054",
    "domains": [
      "biitbbsr.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-bhubaneswar-institute-of-technol",
    "name": "Bhubaneswar Institute of Technology",
    "shortName": "BIT Infovalley",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Infovalley, Janla, Bhubaneswar, Khordha - 752054",
    "domains": [
      "bit.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-biju-patnaik-institute-of-inform",
    "name": "Biju Patnaik Institute of Information Technology and Management Studies",
    "shortName": "BIITM Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "F/4, Chandaka Industrial Estate, Patia, Bhubaneswar - 751024",
    "domains": [
      "biitm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-biju-patnaik-institute-of-techno",
    "name": "Biju Patnaik Institute of Technology",
    "shortName": "BPIT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "LAW_MANAGEMENT",
    "address": "Bhubaneswar, Khordha - 751024",
    "domains": [
      "bpit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-binayak-acharya-degree-college",
    "name": "Binayak Acharya Degree College",
    "shortName": "Binayak Acharya College",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "DEGREE",
    "address": "Haridakhandi, Berhampur, Ganjam - 760002",
    "domains": [
      "binayakacharyacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-birendra-mitra-memorial-women-s-",
    "name": "Birendra Mitra Memorial Women's College",
    "shortName": "BMM Women's College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Thoria Sahi, Cuttack - 753001",
    "domains": [
      "bmmwc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-birla-global-university",
    "name": "Birla Global University",
    "shortName": "Birla Global University",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "IDCO Plot No. 2, Gothapatna, Bhubaneswar, Khordha - 751029",
    "domains": [
      "bgu.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-biswas-roy-science-college",
    "name": "Biswas Roy Science College",
    "shortName": "Biswas Roy Science College",
    "district": "Ganjam",
    "city": "Pattapur",
    "type": "DEGREE",
    "address": "Pattapur, Ganjam - 761013",
    "domains": [
      "brscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-black-diamond-college-of-enginee",
    "name": "Black Diamond College of Engineering and Technology",
    "shortName": "BDCET Jharsuguda",
    "district": "Jharsuguda",
    "city": "Jharsuguda",
    "type": "ENGINEERING",
    "address": "Jharsuguda - 768201",
    "domains": [
      "bdcet.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-boudh-panchayat-college",
    "name": "Boudh Panchayat College",
    "shortName": "Boudh Panchayat College",
    "district": "Boudh",
    "city": "Boudh",
    "type": "DEGREE",
    "address": "Boudh - 762014",
    "domains": [
      "boudhcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-brahman-jharilo-mahavidyalaya",
    "name": "Brahman Jharilo Mahavidyalaya",
    "shortName": "Brahman Jharilo College",
    "district": "Cuttack",
    "city": "Brahmanjharilo",
    "type": "DEGREE",
    "address": "Brahmanjharilo, Cuttack - 754018",
    "domains": [
      "bjmcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-buxi-jagabandhu-bidyadhar-autono",
    "name": "Buxi Jagabandhu Bidyadhar Autonomous College",
    "shortName": "B.J.B. Autonomous College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "BJB Nagar, Bhubaneswar, Khordha - 751014",
    "domains": [
      "bjbcollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-c-v-raman-global-university",
    "name": "C. V. Raman Global University",
    "shortName": "CV Raman Global Univ",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Bidyanagar, Janla, Bhubaneswar, Khordha - 752054",
    "domains": [
      "cgu-odisha.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-capital-engineering-college",
    "name": "Capital Engineering College",
    "shortName": "CEC Baramunda",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Baramunda, Bhubaneswar, Khordha - 751003",
    "domains": [
      "cec.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-central-institute-of-petrochemic",
    "name": "Central Institute of Petrochemicals Engineering and Technology",
    "shortName": "CIPET Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "B-25, CNI Complex, Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "cipet.gov.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-central-university-of-odisha",
    "name": "Central University of Odisha",
    "shortName": "CU Odisha Koraput",
    "district": "Koraput",
    "city": "Sunabeda",
    "type": "UNIVERSITY",
    "address": "Sunabeda, Koraput - 763004",
    "domains": [
      "cuo.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-centurion-university-of-technolo-1",
    "name": "Centurion University of Technology and Management, Jatni",
    "shortName": "CUTM Bhubaneswar",
    "district": "Khordha",
    "city": "Jatni",
    "type": "UNIVERSITY",
    "address": "Ramachandrapur, Jatni, Khordha - 752050",
    "domains": [
      "cutm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-centurion-university-of-technolo",
    "name": "Centurion University of Technology and Management, Paralakhemundi",
    "shortName": "CUTM Paralakhemundi",
    "district": "Gajapati",
    "city": "Paralakhemundi",
    "type": "UNIVERSITY",
    "address": "Alluri Nagar, R. Sitapur, Paralakhemundi, Gajapati - 761211",
    "domains": [
      "cutm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-chhatrapur-women-s-degree-colleg",
    "name": "Chhatrapur Women's Degree College",
    "shortName": "Chhatrapur Women's College",
    "district": "Ganjam",
    "city": "Chhatrapur",
    "type": "DEGREE",
    "address": "Chhatrapur, Ganjam - 761020",
    "domains": [
      "cwdcchhatrapur.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-chikiti-mahavidyalaya",
    "name": "Chikiti Mahavidyalaya",
    "shortName": "Chikiti Mahavidyalaya",
    "district": "Ganjam",
    "city": "Chikiti",
    "type": "DEGREE",
    "address": "Chikiti, Ganjam - 761010",
    "domains": [
      "chikiticollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-choudwar-college",
    "name": "Choudwar College",
    "shortName": "Choudwar College",
    "district": "Cuttack",
    "city": "Choudwar",
    "type": "DEGREE",
    "address": "Choudwar, Cuttack - 754025",
    "domains": [
      "choudwarcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-christ-college-cuttack",
    "name": "Christ College, Cuttack",
    "shortName": "Christ College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Christ College Road, Cuttack - 753001",
    "domains": [
      "christcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-college-of-engineering-bhubanesw",
    "name": "College of Engineering Bhubaneswar",
    "shortName": "CEB Patia",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Koustuv Technical Campus, Patia, Bhubaneswar - 751024",
    "domains": [
      "ceb.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-college-of-pharmaceutical-scienc",
    "name": "College of Pharmaceutical Sciences, Mohuda",
    "shortName": "CPS Mohuda Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "PHARMACY",
    "address": "Mohuda, Berhampur, Ganjam - 760002",
    "domains": [
      "cpsmohuda.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-college-of-pharmaceutical-scienc-1",
    "name": "College of Pharmaceutical Sciences, Puri",
    "shortName": "CPS Puri",
    "district": "Puri",
    "city": "Puri",
    "type": "PHARMACY",
    "address": "Puri - 752002",
    "domains": [
      "cpspuri.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-cuttack-college",
    "name": "Cuttack College",
    "shortName": "Cuttack College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Nayabazar, Cuttack - 753004",
    "domains": [
      "cuttackcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-d-a-v-autonomous-college-titilag",
    "name": "D.A.V. Autonomous College, Titilagarh",
    "shortName": "DAV Titilagarh",
    "district": "Balangir",
    "city": "Titilagarh",
    "type": "DEGREE",
    "address": "Titilagarh, Balangir - 767033",
    "domains": [
      "davtitilagarh.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-d-m-science-degree-college",
    "name": "D.M. Science Degree College",
    "shortName": "DM Science Degree College",
    "district": "Ganjam",
    "city": "Gallery",
    "type": "DEGREE",
    "address": "Gallery, Bhanjanagar, Ganjam - 761140",
    "domains": [
      "dmscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-dadhichi-college-of-pharmacy",
    "name": "Dadhichi College of Pharmacy",
    "shortName": "Dadhichi Pharmacy",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "PHARMACY",
    "address": "Vidya Vihar, Sundargram, Cuttack - 754002",
    "domains": [
      "dadhichipharmacy.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-deogarh-college",
    "name": "Deogarh College",
    "shortName": "Deogarh College",
    "district": "Deogarh",
    "city": "Deogarh",
    "type": "DEGREE",
    "address": "Purunagarh, Deogarh - 768119",
    "domains": [
      "deogarhcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-dharanidhar-medical-college-and-",
    "name": "Dharanidhar Medical College and Hospital",
    "shortName": "DDMCH Keonjhar",
    "district": "Keonjhar",
    "city": "Keonjhar",
    "type": "MEDICAL",
    "address": "Kabitra, Keonjhar - 758001",
    "domains": [
      "ddmchkeonjhar.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-dharanidhar-university",
    "name": "Dharanidhar University",
    "shortName": "Dharanidhar University",
    "district": "Keonjhar",
    "city": "Keonjhar",
    "type": "UNIVERSITY",
    "address": "Old Town, Keonjhar - 758001",
    "domains": [
      "dharanidharuniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-dhenkanal-autonomous-college",
    "name": "Dhenkanal Autonomous College",
    "shortName": "Dhenkanal Autonomous",
    "district": "Dhenkanal",
    "city": "Dhenkanal",
    "type": "DEGREE",
    "address": "Dhenkanal - 759001",
    "domains": [
      "dhenkanalcollege.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-driems-institute-of-health-scien",
    "name": "DRIEMS Institute of Health Sciences and Hospital",
    "shortName": "DRIEMS Health Sciences",
    "district": "Cuttack",
    "city": "Tangi",
    "type": "MEDICAL",
    "address": "Kairapari, Tangi, Cuttack - 754022",
    "domains": [
      "driemshospital.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-driems-university",
    "name": "DRIEMS University",
    "shortName": "DRIEMS University Cuttack",
    "district": "Cuttack",
    "city": "Tangi",
    "type": "UNIVERSITY",
    "address": "Tangi, Cuttack - 754022",
    "domains": [
      "driems.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-eastern-academy-of-science-and-t",
    "name": "Eastern Academy of Science and Technology",
    "shortName": "EAST Phulnakhara",
    "district": "Cuttack",
    "city": "Phulnakhara",
    "type": "ENGINEERING",
    "address": "Prachi Vihar, Phulnakhara, Cuttack - 754001",
    "domains": [
      "eastodisha.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-einstein-academy-of-technology-a",
    "name": "Einstein Academy of Technology and Management",
    "shortName": "EATM Bhubaneswar",
    "district": "Khordha",
    "city": "Baniatangi",
    "type": "ENGINEERING",
    "address": "Baniatangi, Bajapur, Khordha - 752060",
    "domains": [
      "eatm.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ekamra-college",
    "name": "Ekamra College",
    "shortName": "Ekamra College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Sundarpada, Bhubaneswar, Khordha - 751002",
    "domains": [
      "ekamracollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-emarti-devi-women-s-college",
    "name": "Emarti Devi Women's College",
    "shortName": "Emarti Devi College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Nayasarak, Cuttack - 753002",
    "domains": [
      "emartidevicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-fakir-mohan-autonomous-college",
    "name": "Fakir Mohan Autonomous College",
    "shortName": "FM Autonomous College",
    "district": "Balasore",
    "city": "Balasore",
    "type": "DEGREE",
    "address": "Azimabad, Balasore - 756001",
    "domains": [
      "fmacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-fakir-mohan-medical-college-and-",
    "name": "Fakir Mohan Medical College and Hospital",
    "shortName": "FMMCH Balasore",
    "district": "Balasore",
    "city": "Balasore",
    "type": "MEDICAL",
    "address": "Remuna, Balasore - 756019",
    "domains": [
      "blsmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gajapati-college-of-pharmacy",
    "name": "Gajapati College of Pharmacy",
    "shortName": "Gajapati Pharmacy",
    "district": "Gajapati",
    "city": "Paralakhemundi",
    "type": "PHARMACY",
    "address": "Paralakhemundi, Gajapati - 761200",
    "domains": [
      "gajapatipharmacy.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-academy-of-technology-and",
    "name": "Gandhi Academy of Technology and Engineering",
    "shortName": "GATE Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "ENGINEERING",
    "address": "Golanthara, Berhampur, Ganjam - 761008",
    "domains": [
      "gate.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-engineering-college",
    "name": "Gandhi Engineering College",
    "shortName": "GEC Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gandhi Vihar, Badaraghunathpur, Madanpur, Bhubaneswar - 752054",
    "domains": [
      "gec.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-for-technologic",
    "name": "Gandhi Institute for Technological Advancement",
    "shortName": "GITA Autonomous College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Badaraghunathpur, Janla, Bhubaneswar, Khordha - 752054",
    "domains": [
      "gita.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-of-advanced-com",
    "name": "Gandhi Institute of Advanced Computer and Research",
    "shortName": "GIACR Rayagada",
    "district": "Rayagada",
    "city": "Rayagada",
    "type": "ENGINEERING",
    "address": "Prajabati Kshetra, Rayagada - 765022",
    "domains": [
      "giacr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-of-education-an",
    "name": "Gandhi Institute of Education and Technology",
    "shortName": "GIET Baniatangi",
    "district": "Khordha",
    "city": "Baniatangi",
    "type": "ENGINEERING",
    "address": "Baniatangi, Khordha - 752060",
    "domains": [
      "gietbbsr.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-of-excellent-te",
    "name": "Gandhi Institute of Excellent Technocrats",
    "shortName": "GIET Technocrats",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gothapatna, Bhubaneswar, Khordha - 751003",
    "domains": [
      "gietbbsr.com"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-of-science-and-",
    "name": "Gandhi Institute of Science and Technology",
    "shortName": "GIST Rayagada",
    "district": "Rayagada",
    "city": "Rayagada",
    "type": "ENGINEERING",
    "address": "Kholliguda, Rayagada - 765017",
    "domains": [
      "gist.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gandhi-institute-of-technology-a",
    "name": "Gandhi Institute of Technology and Management",
    "shortName": "GITAM Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gangapada, Bhubaneswar, Khordha - 752054",
    "domains": [
      "gitam.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gangadhar-meher-university",
    "name": "Gangadhar Meher University",
    "shortName": "GM University",
    "district": "Sambalpur",
    "city": "Sambalpur",
    "type": "UNIVERSITY",
    "address": "Fathepada, Sambalpur - 768004",
    "domains": [
      "gmuniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ganjam-college",
    "name": "Ganjam College",
    "shortName": "Ganjam College",
    "district": "Ganjam",
    "city": "Ganjam",
    "type": "DEGREE",
    "address": "Ganjam - 761026",
    "domains": [
      "ganjamcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gayatri-college-of-engineering",
    "name": "Gayatri College of Engineering",
    "shortName": "GCE Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "ENGINEERING",
    "address": "Ambapua, Berhampur, Ganjam - 760010",
    "domains": [
      "gce.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gayatri-college-of-pharmacy",
    "name": "Gayatri College of Pharmacy",
    "shortName": "GCP Sambalpur",
    "district": "Sambalpur",
    "city": "Sambalpur",
    "type": "PHARMACY",
    "address": "Gayatri Vihar, Jamadarpali, Sambalpur - 768200",
    "domains": [
      "gcp.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ghanashyam-hemalata-institute-of",
    "name": "Ghanashyam Hemalata Institute of Technology and Management",
    "shortName": "GHITM Puri",
    "district": "Puri",
    "city": "Bhuan",
    "type": "ENGINEERING",
    "address": "Bhuan, Puri - 752002",
    "domains": [
      "ghitm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-giet-university",
    "name": "GIET University",
    "shortName": "GIET University Gunupur",
    "district": "Rayagada",
    "city": "Gunupur",
    "type": "UNIVERSITY",
    "address": "Gobriguda, Gunupur, Rayagada - 765022",
    "domains": [
      "giet.edu"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gift-autonomous-college",
    "name": "GIFT Autonomous College",
    "shortName": "GIFT Autonomous",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gramadiha, Gangapada, Bhubaneswar - 752054",
    "domains": [
      "gift.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gopabandhu-science-college",
    "name": "Gopabandhu Science College",
    "shortName": "Gopabandhu Science College",
    "district": "Cuttack",
    "city": "Athagarh",
    "type": "DEGREE",
    "address": "Athagarh, Cuttack - 754029",
    "domains": [
      "gscathagarh.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gopabandhu-women-s-degree-colleg",
    "name": "Gopabandhu Women's Degree College",
    "shortName": "Gopabandhu Women's College",
    "district": "Cuttack",
    "city": "Athagarh",
    "type": "DEGREE",
    "address": "Athagarh, Cuttack - 754029",
    "domains": [
      "gwdcathagarh.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gopal-krishna-college-of-enginee",
    "name": "Gopal Krishna College of Engineering and Technology",
    "shortName": "GKCET Jeypore",
    "district": "Koraput",
    "city": "Jeypore",
    "type": "ENGINEERING",
    "address": "Raniput, Jeypore, Koraput - 764005",
    "domains": [
      "gkcet.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gopalpur-college",
    "name": "Gopalpur College",
    "shortName": "Gopalpur College",
    "district": "Ganjam",
    "city": "Gopalpur",
    "type": "DEGREE",
    "address": "Gopalpur-on-sea, Ganjam - 761002",
    "domains": [
      "gopalpurcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gopalpur-degree-college",
    "name": "Gopalpur Degree College",
    "shortName": "Gopalpur Degree College",
    "district": "Balasore",
    "city": "Gopalpur",
    "type": "DEGREE",
    "address": "Gopalpur, Balasore - 756044",
    "domains": [
      "gdcbalasore.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-autonomous-college-an",
    "name": "Government Autonomous College, Angul",
    "shortName": "Govt Autonomous Angul",
    "district": "Angul",
    "city": "Angul",
    "type": "DEGREE",
    "address": "Hakimpada, Angul - 759122",
    "domains": [
      "angulcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-autonomous-college-ph",
    "name": "Government Autonomous College, Phulbani",
    "shortName": "Govt Autonomous Phulbani",
    "district": "Kandhamal",
    "city": "Phulbani",
    "type": "DEGREE",
    "address": "Phulbani, Kandhamal - 762001",
    "domains": [
      "gacphulbani.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-college-of-engineerin",
    "name": "Government College of Engineering, Kalahandi",
    "shortName": "GCE Kalahandi",
    "district": "Kalahandi",
    "city": "Bhawanipatna",
    "type": "ENGINEERING",
    "address": "Bandopala, Bhawanipatna, Kalahandi - 766002",
    "domains": [
      "gcekbpatna.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-college-of-engineerin-1",
    "name": "Government College of Engineering, Keonjhar",
    "shortName": "GCE Keonjhar",
    "district": "Keonjhar",
    "city": "Keonjhar",
    "type": "ENGINEERING",
    "address": "Jamunalia, Old Town, Keonjhar - 758002",
    "domains": [
      "gcekjr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-college-rourkela",
    "name": "Government College, Rourkela",
    "shortName": "Govt College Rourkela",
    "district": "Sundargarh",
    "city": "Rourkela",
    "type": "DEGREE",
    "address": "Panposh, Rourkela, Sundargarh - 769004",
    "domains": [
      "gcrkr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-degree-college-korapu",
    "name": "Government Degree College, Koraput",
    "shortName": "Govt Degree Koraput",
    "district": "Koraput",
    "city": "Koraput",
    "type": "DEGREE",
    "address": "Landiguda, Koraput - 764020",
    "domains": [
      "gdckoraput.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-degree-college-sundar",
    "name": "Government Degree College, Sundargarh",
    "shortName": "Govt Degree Sundargarh",
    "district": "Sundargarh",
    "city": "Sundargarh",
    "type": "DEGREE",
    "address": "Sundargarh - 770001",
    "domains": [
      "gdcsundargarh.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-medical-college-and-h-1",
    "name": "Government Medical College and Hospital, Bhawanipatna",
    "shortName": "GMC Kalahandi",
    "district": "Kalahandi",
    "city": "Bhawanipatna",
    "type": "MEDICAL",
    "address": "Bhawanipatna, Kalahandi - 766001",
    "domains": [
      "gmckalahandi.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-medical-college-and-h",
    "name": "Government Medical College and Hospital, Sundargarh",
    "shortName": "GMC Sundargarh",
    "district": "Sundargarh",
    "city": "Sundargarh",
    "type": "MEDICAL",
    "address": "Sundargarh - 770001",
    "domains": [
      "gmcsundargarh.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-women-s-college-samba",
    "name": "Government Women's College, Sambalpur",
    "shortName": "Govt Women's Sambalpur",
    "district": "Sambalpur",
    "city": "Sambalpur",
    "type": "DEGREE",
    "address": "Khetrajpur, Sambalpur - 768003",
    "domains": [
      "gwcsambalpur.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-women-s-degree-colleg",
    "name": "Government Women's Degree College, Baripada",
    "shortName": "Govt Women's Baripada",
    "district": "Mayurbhanj",
    "city": "Baripada",
    "type": "DEGREE",
    "address": "Baghra Road, Baripada, Mayurbhanj - 757001",
    "domains": [
      "gwcbaripada.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-women-s-degree-colleg-2",
    "name": "Government Women's Degree College, Jeypore",
    "shortName": "Govt Women's Jeypore",
    "district": "Koraput",
    "city": "Jeypore",
    "type": "DEGREE",
    "address": "Jeypore, Koraput - 764005",
    "domains": [
      "gwcjeypore.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-women-s-degree-colleg-3",
    "name": "Government Women's Degree College, Keonjhar",
    "shortName": "Govt Women's Keonjhar",
    "district": "Keonjhar",
    "city": "Keonjhar",
    "type": "DEGREE",
    "address": "Baniapat, Keonjhar - 758001",
    "domains": [
      "gwckeonjhar.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-government-women-s-degree-colleg-1",
    "name": "Government Women's Degree College, Puri",
    "shortName": "Govt Women's Puri",
    "district": "Puri",
    "city": "Puri",
    "type": "DEGREE",
    "address": "VIP Road, Puri - 752001",
    "domains": [
      "gwcpuri.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-gurukul-institute-of-technology",
    "name": "Gurukul Institute of Technology",
    "shortName": "GIT Chhatabar",
    "district": "Khordha",
    "city": "Chhatabar",
    "type": "ENGINEERING",
    "address": "Chhatabar, Bhubaneswar, Khordha - 751028",
    "domains": [
      "gurukul.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-hi-tech-college-of-pharmacy",
    "name": "Hi-Tech College of Pharmacy",
    "shortName": "Hi-Tech Pharmacy",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "PHARMACY",
    "address": "Pandara, Rasulgarh, Bhubaneswar - 751025",
    "domains": [
      "hi-techpharmacy.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-hi-tech-institute-of-technology",
    "name": "Hi-Tech Institute of Technology",
    "shortName": "HIT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Industrial Estate, Rasulgarh / Khordha - 751010",
    "domains": [
      "hit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-hi-tech-medical-college-and-hosp",
    "name": "Hi-Tech Medical College and Hospital, Bhubaneswar",
    "shortName": "Hi-Tech Medical BBS",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "MEDICAL",
    "address": "Pandara, Rasulgarh, Bhubaneswar, Khordha - 751025",
    "domains": [
      "hi-techmedical.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-hi-tech-medical-college-and-hosp-1",
    "name": "Hi-Tech Medical College and Hospital, Rourkela",
    "shortName": "Hi-Tech Medical RKL",
    "district": "Sundargarh",
    "city": "Rourkela",
    "type": "MEDICAL",
    "address": "Health Park, Rourkela, Sundargarh - 769004",
    "domains": [
      "hitechmedicalrkl.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-hirakud-college",
    "name": "Hirakud College",
    "shortName": "Hirakud College",
    "district": "Sambalpur",
    "city": "Hirakud",
    "type": "DEGREE",
    "address": "Hirakud, Sambalpur - 768016",
    "domains": [
      "hirakudcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-icfai-university-odisha",
    "name": "ICFAI University, Odisha",
    "shortName": "ICFAI University",
    "district": "Khordha",
    "city": "Jatni",
    "type": "UNIVERSITY",
    "address": "Taraboi, Jatni, Khordha - 752050",
    "domains": [
      "iuodisha.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indian-institute-of-technology-b",
    "name": "Indian Institute of Technology Bhubaneswar",
    "shortName": "IIT Bhubaneswar",
    "district": "Khordha",
    "city": "Jatni",
    "type": "ENGINEERING",
    "address": "Argul, Jatni, Khordha - 752050",
    "domains": [
      "iitbbs.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indira-gandhi-institute-of-pharm",
    "name": "Indira Gandhi Institute of Pharmaceutical Sciences",
    "shortName": "IGIPS Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "PHARMACY",
    "address": "Dharma Vihar, Khandagiri, Bhubaneswar - 751030",
    "domains": [
      "igips.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indira-gandhi-institute-of-techn",
    "name": "Indira Gandhi Institute of Technology",
    "shortName": "IGIT Sarang",
    "district": "Dhenkanal",
    "city": "Sarang",
    "type": "ENGINEERING",
    "address": "Sarang, Dhenkanal - 759146",
    "domains": [
      "igitsarang.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indira-gandhi-women-s-college",
    "name": "Indira Gandhi Women's College",
    "shortName": "IG Women's College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Shelter Chhak, Cuttack - 753008",
    "domains": [
      "igwc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indotech-college-of-engineering",
    "name": "Indotech College of Engineering",
    "shortName": "Indotech College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Nayapalli, Bhubaneswar, Khordha - 751012",
    "domains": [
      "indotech.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-indus-college-of-engineering",
    "name": "Indus College of Engineering",
    "shortName": "Indus College",
    "district": "Khordha",
    "city": "Barakuda",
    "type": "ENGINEERING",
    "address": "Barakuda, Jatni, Khordha - 752050",
    "domains": [
      "indus.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-institute-of-management-and-info",
    "name": "Institute of Management and Information Technology",
    "shortName": "IMIT Cuttack",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "LAW_MANAGEMENT",
    "address": "Gourabhaban, Cuttack - 753001",
    "domains": [
      "imit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-institute-of-medical-sciences-an",
    "name": "Institute of Medical Sciences and SUM Hospital",
    "shortName": "IMS & SUM Hospital",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "MEDICAL",
    "address": "Kalinga Nagar, Ghatikia, Bhubaneswar, Khordha - 751003",
    "domains": [
      "sumh.ac.in",
      "soa.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-institute-of-medical-sciences-an-1",
    "name": "Institute of Medical Sciences and SUM Hospital Campus 2",
    "shortName": "SUM Hospital Campus 2",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "MEDICAL",
    "address": "Phulnakhara / Bhubaneswar, Khordha - 752101",
    "domains": [
      "soa.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-institute-of-pharmacy-and-techno",
    "name": "Institute of Pharmacy and Technology",
    "shortName": "IPT Salipur",
    "district": "Cuttack",
    "city": "Salipur",
    "type": "PHARMACY",
    "address": "Salipur, Cuttack - 754202",
    "domains": [
      "iptsalipur.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-institute-of-technical-education",
    "name": "Institute of Technical Education and Research",
    "shortName": "ITER (SOA)",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Jagamohan Nagar, Jagamara, Bhubaneswar, Khordha - 751030",
    "domains": [
      "iter.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-international-institute-of-infor",
    "name": "International Institute of Information Technology",
    "shortName": "IIIT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gothapatna, Malipada, Bhubaneswar, Khordha - 751003",
    "domains": [
      "iiit-bh.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ispat-autonomous-college",
    "name": "Ispat Autonomous College",
    "shortName": "Ispat Autonomous Rourkela",
    "district": "Sundargarh",
    "city": "Rourkela",
    "type": "DEGREE",
    "address": "Sector 16, Rourkela, Sundargarh - 769003",
    "domains": [
      "ispatcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jagadguru-kripalu-university",
    "name": "Jagadguru Kripalu University",
    "shortName": "JKU Cuttack",
    "district": "Cuttack",
    "city": "Banara",
    "type": "UNIVERSITY",
    "address": "Banara, Cuttack - 754005",
    "domains": [
      "jku.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jamankira-college",
    "name": "Jamankira College",
    "shortName": "Jamankira College",
    "district": "Sambalpur",
    "city": "Jamankira",
    "type": "DEGREE",
    "address": "Jamankira, Sambalpur - 768107",
    "domains": [
      "jamankiracollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-janata-college-boinda",
    "name": "Janata College, Boinda",
    "shortName": "Janata College Boinda",
    "district": "Angul",
    "city": "Boinda",
    "type": "DEGREE",
    "address": "Boinda, Angul - 759127",
    "domains": [
      "janatacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jawaharlal-degree-college-patnag",
    "name": "Jawaharlal Degree College, Patnagarh",
    "shortName": "JLN College Patnagarh",
    "district": "Balangir",
    "city": "Patnagarh",
    "type": "DEGREE",
    "address": "Patnagarh, Balangir - 767025",
    "domains": [
      "jlncollegepatnagarh.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jawaharlal-nehru-college-kuanpal",
    "name": "Jawaharlal Nehru College, Kuanpal",
    "shortName": "JLN College Kuanpal",
    "district": "Cuttack",
    "city": "Kuanpal",
    "type": "DEGREE",
    "address": "Kuanpal, Cuttack - 754204",
    "domains": [
      "jlncollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jeypore-college-of-pharmacy",
    "name": "Jeypore College of Pharmacy",
    "shortName": "JCP Jeypore",
    "district": "Koraput",
    "city": "Jeypore",
    "type": "PHARMACY",
    "address": "Rondapalli, Jeypore, Koraput - 764002",
    "domains": [
      "jcp.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jhadeswar-engineering-college",
    "name": "Jhadeswar Engineering College",
    "shortName": "JEC Balasore",
    "district": "Balasore",
    "city": "Balasore",
    "type": "ENGINEERING",
    "address": "Chhengel, Sergarh, Balasore - 756060",
    "domains": [
      "jec.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-jupiter-degree-college",
    "name": "Jupiter Degree College",
    "shortName": "Jupiter Degree College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Gothapatna, Bhubaneswar, Khordha - 751003",
    "domains": [
      "jupiter.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kabi-samrat-upendra-bhanja-colle",
    "name": "Kabi Samrat Upendra Bhanja College",
    "shortName": "KSUB College",
    "district": "Ganjam",
    "city": "Bhanjanagar",
    "type": "DEGREE",
    "address": "Bhanjanagar, Ganjam - 761126",
    "domains": [
      "ksubcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kalam-institute-of-technology",
    "name": "Kalam Institute of Technology",
    "shortName": "KIT Berhampur",
    "district": "Ganjam",
    "city": "Govindapur",
    "type": "ENGINEERING",
    "address": "Govindapur, Berhampur, Ganjam - 761003",
    "domains": [
      "kit.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kalinga-college-of-commerce",
    "name": "Kalinga College of Commerce",
    "shortName": "Kalinga College Commerce",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Samantarapur, Bhubaneswar, Khordha - 751002",
    "domains": [
      "kccbbsr.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kalinga-institute-of-industrial-",
    "name": "Kalinga Institute of Industrial Technology",
    "shortName": "KIIT Deemed University",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "kiit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kalinga-institute-of-medical-sci",
    "name": "Kalinga Institute of Medical Sciences",
    "shortName": "KIMS (KIIT)",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "MEDICAL",
    "address": "KIIT Campus 5, Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "kims.kiit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kallinge-global-institute-of-tec",
    "name": "Kallinge Global Institute of Technology",
    "shortName": "KGIT Jajpur",
    "district": "Jajpur",
    "city": "Tarapur",
    "type": "ENGINEERING",
    "address": "Tarapur, Jajpur - 755019",
    "domains": [
      "kgit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kamakhyanagar-college",
    "name": "Kamakhyanagar College",
    "shortName": "Kamakhyanagar College",
    "district": "Dhenkanal",
    "city": "Kamakhyanagar",
    "type": "DEGREE",
    "address": "Kamakhyanagar, Dhenkanal - 759018",
    "domains": [
      "kamakhyanagarcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kanak-manjari-institute-of-pharm",
    "name": "Kanak Manjari Institute of Pharmaceutical Sciences",
    "shortName": "KMIPS Rourkela",
    "district": "Sundargarh",
    "city": "Rourkela",
    "type": "PHARMACY",
    "address": "Chhend Colony, Rourkela, Sundargarh - 769015",
    "domains": [
      "kmips.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kandarpur-college",
    "name": "Kandarpur College",
    "shortName": "Kandarpur College",
    "district": "Cuttack",
    "city": "Kandarpur",
    "type": "DEGREE",
    "address": "Kandarpur, Cuttack - 754100",
    "domains": [
      "kandarpurcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-karanjia-autonomous-college",
    "name": "Karanjia Autonomous College",
    "shortName": "Karanjia Autonomous College",
    "district": "Mayurbhanj",
    "city": "Karanjia",
    "type": "DEGREE",
    "address": "Karanjia, Mayurbhanj - 757037",
    "domains": [
      "karanjiacollege.com"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kendrapara-autonomous-college",
    "name": "Kendrapara Autonomous College",
    "shortName": "Kendrapara Autonomous",
    "district": "Kendrapara",
    "city": "Kendrapara",
    "type": "DEGREE",
    "address": "Kendrapara - 754211",
    "domains": [
      "kendraparacollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-keshpur-degree-college",
    "name": "Keshpur Degree College",
    "shortName": "Keshpur Degree College",
    "district": "Ganjam",
    "city": "Keshpur",
    "type": "DEGREE",
    "address": "Keshpur, Ganjam - 761029",
    "domains": [
      "keshpurcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-khallikote-unitary-university",
    "name": "Khallikote Unitary University",
    "shortName": "Khallikote Unitary Univ",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "UNIVERSITY",
    "address": "Gandhi Nagar, Berhampur, Ganjam - 760001",
    "domains": [
      "khallikoteuniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-khurda-autonomous-college",
    "name": "Khurda Autonomous College",
    "shortName": "Khurda Autonomous College",
    "district": "Khordha",
    "city": "Khordha",
    "type": "DEGREE",
    "address": "Palla, Khordha - 752055",
    "domains": [
      "khurdacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kiit-school-of-law",
    "name": "KIIT School of Law",
    "shortName": "KIIT Law School",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "LAW_MANAGEMENT",
    "address": "Campus 16, Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "kls.ac.in",
      "kiit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kishore-nagar-college",
    "name": "Kishore Nagar College",
    "shortName": "Kishore Nagar College",
    "district": "Cuttack",
    "city": "Kishorenagar",
    "type": "DEGREE",
    "address": "Kishorenagar, Cuttack - 754131",
    "domains": [
      "kishorenagarcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kmbb-college-of-engineering-and-",
    "name": "KMBB College of Engineering and Technology",
    "shortName": "KMBB College",
    "district": "Khordha",
    "city": "Daleiput",
    "type": "ENGINEERING",
    "address": "NH-5, Daleiput, Khordha - 752056",
    "domains": [
      "kmbb.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-konark-institute-of-science-and-",
    "name": "Konark Institute of Science and Technology",
    "shortName": "KIST Jatni",
    "district": "Khordha",
    "city": "Jatni",
    "type": "ENGINEERING",
    "address": "Post Box No. 21, Techno Park, Jatni, Khordha - 752050",
    "domains": [
      "kist.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-koustuv-college",
    "name": "Koustuv College",
    "shortName": "Koustuv College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "koustuv.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-krupajal-engineering-college",
    "name": "Krupajal Engineering College",
    "shortName": "KEC Kausalyaganga",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Prashanti Vihar, Kausalyaganga, Bhubaneswar - 751002",
    "domains": [
      "krupajal.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kruttika-institute-of-technical-",
    "name": "Kruttika Institute of Technical Education",
    "shortName": "KITE Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Ghangapatna, Kantabada, Bhubaneswar - 752054",
    "domains": [
      "kite.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kshetra-mohan-science-degree-col",
    "name": "Kshetra Mohan Science Degree College",
    "shortName": "KM Science College",
    "district": "Ganjam",
    "city": "Narendrapur",
    "type": "DEGREE",
    "address": "Narendrapur, Ganjam - 760007",
    "domains": [
      "kmscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kuchinda-college",
    "name": "Kuchinda College",
    "shortName": "Kuchinda College",
    "district": "Sambalpur",
    "city": "Kuchinda",
    "type": "DEGREE",
    "address": "Kuchinda, Sambalpur - 768222",
    "domains": [
      "kuchindacollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kuntala-kumari-sabat-women-s-deg",
    "name": "Kuntala Kumari Sabat Women's Degree College",
    "shortName": "KKS Women's College",
    "district": "Balasore",
    "city": "Balasore",
    "type": "DEGREE",
    "address": "Motiganj, Balasore - 756003",
    "domains": [
      "kkswomenscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-kusum-devi-satasangha-women-s-de",
    "name": "Kusum Devi Satasangha Women's Degree College",
    "shortName": "KD Women's College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Nuapatana, Cuttack - 753001",
    "domains": [
      "kdsdegreewomenscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-laxmi-narayan-sahu-mahavidyalaya",
    "name": "Laxmi Narayan Sahu Mahavidyalaya",
    "shortName": "LNS Mahavidyalaya",
    "district": "Cuttack",
    "city": "Jagatpur",
    "type": "DEGREE",
    "address": "Jagatpur, Cuttack - 754021",
    "domains": [
      "lnsmcuttack.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-laxminarayan-college",
    "name": "Laxminarayan College",
    "shortName": "Laxminarayan College",
    "district": "Ganjam",
    "city": "Kodala",
    "type": "DEGREE",
    "address": "Kodala, Ganjam - 761032",
    "domains": [
      "lnckodala.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-loisingha-college",
    "name": "Loisingha College",
    "shortName": "Loisingha College",
    "district": "Balangir",
    "city": "Loisingha",
    "type": "DEGREE",
    "address": "Loisingha, Balangir - 767020",
    "domains": [
      "loisinghacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-madhusudan-law-university",
    "name": "Madhusudan Law University",
    "shortName": "MS Law University",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "LAW_MANAGEMENT",
    "address": "Station Road, Cuttack - 753003",
    "domains": [
      "mlucuttack.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-mahanadivihar-women-s-degree-col",
    "name": "Mahanadivihar Women's Degree College",
    "shortName": "Mahanadivihar Women's",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Mahanadivihar, Cuttack - 753004",
    "domains": [
      "mvwdc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-mahanga-women-s-degree-college",
    "name": "Mahanga Women's Degree College",
    "shortName": "Mahanga Women's College",
    "district": "Cuttack",
    "city": "Pallisahi",
    "type": "DEGREE",
    "address": "Pallisahi, Mahanga, Cuttack - 754206",
    "domains": [
      "mwdcpallisahi.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maharaja-institute-of-advanced-c",
    "name": "Maharaja Institute of Advanced Computing and Research",
    "shortName": "MIACR Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Gangapada, Bhubaneswar, Khordha - 752054",
    "domains": [
      "miacr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maharaja-jajati-keshari-medical-",
    "name": "Maharaja Jajati Keshari Medical College and Hospital",
    "shortName": "MJKMCH Jajpur",
    "district": "Jajpur",
    "city": "Jajpur",
    "type": "MEDICAL",
    "address": "Jajpur - 755001",
    "domains": [
      "mjkmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maharaja-krishna-chandra-gajapat",
    "name": "Maharaja Krishna Chandra Gajapati Medical College and Hospital",
    "shortName": "MKCG Medical College",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "MEDICAL",
    "address": "Medical College Road, Berhampur, Ganjam - 760004",
    "domains": [
      "mkcgmch.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maharaja-purna-chandra-autonomou",
    "name": "Maharaja Purna Chandra Autonomous College",
    "shortName": "MPC Autonomous Baripada",
    "district": "Mayurbhanj",
    "city": "Baripada",
    "type": "DEGREE",
    "address": "Takatpur, Baripada, Mayurbhanj - 757003",
    "domains": [
      "mpcautocollege.org.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maharishi-college-of-natural-law",
    "name": "Maharishi College of Natural Law",
    "shortName": "Maharishi College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Saheed Nagar, Bhubaneswar, Khordha - 751007",
    "domains": [
      "mcnlbbsr.org.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-mahavir-institute-of-engineering",
    "name": "Mahavir Institute of Engineering and Technology",
    "shortName": "MIET Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Paniora, Pitapalli Chhak, Bhubaneswar - 752054",
    "domains": [
      "miet.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-majhighariani-institute-of-techn",
    "name": "Majhighariani Institute of Technology and Science",
    "shortName": "MITS Rayagada",
    "district": "Rayagada",
    "city": "Rayagada",
    "type": "ENGINEERING",
    "address": "Sriram Vihar, Bhujabala, Rayagada - 765017",
    "domains": [
      "mits.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-malkangiri-model-degree-college",
    "name": "Malkangiri Model Degree College",
    "shortName": "Malkangiri Model College",
    "district": "Malkangiri",
    "city": "Malkangiri",
    "type": "DEGREE",
    "address": "Malkangiri - 764045",
    "domains": [
      "mdcmalkangiri.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-malyagiri-mahavidyalaya",
    "name": "Malyagiri Mahavidyalaya",
    "shortName": "Malyagiri Mahavidyalaya",
    "district": "Angul",
    "city": "Pallahara",
    "type": "DEGREE",
    "address": "Pallahara, Angul - 759119",
    "domains": [
      "malyagiricollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maniabandha-degree-college",
    "name": "Maniabandha Degree College",
    "shortName": "Maniabandha College",
    "district": "Cuttack",
    "city": "Maniabandha",
    "type": "DEGREE",
    "address": "Maniabandha, Badamba, Cuttack - 754035",
    "domains": [
      "maniabandhacollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-maruti-pharmacy-college",
    "name": "Maruti Pharmacy College",
    "shortName": "Maruti Pharmacy",
    "district": "Bargarh",
    "city": "Bargarh",
    "type": "PHARMACY",
    "address": "Bargarh - 768028",
    "domains": [
      "marutipharmacy.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-modern-engineering-and-managemen",
    "name": "Modern Engineering and Management Studies",
    "shortName": "MEMS Balasore",
    "district": "Balasore",
    "city": "Kuruda",
    "type": "ENGINEERING",
    "address": "NH-5, Kuruda, Balasore - 756056",
    "domains": [
      "mems.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-modern-institute-of-technology-a",
    "name": "Modern Institute of Technology and Management",
    "shortName": "MITM Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Kantabada, Bhubaneswar, Khordha - 752054",
    "domains": [
      "mitm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-mohan-subudhi-college",
    "name": "Mohan Subudhi College",
    "shortName": "Mohan Subudhi College",
    "district": "Cuttack",
    "city": "Baramba",
    "type": "DEGREE",
    "address": "Baramba, Cuttack - 754031",
    "domains": [
      "mscollegebaramba.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-n-c-autonomous-college",
    "name": "N.C. Autonomous College",
    "shortName": "NC Autonomous Jajpur",
    "district": "Jajpur",
    "city": "Jajpur",
    "type": "DEGREE",
    "address": "Jajpur Town, Jajpur - 755001",
    "domains": [
      "ncautocollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nabarangpur-model-degree-college",
    "name": "Nabarangpur Model Degree College",
    "shortName": "Nabarangpur Model College",
    "district": "Nabarangpur",
    "city": "Nabarangpur",
    "type": "DEGREE",
    "address": "Nabarangpur - 764059",
    "domains": [
      "nmdcnbr.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nalanda-institute-of-technology",
    "name": "Nalanda Institute of Technology",
    "shortName": "NIT Chandaka",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Chandaka, Bhubaneswar, Khordha - 754005",
    "domains": [
      "thenalanda.com"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-narasingh-choudhury-autonomous-c",
    "name": "Narasingh Choudhury Autonomous College",
    "shortName": "Narasingh Choudhury College",
    "district": "Jajpur",
    "city": "Jajpur",
    "type": "DEGREE",
    "address": "Jajpur - 755001",
    "domains": [
      "ncacjajpur.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-national-institute-of-technology",
    "name": "National Institute of Technology Rourkela",
    "shortName": "NIT Rourkela",
    "district": "Sundargarh",
    "city": "Rourkela",
    "type": "ENGINEERING",
    "address": "Sector 1, Rourkela, Sundargarh - 769008",
    "domains": [
      "nitrkl.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-national-law-university-odisha",
    "name": "National Law University Odisha",
    "shortName": "NLU Odisha",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "LAW_MANAGEMENT",
    "address": "Kathajodi Campus, CDA Sector 13, Naraj, Cuttack - 753015",
    "domains": [
      "nluo.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nayagarh-autonomous-college",
    "name": "Nayagarh Autonomous College",
    "shortName": "Nayagarh Autonomous",
    "district": "Nayagarh",
    "city": "Nayagarh",
    "type": "DEGREE",
    "address": "Nayagarh - 752069",
    "domains": [
      "nayagarhcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nayapalli-college",
    "name": "Nayapalli College",
    "shortName": "Nayapalli College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Nayapalli, Bhubaneswar, Khordha - 751012",
    "domains": [
      "nayapallicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-netaji-subash-chandra-bose-colle",
    "name": "Netaji Subash Chandra Bose College",
    "shortName": "NSCB College",
    "district": "Sambalpur",
    "city": "Sambalpur",
    "type": "DEGREE",
    "address": "Dhanupali, Sambalpur - 768005",
    "domains": [
      "nscbcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-netaji-subash-memorial-city-coll",
    "name": "Netaji Subash Memorial City College",
    "shortName": "NSM City College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Rajabagicha, Cuttack - 753009",
    "domains": [
      "nsmcitycollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-niali-college",
    "name": "Niali College",
    "shortName": "Niali College",
    "district": "Cuttack",
    "city": "Niali",
    "type": "DEGREE",
    "address": "Niali, Cuttack - 754004",
    "domains": [
      "nialicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nigam-institute-of-engineering-a",
    "name": "Nigam Institute of Engineering and Technology",
    "shortName": "NIET Baranga",
    "district": "Cuttack",
    "city": "Baranga",
    "type": "ENGINEERING",
    "address": "Baranga, Cuttack - 754005",
    "domains": [
      "niet.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-niis-institute-of-engineering-an",
    "name": "NIIS Institute of Engineering and Technology",
    "shortName": "NIIS Bhubaneswar",
    "district": "Khordha",
    "city": "Chhatabar",
    "type": "ENGINEERING",
    "address": "Chhatabar, Bhubaneswar, Khordha - 751028",
    "domains": [
      "niisgroup.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nilamani-mahavidyalaya",
    "name": "Nilamani Mahavidyalaya",
    "shortName": "Nilamani Mahavidyalaya",
    "district": "Balasore",
    "city": "Rupsa",
    "type": "DEGREE",
    "address": "Rupsa, Balasore - 756028",
    "domains": [
      "nilamanimahavidyalaya.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nimapara-autonomous-college",
    "name": "Nimapara Autonomous College",
    "shortName": "Nimapara Autonomous",
    "district": "Puri",
    "city": "Nimapara",
    "type": "DEGREE",
    "address": "Nimapara, Puri - 752106",
    "domains": [
      "nimaparacollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nist-university",
    "name": "NIST University",
    "shortName": "NIST University Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "UNIVERSITY",
    "address": "National Institute of Science & Tech, Pallur Hills, Berhampur - 761008",
    "domains": [
      "nist.edu"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nm-institute-of-engineering-and-",
    "name": "NM Institute of Engineering and Technology",
    "shortName": "NMIET Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Sijua, Patrapada, Bhubaneswar - 751019",
    "domains": [
      "nmiet.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-nuapada-model-degree-college",
    "name": "Nuapada Model Degree College",
    "shortName": "Nuapada Model College",
    "district": "Nuapada",
    "city": "Nuapada",
    "type": "DEGREE",
    "address": "Nuapada - 766105",
    "domains": [
      "mdcnuapada.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-odisha-state-open-university",
    "name": "Odisha State Open University",
    "shortName": "OSOU Sambalpur",
    "district": "Sambalpur",
    "city": "Sambalpur",
    "type": "UNIVERSITY",
    "address": "G.M. University Campus, Sambalpur - 768004",
    "domains": [
      "osou.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-odisha-university-of-agriculture",
    "name": "Odisha University of Agriculture and Technology",
    "shortName": "OUAT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Siripur, Unit 8, Bhubaneswar, Khordha - 751003",
    "domains": [
      "ouat.nic.in",
      "ouat.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-odisha-university-of-technology-",
    "name": "Odisha University of Technology and Research",
    "shortName": "OUTR Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Ghatikia, Mahalaxmi Vihar, Bhubaneswar, Khordha - 751029",
    "domains": [
      "outr.ac.in",
      "cet.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-orissa-college-of-pharmaceutical",
    "name": "Orissa College of Pharmaceutical Sciences",
    "shortName": "OCPS Dhenkanal",
    "district": "Dhenkanal",
    "city": "Dhenkanal",
    "type": "PHARMACY",
    "address": "Dhenkanal - 759001",
    "domains": [
      "ocps.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-oxford-college-of-engineering-an",
    "name": "Oxford College of Engineering and Management",
    "shortName": "Oxford College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Ramachandrapur, Bhubaneswar, Khordha - 752050",
    "domains": [
      "oxfordbbsr.com"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-pabitra-mohan-pradhan-medical-co",
    "name": "Pabitra Mohan Pradhan Medical College and Hospital",
    "shortName": "PMPMCH Talcher",
    "district": "Angul",
    "city": "Talcher",
    "type": "MEDICAL",
    "address": "Talcher, Angul - 759100",
    "domains": [
      "pmpmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-padmashree-krutartha-acharya-col",
    "name": "Padmashree Krutartha Acharya College of Engineering",
    "shortName": "PKACE Bargarh",
    "district": "Bargarh",
    "city": "Chakarkend",
    "type": "ENGINEERING",
    "address": "Chakarkend, Bargarh - 768028",
    "domains": [
      "pkace.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-panchayat-degree-college-bargarh",
    "name": "Panchayat Degree College, Bargarh",
    "shortName": "Panchayat College Bargarh",
    "district": "Bargarh",
    "city": "Bargarh",
    "type": "DEGREE",
    "address": "Bargarh - 768028",
    "domains": [
      "panchayatcollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-panchayat-samiti-college-belpada",
    "name": "Panchayat Samiti College, Belpada",
    "shortName": "PS College Belpada",
    "district": "Balangir",
    "city": "Belpada",
    "type": "DEGREE",
    "address": "Belpada, Balangir - 767026",
    "domains": [
      "pscollegebelpada.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-panchayat-samiti-college-saintal",
    "name": "Panchayat Samiti College, Saintala",
    "shortName": "PS College Saintala",
    "district": "Balangir",
    "city": "Saintala",
    "type": "DEGREE",
    "address": "Saintala, Balangir - 767032",
    "domains": [
      "pscsaintala.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-pandit-raghunath-murmu-medical-c",
    "name": "Pandit Raghunath Murmu Medical College and Hospital",
    "shortName": "PRMMCH Baripada",
    "district": "Mayurbhanj",
    "city": "Baripada",
    "type": "MEDICAL",
    "address": "Rangamatia, Baripada, Mayurbhanj - 757107",
    "domains": [
      "prmmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-parala-maharaja-engineering-coll",
    "name": "Parala Maharaja Engineering College",
    "shortName": "PMEC Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "ENGINEERING",
    "address": "Sitalapalli, Berhampur, Ganjam - 761003",
    "domains": [
      "pmec.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-pattamundai-college",
    "name": "Pattamundai College",
    "shortName": "Pattamundai College",
    "district": "Kendrapara",
    "city": "Pattamundai",
    "type": "DEGREE",
    "address": "Pattamundai, Kendrapara - 754215",
    "domains": [
      "pattamundaicollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-prananath-autonomous-college",
    "name": "Prananath Autonomous College",
    "shortName": "PN Autonomous Khordha",
    "district": "Khordha",
    "city": "Khordha",
    "type": "DEGREE",
    "address": "Khordha - 752055",
    "domains": [
      "pnautonomouscollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-raajdhani-engineering-college",
    "name": "Raajdhani Engineering College",
    "shortName": "REC Mancheswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Near Mancheswar Rly Station, Bhubaneswar - 751017",
    "domains": [
      "rec.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-radhakrishna-institute-of-engine",
    "name": "Radhakrishna Institute of Engineering and Technology",
    "shortName": "RITE Barunei",
    "district": "Khordha",
    "city": "Khordha",
    "type": "ENGINEERING",
    "address": "Barunei Hills, Khordha - 752057",
    "domains": [
      "riteindia.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-radhanath-rath-vigyan-degree-mah",
    "name": "Radhanath Rath Vigyan Degree Mahavidyalaya",
    "shortName": "RNRV Degree Mahavidyalaya",
    "district": "Cuttack",
    "city": "Khuntuni",
    "type": "DEGREE",
    "address": "Khuntuni, Athagarh, Cuttack - 754029",
    "domains": [
      "rnrvmkhuntuni.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-raghunath-jew-degree-college-bhu",
    "name": "Raghunath Jew Degree College, Bhubaneswar",
    "shortName": "Raghunath Jew College BBS",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Bhubaneswar, Khordha - 751002",
    "domains": [
      "rjc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-raghunath-jew-degree-college-cut",
    "name": "Raghunath Jew Degree College, Cuttack",
    "shortName": "Raghunath Jew College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Deulasahi, Cuttack - 753008",
    "domains": [
      "raghunathjewcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rairakhol-college",
    "name": "Rairakhol College",
    "shortName": "Rairakhol College",
    "district": "Sambalpur",
    "city": "Rairakhol",
    "type": "DEGREE",
    "address": "Rairakhol, Sambalpur - 768106",
    "domains": [
      "rairakholcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rairangpur-college",
    "name": "Rairangpur College",
    "shortName": "Rairangpur College",
    "district": "Mayurbhanj",
    "city": "Rairangpur",
    "type": "DEGREE",
    "address": "Rairangpur, Mayurbhanj - 757043",
    "domains": [
      "rairangpurcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-raja-madhusudan-dev-degree-colle",
    "name": "Raja Madhusudan Dev Degree College",
    "shortName": "RMD Degree College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "rmdcollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rajdhani-degree-college",
    "name": "Rajdhani Degree College",
    "shortName": "Rajdhani College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Baramunda, Bhubaneswar, Khordha - 751003",
    "domains": [
      "rajdhanicollege.org.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rajendra-university",
    "name": "Rajendra University",
    "shortName": "Rajendra University",
    "district": "Balangir",
    "city": "Balangir",
    "type": "UNIVERSITY",
    "address": "Balangir - 767002",
    "domains": [
      "rajendrauniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rama-devi-women-s-university",
    "name": "Rama Devi Women's University",
    "shortName": "Rama Devi Women's Univ",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Bhoinagar, Bhubaneswar, Khordha - 751022",
    "domains": [
      "rdwuniversity.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ramanarayan-degree-college",
    "name": "Ramanarayan Degree College",
    "shortName": "Ramanarayan Degree College",
    "district": "Ganjam",
    "city": "Dura",
    "type": "DEGREE",
    "address": "Dura, Berhampur, Ganjam - 760007",
    "domains": [
      "rndcdura.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rani-sukadei-mahila-degree-mahav",
    "name": "Rani Sukadei Mahila Degree Mahavidyalaya",
    "shortName": "Rani Sukadei Mahila College",
    "district": "Cuttack",
    "city": "Banki",
    "type": "DEGREE",
    "address": "Banki, Cuttack - 754008",
    "domains": [
      "rsmmbanki.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-ravenshaw-university",
    "name": "Ravenshaw University",
    "shortName": "Ravenshaw University",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "UNIVERSITY",
    "address": "College Square, Cuttack - 753003",
    "domains": [
      "ravenshawuniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rayagada-autonomous-college",
    "name": "Rayagada Autonomous College",
    "shortName": "Rayagada Autonomous",
    "district": "Rayagada",
    "city": "Rayagada",
    "type": "DEGREE",
    "address": "Rayagada - 765001",
    "domains": [
      "rayagadacollege.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rayagada-institute-of-technology",
    "name": "Rayagada Institute of Technology and Management",
    "shortName": "RITM Rayagada",
    "district": "Rayagada",
    "city": "Pitamahal",
    "type": "ENGINEERING",
    "address": "Pitamahal, Rayagada - 765002",
    "domains": [
      "ritm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-regional-college-of-management",
    "name": "Regional College of Management",
    "shortName": "RCM Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "LAW_MANAGEMENT",
    "address": "Plot No. GD-2/12 & 13, Chakakeisiani, Bhubaneswar - 751023",
    "domains": [
      "rcm.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-remuna-degree-college",
    "name": "Remuna Degree College",
    "shortName": "Remuna Degree College",
    "district": "Balasore",
    "city": "Remuna",
    "type": "DEGREE",
    "address": "Remuna, Balasore - 756019",
    "domains": [
      "remunacollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-roland-institute-of-pharmaceutic",
    "name": "Roland Institute of Pharmaceutical Sciences",
    "shortName": "RIPS Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "PHARMACY",
    "address": "Khodasingi, Berhampur, Ganjam - 760010",
    "domains": [
      "rips.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-roland-institute-of-technology",
    "name": "Roland Institute of Technology",
    "shortName": "RIT Berhampur",
    "district": "Ganjam",
    "city": "Golanthara",
    "type": "ENGINEERING",
    "address": "Surya Vihar, Golanthara, Berhampur - 761008",
    "domains": [
      "roland.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-royal-college-of-pharmacy-and-he",
    "name": "Royal College of Pharmacy and Health Sciences",
    "shortName": "RCPHS Berhampur",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "PHARMACY",
    "address": "Andhapasara Road, Berhampur, Ganjam - 760002",
    "domains": [
      "rcphs.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rural-institute-of-higher-studie",
    "name": "Rural Institute of Higher Studies",
    "shortName": "RIHS Bhogarai",
    "district": "Balasore",
    "city": "Bhogarai",
    "type": "DEGREE",
    "address": "Bhogarai, Balasore - 756038",
    "domains": [
      "rihsbhogarai.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-rushikulya-degree-college",
    "name": "Rushikulya Degree College",
    "shortName": "Rushikulya Degree College",
    "district": "Ganjam",
    "city": "Sorada",
    "type": "DEGREE",
    "address": "Sorada, Ganjam - 761108",
    "domains": [
      "rdcsorada.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-s-c-b-medical-college-and-hospit",
    "name": "S.C.B. Medical College and Hospital",
    "shortName": "SCB Medical College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "MEDICAL",
    "address": "Mangalabag, Cuttack - 753007",
    "domains": [
      "scbmch.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-saheed-laxman-nayak-medical-coll",
    "name": "Saheed Laxman Nayak Medical College and Hospital",
    "shortName": "SLNMCH Koraput",
    "district": "Koraput",
    "city": "Koraput",
    "type": "MEDICAL",
    "address": "Koraput - 764020",
    "domains": [
      "slnmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-saheed-rendo-majhi-government-me",
    "name": "Saheed Rendo Majhi Government Medical College and Hospital",
    "shortName": "SRMGMC Phulbani",
    "district": "Kandhamal",
    "city": "Phulbani",
    "type": "MEDICAL",
    "address": "Phulbani, Kandhamal - 762001",
    "domains": [
      "srmgmch.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-salipur-autonomous-college",
    "name": "Salipur Autonomous College",
    "shortName": "Salipur Autonomous College",
    "district": "Cuttack",
    "city": "Salipur",
    "type": "DEGREE",
    "address": "Salipur, Cuttack - 754202",
    "domains": [
      "salipurcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-samanta-chandra-sekhar-autonomou",
    "name": "Samanta Chandra Sekhar Autonomous College",
    "shortName": "SCS Autonomous Puri",
    "district": "Puri",
    "city": "Puri",
    "type": "DEGREE",
    "address": "Chandan Hajuri Road, Puri - 752001",
    "domains": [
      "scscollege.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-samanta-chandrasekhar-institute-",
    "name": "Samanta Chandrasekhar Institute of Technology and Management",
    "shortName": "SCITM Semiliguda",
    "district": "Koraput",
    "city": "Semiliguda",
    "type": "ENGINEERING",
    "address": "Semiliguda, Koraput - 764036",
    "domains": [
      "scitm.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sambalpur-university",
    "name": "Sambalpur University",
    "shortName": "Sambalpur University",
    "district": "Sambalpur",
    "city": "Burla",
    "type": "UNIVERSITY",
    "address": "Jyoti Vihar, Burla, Sambalpur - 768019",
    "domains": [
      "suniv.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sambalpur-university-institute-o",
    "name": "Sambalpur University Institute of Information Technology",
    "shortName": "SUIIT Burla",
    "district": "Sambalpur",
    "city": "Burla",
    "type": "ENGINEERING",
    "address": "Jyoti Vihar, Burla, Sambalpur - 768019",
    "domains": [
      "suiit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sanjay-memorial-institute-of-tec",
    "name": "Sanjay Memorial Institute of Technology",
    "shortName": "SMIT Chandipadar",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "ENGINEERING",
    "address": "Chandipadar, Berhampur, Ganjam - 761003",
    "domains": [
      "smit.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sanjaya-memorial-government-wome",
    "name": "Sanjaya Memorial Government Women's College",
    "shortName": "SM Govt Women's Phulbani",
    "district": "Kandhamal",
    "city": "Phulbani",
    "type": "DEGREE",
    "address": "Phulbani, Kandhamal - 762001",
    "domains": [
      "smgwcphulbani.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-satyabadi-college",
    "name": "Satyabadi College",
    "shortName": "Satyabadi College",
    "district": "Puri",
    "city": "Satyabadi",
    "type": "DEGREE",
    "address": "Sakhigopal, Puri - 752014",
    "domains": [
      "satyabadicollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-satyabhama-devi-college",
    "name": "Satyabhama Devi College",
    "shortName": "Satyabhama Devi College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Nayapalli, Bhubaneswar, Khordha - 751012",
    "domains": [
      "satyabhamadevicollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-satyasai-engineering-college",
    "name": "Satyasai Engineering College",
    "shortName": "Satyasai Engg College",
    "district": "Balasore",
    "city": "Srikona",
    "type": "ENGINEERING",
    "address": "Srikona, Balasore - 756001",
    "domains": [
      "secbalasore.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-science-college-hinjilicut",
    "name": "Science College, Hinjilicut",
    "shortName": "Science College Hinjilicut",
    "district": "Ganjam",
    "city": "Hinjilicut",
    "type": "DEGREE",
    "address": "Hinjilicut, Ganjam - 761102",
    "domains": [
      "sciencecollegehinjilicut.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-seemanta-engineering-college",
    "name": "Seemanta Engineering College",
    "shortName": "Seemanta Engg College",
    "district": "Mayurbhanj",
    "city": "Jharpokharia",
    "type": "ENGINEERING",
    "address": "Mayur Vihar, Jharpokharia, Mayurbhanj - 757086",
    "domains": [
      "seemantaengg.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-seemanta-institute-of-pharmaceut",
    "name": "Seemanta Institute of Pharmaceutical Sciences",
    "shortName": "SIPS Mayurbhanj",
    "district": "Mayurbhanj",
    "city": "Jharpokharia",
    "type": "PHARMACY",
    "address": "Jharpokharia, Mayurbhanj - 757086",
    "domains": [
      "sips.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-seemanta-mahavidyalaya",
    "name": "Seemanta Mahavidyalaya",
    "shortName": "Seemanta Mahavidyalaya",
    "district": "Mayurbhanj",
    "city": "Jharpokharia",
    "type": "DEGREE",
    "address": "Jharpokharia, Mayurbhanj - 757086",
    "domains": [
      "seemantamahavidyalaya.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-shailabala-women-s-autonomous-co",
    "name": "Shailabala Women's Autonomous College",
    "shortName": "Shailabala Women's College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Mission Road, Cuttack - 753001",
    "domains": [
      "shailabalawomenscollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-shashi-bhusan-rath-government-wo",
    "name": "Shashi Bhusan Rath Government Women's College",
    "shortName": "SBR Govt Women's College",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "DEGREE",
    "address": "Berhampur, Ganjam - 760001",
    "domains": [
      "sbrgwcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-siksha-o-anusandhan",
    "name": "Siksha 'O' Anusandhan",
    "shortName": "SOA University",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Khandagiri Square, Bhubaneswar, Khordha - 751030",
    "domains": [
      "soa.ac.in",
      "iter.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-silicon-institute-of-technology-",
    "name": "Silicon Institute of Technology, Sambalpur",
    "shortName": "Silicon Sambalpur",
    "district": "Sambalpur",
    "city": "Sason",
    "type": "ENGINEERING",
    "address": "Silicon West, Sason, Sambalpur - 768200",
    "domains": [
      "silicon.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-silicon-university",
    "name": "Silicon University",
    "shortName": "Silicon University (SIT)",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Silicon Hills, Patia, Bhubaneswar, Khordha - 751024",
    "domains": [
      "silicon.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sivananda-college-of-pharmaceuti",
    "name": "Sivananda College of Pharmaceutical Sciences",
    "shortName": "Sivananda Pharmacy",
    "district": "Ganjam",
    "city": "Berhampur",
    "type": "PHARMACY",
    "address": "Berhampur, Ganjam - 760002",
    "domains": [
      "scps.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-soa-national-institute-of-law",
    "name": "SOA National Institute of Law",
    "shortName": "SNIL (SOA)",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "LAW_MANAGEMENT",
    "address": "Khandagiri Square, Bhubaneswar, Khordha - 751030",
    "domains": [
      "soa.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sophitorium-engineering-college",
    "name": "Sophitorium Engineering College",
    "shortName": "Sophitorium College",
    "district": "Khordha",
    "city": "Baniatangi",
    "type": "ENGINEERING",
    "address": "Baniatangi, Khordha - 752060",
    "domains": [
      "sophitorium.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-spintronic-technology-and-advanc",
    "name": "Spintronic Technology and Advance Research",
    "shortName": "STAR Jatni",
    "district": "Khordha",
    "city": "Jatni",
    "type": "ENGINEERING",
    "address": "Taraboi, Jatni, Khordha - 752050",
    "domains": [
      "star.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sri-jagannath-degree-mahavidyala",
    "name": "Sri Jagannath Degree Mahavidyalaya",
    "shortName": "SJ Degree Mahavidyalaya",
    "district": "Ganjam",
    "city": "Rambha",
    "type": "DEGREE",
    "address": "Rambha, Ganjam - 761028",
    "domains": [
      "sjdmrambha.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sri-jagannath-medical-college-an",
    "name": "Sri Jagannath Medical College and Hospital",
    "shortName": "SJMCH Puri",
    "district": "Puri",
    "city": "Puri",
    "type": "MEDICAL",
    "address": "Samgara, Puri - 752002",
    "domains": [
      "sjmchpuri.nic.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sri-jayadev-college-of-pharmaceu",
    "name": "Sri Jayadev College of Pharmaceutical Sciences",
    "shortName": "SJCPS Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "PHARMACY",
    "address": "Naharkanta, Bhubaneswar, Khordha - 752101",
    "domains": [
      "srijayadevcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sri-sri-university",
    "name": "Sri Sri University",
    "shortName": "Sri Sri University",
    "district": "Cuttack",
    "city": "Godisahi",
    "type": "UNIVERSITY",
    "address": "Ward No 3, Godisahi, Cuttack - 754006",
    "domains": [
      "srisriuniversity.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-srinix-college-of-engineering",
    "name": "Srinix College of Engineering",
    "shortName": "Srinix College",
    "district": "Balasore",
    "city": "Ranipatna",
    "type": "ENGINEERING",
    "address": "Ranipatna, Balasore - 756001",
    "domains": [
      "srinix.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-stewart-science-degree-college",
    "name": "Stewart Science Degree College",
    "shortName": "Stewart Science College",
    "district": "Cuttack",
    "city": "Cuttack",
    "type": "DEGREE",
    "address": "Mission Compound, Cuttack - 753001",
    "domains": [
      "stewartsciencecollege.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-subas-institute-of-technology",
    "name": "Subas Institute of Technology",
    "shortName": "SIT Barang",
    "district": "Khordha",
    "city": "Barang",
    "type": "ENGINEERING",
    "address": "Barang, Bhubaneswar, Khordha - 754005",
    "domains": [
      "subas.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-suddhananda-degree-college",
    "name": "Suddhananda Degree College",
    "shortName": "Suddhananda Degree College",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "DEGREE",
    "address": "Nachhipur, Bhubaneswar, Khordha - 752115",
    "domains": [
      "sdc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-suddhananda-engineering-and-rese",
    "name": "Suddhananda Engineering and Research Centre",
    "shortName": "SERC Bhubaneswar",
    "district": "Khordha",
    "city": "Nachhipur",
    "type": "ENGINEERING",
    "address": "Nachhipur, Bhubaneswar, Khordha - 752115",
    "domains": [
      "serc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-sundargarh-engineering-college",
    "name": "Sundargarh Engineering College",
    "shortName": "Sundargarh Engg",
    "district": "Sundargarh",
    "city": "Kirei",
    "type": "ENGINEERING",
    "address": "Kirei, Sundargarh - 770073",
    "domains": [
      "sec.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-swami-vivekananda-memorial-auton",
    "name": "Swami Vivekananda Memorial Autonomous College",
    "shortName": "SVM Autonomous Jagatsinghpur",
    "district": "Jagatsinghpur",
    "city": "Jagatsinghpur",
    "type": "DEGREE",
    "address": "Jagatsinghpur - 754103",
    "domains": [
      "svmcollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-synergy-institute-of-engineering",
    "name": "Synergy Institute of Engineering and Technology",
    "shortName": "SIET Dhenkanal",
    "district": "Dhenkanal",
    "city": "Dhenkanal",
    "type": "ENGINEERING",
    "address": "Banamali Prasad, Dhenkanal - 759001",
    "domains": [
      "synergyinstitute.net"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-synergy-institute-of-technology",
    "name": "Synergy Institute of Technology",
    "shortName": "SIT Phulnakhara",
    "district": "Cuttack",
    "city": "Phulnakhara",
    "type": "ENGINEERING",
    "address": "Bhimpur, Phulnakhara, Cuttack - 754001",
    "domains": [
      "synergytechnology.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-talcher-autonomous-college",
    "name": "Talcher Autonomous College",
    "shortName": "Talcher Autonomous College",
    "district": "Angul",
    "city": "Talcher",
    "type": "DEGREE",
    "address": "Talcher, Angul - 759107",
    "domains": [
      "talchercollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-templecity-institute-of-technolo",
    "name": "TempleCity Institute of Technology and Engineering",
    "shortName": "TITE Jatni",
    "district": "Khordha",
    "city": "Jatni",
    "type": "ENGINEERING",
    "address": "Taraboi, Jatni, Khordha - 752050",
    "domains": [
      "tite.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-the-pharmaceutical-college-barpa",
    "name": "The Pharmaceutical College, Barpali",
    "shortName": "Pharm College Barpali",
    "district": "Bargarh",
    "city": "Barpali",
    "type": "PHARMACY",
    "address": "Barpali, Bargarh - 768029",
    "domains": [
      "pharmacollegebarpali.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-the-techno-school",
    "name": "The Techno School",
    "shortName": "Techno School",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Patrapada, Bhubaneswar, Khordha - 751019",
    "domains": [
      "thetechnoschool.org"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-trident-academy-of-technology",
    "name": "Trident Academy of Technology",
    "shortName": "TAT Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "F-2, Chandaka Industrial Estate, Patia, Bhubaneswar - 751024",
    "domains": [
      "trident.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-udayanath-autonomous-college-of-",
    "name": "Udayanath Autonomous College of Science and Technology",
    "shortName": "UN Autonomous College",
    "district": "Cuttack",
    "city": "Adaspur",
    "type": "DEGREE",
    "address": "Adaspur, Cuttack - 754011",
    "domains": [
      "uncollege.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-utkal-university",
    "name": "Utkal University",
    "shortName": "Utkal University",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Vani Vihar, Bhubaneswar, Khordha - 751004",
    "domains": [
      "utkaluniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-utkal-university-of-culture",
    "name": "Utkal University of Culture",
    "shortName": "UUC Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "UNIVERSITY",
    "address": "Sanskruti Vihar, Madanpur, Bhubaneswar - 752054",
    "domains": [
      "uuc.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vedang-institute-of-technology",
    "name": "Vedang Institute of Technology",
    "shortName": "Vedang Institute",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "ENGINEERING",
    "address": "Durgaprasad, Ramachandrapur, Jatni, Khordha - 752050",
    "domains": [
      "vedang.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-veer-surendra-sai-institute-of-m",
    "name": "Veer Surendra Sai Institute of Medical Sciences and Research",
    "shortName": "VIMSAR Burla",
    "district": "Sambalpur",
    "city": "Burla",
    "type": "MEDICAL",
    "address": "Burla, Sambalpur - 768017",
    "domains": [
      "vimsar.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-veer-surendra-sai-university-of-",
    "name": "Veer Surendra Sai University of Technology",
    "shortName": "VSSUT Burla",
    "district": "Sambalpur",
    "city": "Burla",
    "type": "ENGINEERING",
    "address": "Burla, Sambalpur - 768018",
    "domains": [
      "vssut.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vignan-institute-of-technology-a",
    "name": "Vignan Institute of Technology and Management",
    "shortName": "VITAM Berhampur",
    "district": "Ganjam",
    "city": "Mantridi",
    "type": "ENGINEERING",
    "address": "Mantridi, Berhampur, Ganjam - 761008",
    "domains": [
      "vitam.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vijayanjali-institute-of-technol",
    "name": "Vijayanjali Institute of Technology",
    "shortName": "VIT Balasore",
    "district": "Balasore",
    "city": "Khantapada",
    "type": "ENGINEERING",
    "address": "Khantapada, Balasore - 756043",
    "domains": [
      "vitbalasore.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vikash-institute-of-technology",
    "name": "Vikash Institute of Technology",
    "shortName": "Vikash Institute",
    "district": "Bargarh",
    "city": "Barahaguda",
    "type": "ENGINEERING",
    "address": "Barahaguda, Bargarh - 768028",
    "domains": [
      "vikash.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vikram-deb-university",
    "name": "Vikram Deb University",
    "shortName": "Vikram Deb University",
    "district": "Koraput",
    "city": "Jeypore",
    "type": "UNIVERSITY",
    "address": "Jeypore, Koraput - 764001",
    "domains": [
      "vikramdebuniversity.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vits-engineering-college",
    "name": "VITS Engineering College",
    "shortName": "VITS Khordha",
    "district": "Khordha",
    "city": "Damanabhuin",
    "type": "ENGINEERING",
    "address": "Damanabhuin, Khordha - 752050",
    "domains": [
      "vits.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-vyasanagar-autonomous-college",
    "name": "Vyasanagar Autonomous College",
    "shortName": "Vyasanagar Autonomous",
    "district": "Jajpur",
    "city": "Jajpur Road",
    "type": "DEGREE",
    "address": "Jajpur Road, Jajpur - 755019",
    "domains": [
      "vnautocollege.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-xavier-institute-of-management-b",
    "name": "Xavier Institute of Management, Bhubaneswar",
    "shortName": "XIMB Bhubaneswar",
    "district": "Khordha",
    "city": "Bhubaneswar",
    "type": "LAW_MANAGEMENT",
    "address": "Xavier Square, Jayadev Vihar, Bhubaneswar - 751013",
    "domains": [
      "ximb.edu.in",
      "xim.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-xim-university",
    "name": "XIM University",
    "shortName": "XIM University",
    "district": "Khordha",
    "city": "Harirajpur",
    "type": "UNIVERSITY",
    "address": "Plot No. 12(A), Nijigada Kurki, Harirajpur, Khordha - 752050",
    "domains": [
      "xim.edu.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  },
  {
    "id": "clg-zenith-engineering-and-managemen",
    "name": "Zenith Engineering and Management Studies",
    "shortName": "Zenith College",
    "district": "Khordha",
    "city": "Pitapalli",
    "type": "ENGINEERING",
    "address": "Pitapalli, Khordha - 752054",
    "domains": [
      "zenith.ac.in"
    ],
    "status": "VERIFIED",
    "source": "SYSTEM",
    "createdAt": "2026-10-20T00:00:00.000Z"
  }
];

export const ALL_COLLEGE_NAMES: string[] = ALL_ODISHA_COLLEGES.map(c => c.name);
