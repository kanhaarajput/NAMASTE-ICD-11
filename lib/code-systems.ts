export interface CodeMapping {
  id: string
  disease: string
  namasteCode: string
  icd11Code: string
  whoCode: string
  description: string
  category: string
  synonyms: string[]
  severity?: "mild" | "moderate" | "severe"
  ayushTreatments?: string[]
  modernTreatments?: string[]
  crossReferences?: {
    icd10?: string
    snomed?: string
    loinc?: string
  }
}

export interface CodeSystemInfo {
  system: "namaste" | "icd11" | "who"
  version: string
  lastUpdated: string
  totalCodes: number
  description: string
}

// Comprehensive disease code database
export const diseaseCodeDatabase: CodeMapping[] = [
  {
    id: "dm-t2-001",
    disease: "Diabetes Mellitus Type 2",
    namasteCode: "NAM-DM-002",
    icd11Code: "5A11.0",
    whoCode: "WHO-DM-T2",
    description: "Non-insulin-dependent diabetes mellitus with metabolic complications",
    category: "Endocrine Disorders",
    synonyms: ["Type 2 Diabetes", "Adult-onset Diabetes", "NIDDM"],
    severity: "moderate",
    ayushTreatments: ["Bitter gourd therapy", "Turmeric supplementation", "Yoga therapy"],
    modernTreatments: ["Metformin", "Insulin therapy", "Lifestyle modification"],
    crossReferences: {
      icd10: "E11",
      snomed: "44054006",
      loinc: "33747-0",
    },
  },
  {
    id: "htn-ess-001",
    disease: "Essential Hypertension",
    namasteCode: "NAM-HTN-001",
    icd11Code: "BA00",
    whoCode: "WHO-HTN-ESS",
    description: "Primary hypertension without identifiable cause",
    category: "Cardiovascular Disorders",
    synonyms: ["High Blood Pressure", "Primary Hypertension", "Idiopathic Hypertension"],
    severity: "moderate",
    ayushTreatments: ["Arjuna bark extract", "Meditation", "Pranayama breathing"],
    modernTreatments: ["ACE inhibitors", "Beta blockers", "Diuretics"],
    crossReferences: {
      icd10: "I10",
      snomed: "59621000",
      loinc: "8480-6",
    },
  },
  {
    id: "ast-all-001",
    disease: "Allergic Asthma",
    namasteCode: "NAM-AST-001",
    icd11Code: "CA23.0",
    whoCode: "WHO-AST-ALL",
    description: "Asthma triggered by environmental allergens",
    category: "Respiratory Disorders",
    synonyms: ["Atopic Asthma", "Extrinsic Asthma", "Environmental Asthma"],
    severity: "mild",
    ayushTreatments: ["Vasaka leaf extract", "Steam inhalation", "Pranayama"],
    modernTreatments: ["Inhaled corticosteroids", "Beta-2 agonists", "Antihistamines"],
    crossReferences: {
      icd10: "J45.0",
      snomed: "389145006",
      loinc: "33747-0",
    },
  },
  {
    id: "art-ra-001",
    disease: "Rheumatoid Arthritis",
    namasteCode: "NAM-ART-001",
    icd11Code: "FA20.0",
    whoCode: "WHO-ART-RA",
    description: "Chronic inflammatory autoimmune arthritis",
    category: "Musculoskeletal Disorders",
    synonyms: ["RA", "Inflammatory Arthritis", "Autoimmune Arthritis"],
    severity: "severe",
    ayushTreatments: ["Guggulu therapy", "Panchakarma", "Abhyanga massage"],
    modernTreatments: ["DMARDs", "Biologics", "Corticosteroids"],
    crossReferences: {
      icd10: "M06.9",
      snomed: "69896004",
      loinc: "33747-0",
    },
  },
  {
    id: "mig-001",
    disease: "Migraine",
    namasteCode: "NAM-MIG-001",
    icd11Code: "8A80.1",
    whoCode: "WHO-MIG-COM",
    description: "Recurrent severe headache with neurological symptoms",
    category: "Neurological Disorders",
    synonyms: ["Severe Headache", "Vascular Headache", "Neurological Headache"],
    severity: "moderate",
    ayushTreatments: ["Brahmi oil massage", "Shirodhara", "Nasya therapy"],
    modernTreatments: ["Triptans", "Beta blockers", "Anticonvulsants"],
    crossReferences: {
      icd10: "G43.9",
      snomed: "37796009",
      loinc: "72133-2",
    },
  },
]

export const codeSystemInfo: Record<string, CodeSystemInfo> = {
  namaste: {
    system: "namaste",
    version: "2024.1",
    lastUpdated: "2024-01-15",
    totalCodes: 15420,
    description: "AYUSH NAMASTE coding system for traditional medicine practices",
  },
  icd11: {
    system: "icd11",
    version: "2024 Release",
    lastUpdated: "2024-01-01",
    totalCodes: 55000,
    description: "WHO ICD-11 Traditional Medicine Module 2 for standardized medical coding",
  },
  who: {
    system: "who",
    version: "2024.1",
    lastUpdated: "2024-02-01",
    totalCodes: 25000,
    description: "WHO Standard Terminologies for global health interoperability",
  },
}

export class CodeSystemService {
  static searchDiseases(query: string, codeSystem?: string): CodeMapping[] {
    const normalizedQuery = query.toLowerCase().trim()

    return diseaseCodeDatabase.filter((mapping) => {
      const matchesQuery =
        mapping.disease.toLowerCase().includes(normalizedQuery) ||
        mapping.description.toLowerCase().includes(normalizedQuery) ||
        mapping.synonyms.some((synonym) => synonym.toLowerCase().includes(normalizedQuery)) ||
        mapping.namasteCode.toLowerCase().includes(normalizedQuery) ||
        mapping.icd11Code.toLowerCase().includes(normalizedQuery) ||
        mapping.whoCode.toLowerCase().includes(normalizedQuery)

      if (!codeSystem || codeSystem === "all") {
        return matchesQuery
      }

      return matchesQuery
    })
  }

  static getCodeMapping(id: string): CodeMapping | undefined {
    return diseaseCodeDatabase.find((mapping) => mapping.id === id)
  }

  static getCodesBySystem(system: "namaste" | "icd11" | "who"): string[] {
    return diseaseCodeDatabase.map((mapping) => {
      switch (system) {
        case "namaste":
          return mapping.namasteCode
        case "icd11":
          return mapping.icd11Code
        case "who":
          return mapping.whoCode
        default:
          return ""
      }
    })
  }

  static validateCode(code: string, system: "namaste" | "icd11" | "who"): boolean {
    const codes = this.getCodesBySystem(system)
    return codes.includes(code)
  }

  static getCrossReferences(id: string): CodeMapping["crossReferences"] {
    const mapping = this.getCodeMapping(id)
    return mapping?.crossReferences
  }

  static getSystemInfo(system: string): CodeSystemInfo | undefined {
    return codeSystemInfo[system]
  }
}
