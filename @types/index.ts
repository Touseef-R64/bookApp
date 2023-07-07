interface authorIType {
  name: string;
}

interface bookIType {
  _id?: string;
  title: string;
  description: string;
  published_date: Date;
  page_count: number;
  createdAt?: Date;
  coverImageName: string;
  author: authorIType;
}
