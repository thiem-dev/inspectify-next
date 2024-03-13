type History = {
  id: number;
  caption: string;
  class_categories: any[]; // Assuming JSON data will be parsed into an array of any type
  image_url: string;
  created_at: Date;
};

type HistoryInsert = {
  image_url: string;
  caption: string;
  class_categories: string;
};

export { History, HistoryInsert };
