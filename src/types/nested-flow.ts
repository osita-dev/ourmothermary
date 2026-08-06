export interface NestedFlowItem {
  id: string;
  title_en: string;
  body_en: string;
}

export interface NestedFlow {
  id: string;
  title_en: string;
  subtitle_en: string;
  items: NestedFlowItem[];
}
