export interface NewsResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  renderContent: object;
  processingTimeMS: number;
}

export interface Hit {
  story_title: string;
  author: string;
  story_url: string;
  created_at: string;
}
