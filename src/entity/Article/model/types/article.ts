import { EditorState } from 'lexical';

import { User } from '@/entity/User';

import { ArticleType } from '../consts/article';

export interface ArticleContent {
    title: string;
    description?: string | EditorState;
    editorState: string | EditorState;
    img: string;
    views: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    type: ArticleType[];
}

export interface ServerArticle extends ArticleContent {
    id: string;
    userId: string;
}

export interface Article extends ArticleContent {
    id: string;
    user: User;
}

export class ArticleUtils implements Article {
    id: string;

    user: User;

    title: string;

    description?: string | EditorState | undefined;

    editorState: string | EditorState;

    img: string;

    views: number;

    createdAt: string;

    updatedAt: string;

    publishedAt?: string | undefined;

    type: ArticleType[];

    constructor(data: Article) {
        this.id = data.id;
        this.user = data.user;
        this.title = data.title;
        this.description = data.description;
        this.editorState = data.editorState;
        this.img = data.img;
        this.views = data.views;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.publishedAt = data.publishedAt;
        this.type = data.type;
    }

    static fromArray(data: Article[]): ArticleUtils[] {
        return data.map((article) => new ArticleUtils(article));
    }

    getData(): ArticleContent {
        return {
            title: this.title,
            description: this.description,
            editorState: this.editorState,
            img: this.img,
            views: this.views,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            publishedAt: this.publishedAt,
            type: this.type,
        };
    }

    exportToServer(): ServerArticle {
        return ArticleUtils.exportToServer(this);
    }

    static exportToServer(article: Article): ServerArticle {
        return {
            id: article.id,
            userId: article.user.id,
            title: article.title,
            description: article.description,
            editorState: article.editorState,
            img: article.img,
            views: article.views,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            publishedAt: article.publishedAt,
            type: article.type,
        };
    }

    isUserOwner(userId: string): boolean {
        return ArticleUtils.isUserOwner(this, userId);
    }

    isUserHaveAccess(userId: string): boolean {
        return ArticleUtils.isUserOwner(this, userId);
    }

    static isUserOwner(article: ArticleUtils | Article, userId: string): boolean {
        return article.user.id === userId;
    }

    static isUserHaveAccess(article: ArticleUtils | Article, userId: string): boolean {
        return article.user.id === userId;
    }
}
