export interface ResearchMetric {
  label: string;
  value: number;
}

export interface Recommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PersonaDetail {
  name: string;
  role: string;
  traits: string[];
  needs: string[];
  goals: string[];
  painPoints: string[];
  icon: React.ReactNode;
}

export interface Requirement {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface DeliveryItem {
  title: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
}

export interface TestingFocus {
  area: string;
  icon: React.ReactNode;
}
