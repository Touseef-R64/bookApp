interface authorIType {
  name: string;
}

interface bookIType {
  _id?: string;
  title: string;
  description: string;
  published_date: Date;
  createdAt?: Date;
  genre: string;
  coverImageName: string;
  author: string;
  [key: string]: any;
}
