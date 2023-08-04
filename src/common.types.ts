import { User, Session } from 'next-auth'

export interface UserProfile {
    user_id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    //githubUrl: string | null;
    //linkedinUrl: string | null;
    /*projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };*/
}

export interface SessionInterface extends Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    };
}

export interface CategoryInterface {
    category_id: number;
    name: string;
}

export interface ProductInterface {
    product_id: string;
    artisan_id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    category_id: number;
    creation_date: string;
    sold: boolean;
    user_id: number;
    buy_date: string;
}

/*export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}*/